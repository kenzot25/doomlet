// Thế giới: vòng lặp, chuột, menu, team, tương tác giữa các bạn, đồng bộ session Claude.
const API = window.doomlet || null; // có khi chạy trong Electron
const MAX_PETS = 16;
const world = {
  layer: document.getElementById('world'), pets: new Set(), W: innerWidth, H: innerHeight,
  others: [], origin: { x: 0, y: 0 }, primary: true, demoWrap: false, sizeScale: 4,
};
// Đổi cỡ cả team; thỏ con (subagent) nhỏ hơn thỏ chính 1 bậc như lúc spawn
world.helperScale = (base = world.sizeScale) => Math.max(2, base - 1);
world.setSize = (base) => {
  if (!base) return;
  world.sizeScale = base;
  for (const p of world.pets) p.setScale(p.owner ? world.helperScale(base) : base);
};
// Bản đồ các màn khác (toạ độ theo màn này)
const inRect = (r, x, y, pad = 0) => x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad;
world.findTarget = (x, y) => {
  if (world.demoWrap) return x < 0 || x > world.W ? 'demo' : null;
  const r = world.others.find((o) => inRect(o, x, y)) || world.others.find((o) => inRect(o, x, y, 60));
  return r ? r.id : null;
};
world.findBelow = (cx) => {
  if (world.demoWrap) return null;
  const r = world.others.find((o) => o.y >= world.H - 10 && o.y <= world.H + 200 && cx >= o.x && cx <= o.x + o.w);
  return r ? r.id : null;
};
world.travelPlan = (dir, p) => {
  const W = world.W, H = world.H;
  if (dir === 'left' || dir === 'right') {
    if (world.findTarget(dir === 'left' ? -40 : W + 40, H - 60) == null) return null;
    return { x: dir === 'left' ? 0 : W - p.w };
  }
  const rs = world.others.filter((o) => (dir === 'down' ? o.y >= H - 10 && o.y <= H + 200 : o.y + o.h <= 10 && o.y + o.h >= -200));
  for (const o of rs) {
    const a = Math.max(0, o.x) + 10, b = Math.min(W, o.x + o.w) - p.w - 10;
    if (b > a) return { x: Math.round(a + Math.random() * (b - a)) };
  }
  return null;
};
// Bụi tung lên khi bật nhảy / tiếp đất
world.dust = (p, n = 8) => {
  const fx = p.x + p.w / 2, fy = p.y + p.footY;
  for (let i = 0; i < n; i++) {
    const d = document.createElement('div');
    d.className = 'dust';
    const sz = 3 + Math.round(Math.random() * 3) * 2;
    d.style.cssText = `left:${fx}px;top:${fy - sz}px;width:${sz}px;height:${sz}px;--dx:${(Math.random() * 2 - 1) * 60}px;--dy:${-10 - Math.random() * 30}px`;
    world.layer.appendChild(d);
    setTimeout(() => d.remove(), 700);
  }
};
// Lớp vẽ dây móc
world.ropes = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
world.ropes.id = 'ropes';
document.body.insertBefore(world.ropes, document.getElementById('world'));
world.appRects = []; // vị trí cửa sổ các app khác (Windows), để móc dây vào
world.smoke = (x, y) => {
  const d = document.createElement('div');
  d.className = 'smoke'; d.style.left = x - 5 + 'px'; d.style.top = y + 'px';
  world.layer.appendChild(d); setTimeout(() => d.remove(), 700);
};
world.impactAt = (x, y, text) => {
  const el = document.createElement('div');
  el.className = 'clash'; el.style.left = x + 'px'; el.style.top = y + 'px';
  el.innerHTML = `<span>${text}</span>`;
  world.layer.appendChild(el); setTimeout(() => el.remove(), 520);
};
world.spark = (x, y) => world.impactAt(x, y + 12, '✦');
// Thỏ Phình To dậm chân: các bạn khác nảy lên
world.quake = (src, power = 1) => {
  document.body.classList.remove('quake'); void document.body.offsetWidth; document.body.classList.add('quake');
  for (const q of world.pets) {
    if (q === src || !q.ground || q.dragging || q.dead || q.carriedBy) continue;
    q.vy = -rand(180, 340) * power; q.ground = false;
    if (Math.random() < 0.4) q.emote(pick(['😱', '🙀', '😨']));
  }
};
// Vệt mờ khi đang bay
world.trail = (p) => {
  const g = document.createElement('div');
  g.className = 'trail';
  g.style.cssText = `left:${p.x + p.w / 2 - 6}px;top:${p.y + p.footY - 30}px`;
  world.layer.appendChild(g);
  setTimeout(() => g.remove(), 450);
};
world.migrate = (to, payload) => {
  if (API) API.migrate({ to, pet: payload });
  else setTimeout(() => arrive({ pet: payload, x: payload.vx > 0 ? -SPR_W * payload.scale / 2 : world.W - SPR_W * payload.scale / 2, y: payload.gy }), 120);
};
world.onMigrated = (p) => { for (const [id, q] of sessionPets) if (q === p) sessionPets.delete(id); };
function arrive({ pet, x, y }) {
  const p = spawn({ type: pet.type, hoodie: pet.hoodie, name: pet.name, label: pet.label, scale: pet.scale, x, y, migrated: pet });
  if (p && pet.sessionId) sessionPets.set(pet.sessionId, p);
}
addEventListener('resize', () => { world.W = innerWidth; world.H = innerHeight; });

const TYPES = ['insomnia', 'hook', 'beanie', 'jet', 'sage', 'puff', 'carrot', 'office'];
let typeCursor = 0, hoodieCursor = 0;
const sessionPets = new Map();

function usedNames() { return new Set([...world.pets].map((p) => p.name)); }
function freshName() { const u = usedNames(); return NAMES.find((n) => !u.has(n)) || pick(NAMES); }

function spawn(o = {}) {
  if (world.pets.size >= MAX_PETS) return null;
  const type = o.type || TYPES[typeCursor++ % TYPES.length];
  const hoodie = o.hoodie || (type === 'insomnia' && !o.owner && world.pets.size === 0 ? null : HOODIES[hoodieCursor++ % HOODIES.length]);
  const name = o.name || (HERO_NAMES[type] ? (HERO_NAMES[type].find((n) => !usedNames().has(n)) || pick(HERO_NAMES[type])) : null) || (type === 'sage' ? (SAGE_NAMES.find((n) => !usedNames().has(n)) || pick(SAGE_NAMES)) : freshName());
  const p = new Pet(world, { ...o, type, hoodie, name, label: o.label || name, scale: o.scale ?? world.sizeScale });
  world.pets.add(p);
  return p;
}
function spawnHeroes() { ['hook', 'jet', 'puff'].forEach((t, i) => setTimeout(() => spawn({ type: t }), i * 400)); }
function spawnTeam(n = 6) {
  for (let i = 0; i < n; i++) setTimeout(() => spawn({ x: 80 + (i * (world.W - 200)) / Math.max(1, n - 1) }), i * 350);
}
function dismissTeam() {
  const free = [...world.pets].filter((p) => !p.session && !p.owner && !p.leaving);
  const keep = sessionPets.size ? 0 : 1;
  free.slice(keep).forEach((p, i) => setTimeout(() => p.leave(), i * 250));
}

// ---------- vòng lặp ----------
let last = performance.now(), nextSocial = last + 4000;
function loop(t) {
  const dt = Math.min(0.05, (t - last) / 1000); last = t;
  for (const p of [...world.pets]) {
    p.update(t, dt);
    if (p.action === 'leap' && !p.ground && !p.dead && (p._tr = (p._tr || 0) + 1) % 3 === 0) world.trail(p);
  }
  collisions(t);
  if (t > nextSocial) { social(); nextSocial = t + rand(18000, 35000); }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// Tình huống giữa các bạn nằm trong drama.js

// ---------- chuột: chọc, kéo, ném, menu ----------
let drag = null;
const menu = document.getElementById('menu');

world.layer.addEventListener('pointerdown', (e) => {
  const el = e.target.closest('.spr');
  if (!el || e.button !== 0) return;
  const p = el.parentElement._pet;
  hideMenu();
  try { el.setPointerCapture(e.pointerId); } catch {}
  drag = { p, sx: e.clientX, sy: e.clientY, ox: e.clientX - p.x, oy: e.clientY - p.y, moved: false, hist: [] };
  e.preventDefault();
});
addEventListener('pointermove', (e) => {
  updateHover(e);
  if (!drag) return;
  const { p } = drag;
  if (!drag.moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 5) {
    drag.moved = true; p.dragging = true; p.ground = false; p.target = null; p.cutRope?.(); if (p.flying) p.stopFly(); if (p.carriedBy) { p.carriedBy.carrying = null; p.carriedBy = null; } p.do('dangle');
  }
  if (drag.moved) {
    p.x = e.clientX - drag.ox; p.y = e.clientY - drag.oy;
    drag.hist.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    if (drag.hist.length > 6) drag.hist.shift();
  }
});
addEventListener('pointercancel', () => { if (drag) { drag.p.dragging = false; drag.p.ground = false; drag = null; } });
addEventListener('pointerup', () => {
  if (!drag) return;
  const { p } = drag;
  if (drag.moved) {
    API?.log?.({ ev: 'throw', x: Math.round(p.x), y: Math.round(p.y), W: world.W, H: world.H });
    const h = drag.hist, a = h[0], b = h[h.length - 1];
    const dt = Math.max(0.016, ((b?.t || 0) - (a?.t || 0)) / 1000);
    p.vx = a && b ? Math.max(-1600, Math.min(1600, (b.x - a.x) / dt)) : 0;
    p.vy = a && b ? Math.max(-1600, Math.min(1600, (b.y - a.y) / dt)) : 0;
    p.dragging = false; p.ground = false; p.action = 'dangle'; p.applyClass();
  } else p.poke();
  drag = null;
});
world.layer.addEventListener('dblclick', (e) => {
  const el = e.target.closest('.spr'); if (!el) return;
  el.parentElement._pet.do(pick(['flip', 'spin', 'dance', 'rofl', 'headbang']));
});
world.layer.addEventListener('contextmenu', (e) => {
  const el = e.target.closest('.spr'); if (!el) return;
  e.preventDefault(); showMenu(el.parentElement._pet, e.clientX, e.clientY);
});

const MENU = [
  ['Nhảy', 'dance'], ['Lộn vòng', 'flip'], ['Xoay vòng', 'spin'], ['Cười lăn lộn', 'rofl'],
  ['Uống cà phê', 'coffee'], ['Thở dài', 'sigh'], ['Khóc', 'cry'], ['Nổi điên', 'rage'],
  ['Facepalm', 'facepalm'], ['Nhún vai', 'shrug'], ['Liếc xéo', 'sideeye'], ['Tan chảy', 'melt'],
  ['Hồn lìa khỏi xác', 'soul'], ['Trốn vào thùng', 'hide'], ['Ngồi bó gối', 'corner'], ['Đập đầu bàn phím', 'headbang'],
  ['Ngất', 'faint'], ['Đi ngủ', 'sleep'], ['Lướt điện thoại', 'scroll'], ['Vươn vai', 'stretch'],
  null,
  ['Trêu đứa gần nhất', '@tease'], ['Ôm đứa gần nhất', '@hug'],
  ['Cãi nhau với đứa gần nhất', '@argue'], ['Đánh nhau với đứa gần nhất', '@brawl'],
  ['Đấu kiếm với đứa gần nhất', '@duel'], ['Thách đấu súng', '@shootout'],
  ['Bắn đứa gần nhất (pew pew)', '@spray'], ['Gọi Thầy ra giảng đạo', '@lecture'],
  null,
  ['Đu dây (Thỏ Dây Móc)', '@swing'], ['Bay (Thỏ Phản Lực)', '@fly'], ['Phình to (Thỏ Phình To)', '@puff'],
  ['Tung chiêu vào đứa gần nhất', '@power'], ['Gọi 3 siêu anh hùng', '@heroes'],
  ['Nhảy sang màn trái', '@go:left'], ['Nhảy sang màn phải', '@go:right'],
  ['Nhảy lên màn trên', '@go:up'], ['Rơi xuống màn dưới', '@go:down'],
  null,
  ['Gọi thêm 1 đứa', '@spawn'], ['Gọi cả team', '@team'], ['Giải tán team', '@dismiss'], ['Đuổi về', '@remove'],
];
function showMenu(p, x, y) {
  menu.innerHTML = `<div class="mh">${p.name}${p.session ? ' · ' + p.label : ''}</div>` + MENU.map((m) =>
    m ? `<button data-a="${m[1]}">${m[0]}</button>` : '<hr>').join('');
  menu.style.display = 'block';
  const r = menu.getBoundingClientRect();
  menu.style.left = Math.min(x, world.W - r.width - 8) + 'px';
  menu.style.top = Math.min(y, world.H - r.height - 8) + 'px';
  menu.onclick = (e) => {
    const a = e.target.dataset?.a; if (!a) return;
    hideMenu();
    if (a === '@spawn') spawn();
    else if (a === '@team') spawnTeam(4);
    else if (a === '@dismiss') dismissTeam();
    else if (a === '@remove') p.leave();
    else if (a === '@heroes') spawnHeroes();
    else if (a === '@swing' || a === '@fly' || a === '@puff') {
      const want = { '@swing': 'hook', '@fly': 'jet', '@puff': 'puff' }[a];
      const h = p.type === want ? p : [...world.pets].find((q) => q.type === want && !q.dead && q.ground) || null;
      if (!h) { spawn({ type: want, x: p.x + 100 }); return; }
      h.inEvent = false;
      const r = a === '@swing' ? h.swing() : a === '@fly' ? h.startFly() : h.puffUp();
      if (r === false) h.emote('🤷');
    }
    else if (a === '@power') {
      const hero = ['hook', 'jet', 'puff'].includes(p.type) ? p : [...world.pets].find((q) => ['hook', 'jet', 'puff'].includes(q.type) && !q.dead && q.ground);
      if (!hero) { p.say('team mình chưa có siêu anh hùng. gọi đi!'); return; }
      const b = [...world.pets].filter((q) => q !== hero && q.ground && !q.dead && !q.leaving).sort((q, r2) => Math.abs(q.x - hero.x) - Math.abs(r2.x - hero.x))[0];
      if (!b) return hero.emote('🤷');
      hero.inEvent = b.inEvent = false; powerAttack(hero, b);
    }
    else if (a.startsWith('@go:')) {
      if (!p.travel(a.slice(4))) p.say(p.owner ? 'tui phải ở cạnh sếp.' : 'phía đó không có màn hình. chỉ có tường.');
    }
    else if (['@argue', '@brawl', '@duel', '@shootout', '@spray', '@lecture'].includes(a)) {
      const b = [...world.pets].filter((q) => q !== p && q.ground && !q.leaving && !q.owner).sort((q, r2) => Math.abs(q.x - p.x) - Math.abs(r2.x - p.x))[0];
      if (a === '@lecture') {
        const sage = p.type === 'sage' ? p : [...world.pets].find((q) => q.type === 'sage' && !q.dead) || spawn({ type: 'sage', x: p.x + 120 });
        const target = sage === p ? b : p;
        if (!target) return p.say('không có ai để giảng. ta giảng cho gió vậy.');
        if (sage) { sage.inEvent = target.inEvent = false; setTimeout(() => lecture(sage, target), sage.ground ? 0 : 1800); }
        return;
      }
      if (!b) return p.say('không có ai. tui đánh với bóng mình vậy.');
      p.inEvent = b.inEvent = false;
      ({ '@argue': argue, '@brawl': brawl, '@duel': duel, '@shootout': shootout, '@spray': sprayAt })[a](p, b);
    }
    else if (a === '@tease' || a === '@hug') {
      const b = [...world.pets].filter((q) => q !== p && q.ground && !q.leaving).sort((q, r2) => Math.abs(q.x - p.x) - Math.abs(r2.x - p.x))[0];
      if (!b) return p.say('không có ai để ' + (a === '@hug' ? 'ôm' : 'trêu') + '. cô đơn ghê.');
      if (a === '@hug') goTo(p, b, () => { face(p, b); p.do('hug'); b.do('hugged'); });
      else { face(p, b); p.do('tease'); setTimeout(() => { b.walkTo(p.x, 'chase'); b.onArrive = () => b.do('rage'); p.walkTo(p.x + (p.x < b.x ? -350 : 350), 'flee'); }, 1500); }
    } else p.do(a, { say: 1 });
  };
}
function hideMenu() { menu.style.display = 'none'; }
addEventListener('pointerdown', (e) => { if (!e.target.closest('#menu')) hideMenu(); }, true);

// Trong Electron: chỉ bắt chuột khi trỏ vào thỏ/menu, còn lại click xuyên qua xuống app bên dưới
let interactive = false;
function updateHover(e) {
  if (!API) return;
  const want = !!drag || !!(e.target.closest && e.target.closest('.spr, #menu, #panel'));
  if (want !== interactive) { interactive = want; API.setIgnore(!want); }
}

// ---------- đồng bộ session Claude Code ----------
function syncSessions(list) {
  const seen = new Set();
  for (const s of list) {
    seen.add(s.id);
    let p = sessionPets.get(s.id);
    if (!p || p.dead) {
      p = spawn({ type: sessionPets.size === 0 ? 'insomnia' : undefined, label: s.project });
      if (!p) continue;
      p.sessionId = s.id;
      sessionPets.set(s.id, p);
    }
    p.setSession(s);
    // subagent → thêm đồng đội nhỏ đứng cạnh
    const helpers = [...world.pets].filter((q) => q.owner === p && !q.leaving);
    const want = Math.min(s.subagents || 0, 4);
    for (let i = helpers.length; i < want; i++) {
      const off = (i % 2 ? 1 : -1) * (55 + Math.floor(i / 2) * 45);
      const h = spawn({ owner: p, offset: off, scale: world.helperScale(), x: p.x + off, label: 'sub ' + (i + 1) });
      if (h) h.setTag();
    }
    helpers.slice(want).forEach((h) => h.leave());
  }
  for (const [id, p] of sessionPets) {
    if (!seen.has(id)) { sessionPets.delete(id); if (!p.dead) { p.session = null; p.leave(); } }
  }
}

function travelAll() {
  [...world.pets].filter((p) => p.canTravel() && p.ground).forEach((p, i) => setTimeout(() => {
    const dirs = p.availableDirs(); if (dirs.length) p.travel(dirs[i % dirs.length]);
  }, i * 300));
}
if (API) {
  API.onLayout((l) => { world.others = l.others || []; world.origin = l.origin; world.primary = l.primary; if (l.size) world.setSize(l.size); });
  API.onArrive(arrive);
  API.onSessions(syncSessions);
  API.onCommand((c) => ({ spawn, team: () => spawnTeam(6), team2: () => spawnTeam(2), heroes: spawnHeroes, dismiss: dismissTeam, travel: travelAll }[c]?.()));
  API.onAnchors?.((rects) => { world.appRects = rects || []; });
  setTimeout(() => { if (world.primary && world.pets.size === 0) spawn({ type: 'insomnia' }); }, 2500);
} else {
  startDemo();
}

// ---------- chế độ demo trên trình duyệt ----------
function startDemo() {
  const panel = document.getElementById('panel');
  panel.style.display = 'flex';
  world.demoWrap = true; // demo: nhảy ra mép này sẽ vào từ mép kia
  spawn({ type: 'insomnia' });
  let fakeN = 0;
  panel.addEventListener('click', (e) => {
    const a = e.target.dataset?.a;
    if (a === 'spawn') spawn();
    if (a === 'team') spawnTeam(6);
    if (a === 'heroes') spawnHeroes();
    if (a === 'dismiss') dismissTeam();
    if (a === 'session') fakeSession(++fakeN);
    if (a === 'travel') travelAll();
  });
  const fakes = new Map();
  function fakeSession(n) {
    const id = 'demo-' + n;
    const script = [
      { state: 'thinking', t: 4000 }, { state: 'working', tool: 'Read', t: 5000 }, { state: 'working', tool: 'Agent', subagents: 2, t: 9000 },
      { state: 'working', tool: 'Edit', t: 5000 }, { state: 'waiting', tool: 'Bash', t: 6000 }, { state: 'working', tool: 'Bash', t: 4000 },
      { state: 'error', tool: 'Bash', t: 4500 }, { state: 'working', tool: 'Edit', t: 5000 }, { state: 'done', t: 9000 }, { state: 'idle', t: 12000 },
    ];
    const project = ['web-app', 'api-server', 'sample-ordering', 'design-system'][(n - 1) % 4];
    let i = 0;
    const step = () => {
      if (i >= script.length) { fakes.delete(id); return push(); }
      const s = script[i++];
      fakes.set(id, { id, project, state: s.state, tool: s.tool || null, subagents: s.subagents || 0 });
      push(); setTimeout(step, s.t);
    };
    step();
  }
  function push() { syncSessions([...fakes.values()]); }
}
