// Các "tình huống" nhiều bước: cãi nhau, đánh nhau, đấu kiếm, đấu súng, Thầy giảng đạo, khán giả hóng chuyện.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ok = (...ps) => ps.every((p) => p && !p.dead && !p.dragging && !p.leaving);
const HOLD = 600000; // giữ nguyên hành động cho tới khi kịch bản đổi

function face(a, b) { a.dir = b.x >= a.x ? 1 : -1; b.dir = -a.dir; a.applyClass(); b.applyClass(); }
function available(p) {
  const CHILL = ['idle', 'walk', 'coffee', 'void', 'scroll', 'shrug', 'sideeye', 'stretch', 'cry', 'corner', 'sigh', 'meditate', 'tea', 'dance'];
  return p.ground && !p.dragging && !p.leaving && !p.inEvent && !p.busy() && !p.owner && CHILL.includes(p.action);
}
function nearest(a, list) {
  return list.filter((p) => p !== a).sort((p, q) => Math.abs(p.x - a.x) - Math.abs(q.x - a.x))[0];
}

// Chạy một kịch bản với các thỏ tham gia; tự giải phóng khi xong hoặc khi bị chuột can thiệp
async function scene(ps, fn) {
  ps.forEach((p) => (p.inEvent = true));
  try { await fn(); } catch (e) { console.warn(e); }
  finally {
    for (const p of ps) {
      p.inEvent = false;
      if (!p.dead && p.ground && !p.dragging && p.until > performance.now() + HOLD / 2) p.until = performance.now() + rand(300, 1200);
    }
  }
}

// a đi tới cạnh b (cách gap px), chờ tới nơi
async function approach(a, b, gap = 70) {
  const side = a.x < b.x ? -1 : 1;
  const tx = b.x + side * gap;
  if (Math.abs(tx - a.x) < 14) return;
  b.do(b.action === 'walk' ? 'idle' : b.action, { dur: HOLD });
  a.walkTo(tx);
  const t0 = performance.now();
  while (ok(a, b) && a.target != null && performance.now() - t0 < 7000) await sleep(80);
}

// Mấy đứa rảnh xung quanh kéo tới hóng
function gatherCrowd(x, exclude) {
  const crowd = [...world.pets].filter((p) => available(p) && !exclude.includes(p) && Math.abs(p.x - x) < 800).slice(0, 3);
  crowd.forEach((p, i) => {
    p.inEvent = true;
    const side = p.x < x ? -1 : 1;
    p.walkTo(x + side * rand(140, 220));
    p.onArrive = () => { if (!p.dead) { p.dir = x > p.x ? 1 : -1; p.do(Math.random() < 0.55 ? 'watch' : 'cheer', { dur: HOLD, say: 0.25 }); } };
  });
  return crowd;
}
function releaseCrowd(crowd) {
  crowd.forEach((p) => { if (!p.dead) { p.inEvent = false; p.onArrive = null; p.do(pick(['idle', 'shrug', 'rofl', 'sideeye']), { say: 0.5 }); } });
}

// ---------- cãi nhau ----------
async function argue(a, b) {
  await scene([a, b], async () => {
    const sc = { ...pick(ARGUMENTS) };
    sc.lines = sc.lines.slice(0, 4);
    a.emote('🗯️');
    await approach(a, b, 75);
    if (!ok(a, b)) return;
    face(a, b);
    a.do('argue', { dur: HOLD }); b.do('argue', { dur: HOLD });
    const crowd = gatherCrowd((a.x + b.x) / 2, [a, b]);
    let mediated = false;
    for (let i = 0; i < sc.lines.length; i++) {
      if (!ok(a, b)) { releaseCrowd(crowd); return; }
      const sp = i % 2 ? b : a;
      sp.say(sc.lines[i], 2300); sp.bump();
      await sleep(1900 + sc.lines[i].length * 18);
      // giữa chừng có đứa (ưu tiên Thầy) vào can
      if (i === 3 && !mediated && Math.random() < 0.35) {
        const m = [...world.pets].find((p) => available(p) && p.type === 'sage') || crowd[0];
        if (m && !m.dead) {
          mediated = true;
          m.say(line('mediate'), 2500); await sleep(2200);
          if (Math.random() < 0.5) { a.say(line('makeup')); await sleep(800); a.do('hug'); b.do('hugged'); releaseCrowd(crowd); return; }
          a.say('ông im đi!', 1500); b.say('đúng, im!', 1500); m.do('facepalm'); await sleep(1200);
        }
      }
    }
    let end = sc.end === 'any' ? pick(['fight', 'fight', 'makeup', 'walk']) : sc.end;
    if (end === 'fight') {
      releaseCrowd(crowd);
      a.inEvent = b.inEvent = false;
      return pick([brawl, brawl, duel, shootout])(a, b);
    }
    if (end === 'makeup') { a.say(line('makeup')); await sleep(1200); face(a, b); a.do('hug'); b.do('hugged'); }
    else { a.do('sigh', { say: 0 }); a.say('thôi. nói chuyện với tường còn hơn.'); b.do('rage'); }
    releaseCrowd(crowd);
  });
}

// ---------- đánh nhau: đám mây bụi kiểu hoạt hình ----------
async function brawl(a, b) {
  await scene([a, b], async () => {
    a.emote(pick(['💢', '😤', '🥊']));
    await approach(a, b, 40);
    if (!ok(a, b)) return;
    face(a, b);
    b.emote(pick(['💢', '😠', '🥊'])); await sleep(700);
    const mx = (a.x + b.x) / 2 + a.w / 2, fy = world.H - 4;
    const crowd = gatherCrowd(mx - a.w / 2, [a, b]);
    a.do('brawl', { dur: HOLD }); b.do('brawl', { dur: HOLD });
    const cloud = makeBrawlCloud(mx, fy, [a.pal.H || a.pal[a.ch.skin], b.pal.H || b.pal[b.ch.skin], a.pal[a.ch.skin], b.pal[b.ch.skin]]);
    await sleep(rand(3200, 4600));
    cloud.remove();
    if (a.dead || b.dead) { releaseCrowd(crowd); return; }
    await finish(a, b, crowd);
  });
}

// kết thúc trận: thắng/thua/hoà/làm hoà
async function finish(a, b, crowd, winLines = 'win') {
  const r = Math.random();
  if (r < 0.15) {
    a.do('idle'); b.do('idle'); a.say(line('makeup')); await sleep(900); face(a, b); a.do('hug'); b.do('hugged');
  } else if (r < 0.3) {
    a.knock(-1 * (b.x > a.x ? 1 : -1), 0.8); b.knock(b.x > a.x ? 1 : -1, 0.8);
    await sleep(900); a.say(line('draw'));
  } else {
    const [w, l] = Math.random() < 0.5 ? [a, b] : [b, a];
    l.knock(l.x >= w.x ? 1 : -1, 1.1, Math.random() < 0.3 ? 'pancake' : 'faint');
    w.do('flex'); if (Math.random() < 0.5) w.say(line(winLines)); else w.emote();
    await sleep(1400); if (!l.dead) l.emote(pick(['😵', '🤕', '🏳️']));
    l.grudge = Math.random() < 0.6 ? w : null;
    if (l.type === 'puff' && Math.random() < 0.7) setTimeout(() => { if (!l.dead && l.ground) { l.inEvent = false; l.puffUp(); } }, 3000);
  }
  await sleep(1200);
  releaseCrowd(crowd || []);
}

function makeBrawlCloud(cx, fy, colors) {
  const el = document.createElement('div');
  el.className = 'brawl';
  el.style.left = cx + 'px'; el.style.top = fy + 'px';
  for (let i = 0; i < 9; i++) {
    const pf = document.createElement('div');
    pf.className = 'puff';
    const sz = 34 + Math.random() * 30;
    pf.style.cssText = `width:${sz}px;height:${sz}px;left:${(Math.random() * 2 - 1) * 45 - sz / 2}px;top:${-sz - Math.random() * 55}px;animation-delay:${(Math.random() * 0.3).toFixed(2)}s`;
    el.appendChild(pf);
  }
  world.layer.appendChild(el);
  const words = ['BỐP!', 'BỤP!', 'ÁI!', '#@!%', 'UỲNH!', 'CHÁT!', 'Á Á!', 'BỐC!', '*&%$!'];
  const timer = setInterval(() => {
    if (!el.isConnected) return clearInterval(timer);
    const w = document.createElement('div');
    w.className = 'pow'; w.textContent = pick(words);
    w.style.left = (Math.random() * 2 - 1) * 70 + 'px'; w.style.top = -60 - Math.random() * 70 + 'px';
    w.style.setProperty('--r', (Math.random() * 40 - 20).toFixed(0) + 'deg');
    el.appendChild(w); setTimeout(() => w.remove(), 650);
    // tay chân văng ra khỏi đám bụi
    const limb = document.createElement('div');
    limb.className = 'limb'; limb.style.background = pick(colors);
    limb.style.left = (Math.random() * 2 - 1) * 40 + 'px'; limb.style.top = -20 - Math.random() * 60 + 'px';
    limb.style.setProperty('--dx', (Math.random() * 2 - 1) * 40 + 'px');
    el.appendChild(limb); setTimeout(() => limb.remove(), 300);
  }, 170);
  return el;
}

// ---------- đấu kiếm ----------
async function duel(a, b) {
  await scene([a, b], async () => {
    a.emote('⚔️');
    await approach(a, b, 95);
    if (!ok(a, b)) return;
    face(a, b);
    a.do('swordReady', { dur: HOLD }); b.do('swordReady', { dur: HOLD });
    b.emote('⚔️');
    const crowd = gatherCrowd((a.x + b.x) / 2, [a, b]);
    await sleep(1100);
    const rounds = 3 + Math.floor(Math.random() * 3);
    for (let k = 0; k < rounds; k++) {
      if (!ok(a, b)) { releaseCrowd(crowd); return; }
      const atk = k % 2 ? b : a;
      atk.do('swing', { dur: HOLD });
      await sleep(180);
      clash((a.x + b.x) / 2 + a.w / 2, a.y + a.footY - 40);
      await sleep(420);
      atk.do('swordReady', { dur: HOLD });
      await sleep(250);
    }
    if (!ok(a, b)) { releaseCrowd(crowd); return; }
    const [w, l] = Math.random() < 0.5 ? [a, b] : [b, a];
    w.do('swing', { dur: HOLD }); await sleep(200);
    clash((a.x + b.x) / 2 + a.w / 2, a.y + a.footY - 40, true);
    flyingSword(l);
    l.knock(l.x >= w.x ? 1 : -1, 1.2);
    await sleep(500);
    w.do('flex'); if (Math.random() < 0.5) w.say(line('duelWin')); else w.emote('🏆');
    await sleep(1500); if (!l.dead) l.emote(pick(['😵', '🤕', '🏳️']));
    l.grudge = Math.random() < 0.5 ? w : null;
    await sleep(1000);
    releaseCrowd(crowd);
  });
}

function clash(x, y, big) {
  const el = document.createElement('div');
  el.className = 'clash' + (big ? ' big' : '');
  el.style.left = x + 'px'; el.style.top = y + 'px';
  el.innerHTML = `<span>${pick(['KENG!', 'CHOANG!', 'XOẸT!', 'KENG KENG!'])}</span>`;
  for (let i = 0; i < 8; i++) {
    const s = document.createElement('i');
    const ang = Math.random() * Math.PI * 2, d = 18 + Math.random() * 26;
    s.style.setProperty('--dx', Math.cos(ang) * d + 'px'); s.style.setProperty('--dy', Math.sin(ang) * d + 'px');
    el.appendChild(s);
  }
  world.layer.appendChild(el);
  setTimeout(() => el.remove(), 520);
}

function flyingSword(p) {
  const el = document.createElement('div');
  el.className = 'flysword';
  el.style.left = p.x + p.w / 2 + 'px'; el.style.top = p.y + p.footY - 50 + 'px';
  el.style.setProperty('--dx', (Math.random() < 0.5 ? -1 : 1) * rand(80, 160) + 'px');
  world.layer.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

// ---------- đấu súng (súng đồ chơi) ----------
async function shootout(a, b) {
  await scene([a, b], async () => {
    face(a, b);
    a.emote('🤠');
    // lùi ra xa nhau
    const mid = (a.x + b.x) / 2;
    const left = a.x < b.x ? a : b, right = left === a ? b : a;
    left.walkTo(Math.max(0, mid - rand(180, 260)));
    right.walkTo(Math.min(world.W - right.w, mid + rand(180, 260)));
    const t0 = performance.now();
    while (ok(a, b) && (a.target != null || b.target != null) && performance.now() - t0 < 6000) await sleep(80);
    if (!ok(a, b)) return;
    face(a, b);
    a.do('aim', { dur: HOLD }); b.do('aim', { dur: HOLD });
    const crowd = gatherCrowd(mid, [a, b]);
    tumbleweed();
    b.emote('1️⃣'); await sleep(1000);
    a.emote('2️⃣'); await sleep(1000 + Math.random() * 900);
    if (!ok(a, b)) { releaseCrowd(crowd); return; }
    const [sh, tg] = Math.random() < 0.5 ? [a, b] : [b, a];
    const miss = Math.random() < 0.15;
    sh.do('shoot', { dur: HOLD }); sh.emote('💥');
    const hit = await fire(sh, tg, miss);
    await sleep(200);
    sh.do('aim', { dur: HOLD });
    if (!hit) {
      if (ok(tg)) { tg.do('shoot', { dur: HOLD }); await fire(tg, sh, true); }
      await sleep(600); a.do('shrug', { say: 0 }); b.do('shrug', { say: 0 }); a.emote('🤷'); b.emote('🙃');
    } else {
      await sleep(700); sh.do('flex'); if (Math.random() < 0.5) sh.say(line('shooterWin')); else sh.emote(pick(['😎', '🤠', '💨']));
      tg.grudge = Math.random() < 0.6 ? sh : null;
    }
    await sleep(1600);
    releaseCrowd(crowd);
  });
}

// Bắn liên tục vào đứa gần nhất (từ menu)
async function sprayAt(a, b) {
  await scene([a], async () => {
    face(a, b);
    a.do('aim', { dur: HOLD }); a.emote('🎯');
    await sleep(400);
    for (let i = 0; i < 3 && ok(a); i++) {
      a.do('shoot', { dur: HOLD });
      if (ok(b)) fire(a, b, Math.random() < 0.3);
      await sleep(260); a.do('aim', { dur: HOLD }); await sleep(220);
    }
    await sleep(500);
    a.do('flex');
  });
}

// Đạn xốp bay ngang; trúng thì hất văng mục tiêu
function fire(sh, tg, forceMiss) {
  return new Promise((resolve) => {
    const el = document.createElement('div');
    el.className = 'bullet';
    const dir = tg.x >= sh.x ? 1 : -1;
    let x = sh.x + sh.w / 2 + dir * 13 * sh.scale, y = sh.y + (OY + 11.5) * sh.scale;
    const vy = forceMiss ? -rand(80, 160) : 0;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    world.layer.appendChild(el);
    let last = performance.now();
    const step = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      x += dir * 1100 * dt; y += vy * dt;
      el.style.left = x + 'px'; el.style.top = y + 'px';
      const hitbox = !tg.dead && x > tg.x + tg.w * 0.3 && x < tg.x + tg.w * 0.7 && y > tg.y + OY * tg.scale && y < tg.y + tg.footY;
      if (hitbox && !forceMiss) {
        el.remove(); impact(x, y);
        tg.knock(dir, 0.9); if (Math.random() < 0.4) tg.say(line('shot')); else tg.emote(pick(['😵', '🤕', '💫']));
        return resolve(true);
      }
      if (x < -50 || x > world.W + 50) { el.remove(); return resolve(false); }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
function impact(x, y) {
  const el = document.createElement('div');
  el.className = 'clash'; el.style.left = x + 'px'; el.style.top = y + 'px';
  el.innerHTML = `<span>${pick(['BỤP!', 'PẶC!', 'TRÚNG!'])}</span>`;
  world.layer.appendChild(el); setTimeout(() => el.remove(), 450);
}
function tumbleweed() {
  const el = document.createElement('div');
  el.className = 'tumbleweed';
  const fromLeft = Math.random() < 0.5;
  el.style.top = world.H - 26 + 'px';
  el.style.setProperty('--from', fromLeft ? '-40px' : world.W + 40 + 'px');
  el.style.setProperty('--to', fromLeft ? world.W + 40 + 'px' : '-40px');
  world.layer.appendChild(el); setTimeout(() => el.remove(), 4200);
}

// ---------- Thầy Thỏ giảng đạo ----------
async function lecture(sage, b) {
  await scene([sage, b], async () => {
    sage.emote('☝️');
    await approach(sage, b, 80);
    if (!ok(sage, b)) return;
    face(sage, b);
    sage.do('lecture', { dur: HOLD }); b.do('listen', { dur: HOLD });
    const lec = pick(LECTURES).slice(0, 3);
    for (let i = 0; i < lec.length; i++) {
      if (!ok(sage, b)) return;
      sage.say(lec[i], 2700); sage.bump();
      await sleep(2300 + lec[i].length * 22);
      if (i === 1) b.do(pick(['sleep', 'sideeye', 'facepalm', 'soul', 'void', 'listen']), { dur: HOLD, say: 0 });
    }
    if (!ok(sage, b)) return;
    const r = Math.random();
    if (r < 0.15) {
      b.do('cheer', { say: 0 }); b.say(line('lectureClap'));
      sage.do('tea', { say: 0 }); await sleep(800); sage.say('tốt. giờ đi rửa ly cho ta.');
    } else if (r < 0.3) {
      b.say(line('lectureFlee'));
      b.walkTo(b.x + (b.x < sage.x ? -1 : 1) * rand(300, 500), 'run');
      b.inEvent = false; await sleep(500); sage.do('sigh'); sage.say('tuổi trẻ…');
    } else if (r < 0.42) {
      b.do('argue', { dur: HOLD }); b.say(line('lectureArgue'));
      await sleep(2200); sage.say('con dám cãi ta?'); await sleep(1600);
      sage.inEvent = b.inEvent = false;
      return pick([duel, brawl, argue])(sage, b);
    } else {
      b.do('idle', { say: 0 }); b.say(line('lectureReply'));
      await sleep(1500); sage.do('meditate', { say: 0 }); sage.say('ta biết con chưa hiểu. ta cũng vậy.');
    }
    await sleep(1200);
  });
}

// ---------- chọn tình huống ngẫu nhiên ----------
function social() {
  const ps = [...world.pets].filter(available);
  if (ps.length < 2) return;

  // trả thù
  const g = ps.find((p) => p.grudge && !p.grudge.dead && available(p.grudge));
  if (g && Math.random() < 0.4) {
    const t = g.grudge; g.grudge = null; g.emote(pick(['😠', '💢', '😤']));
    return pick([brawl, duel, shootout, argue])(g, t);
  }

  const a = pick(ps), b = nearest(a, ps);
  if (!b) return;
  const sage = a.type === 'sage' ? a : b.type === 'sage' ? b : null;
  if (sage && Math.random() < 0.3) return lecture(sage, sage === a ? b : a);

  if ((b.action === 'cry' || b.action === 'corner') && Math.random() < 0.7) return goTo(a, b, () => { face(a, b); a.do('hug'); b.do('hugged'); });
  if (b.action === 'coffee' && Math.random() < 0.5) return goTo(a, b, () => { face(a, b); a.do('steal'); b.do('stolen'); setTimeout(() => ok(b) && b.ground && b.do('rage'), 2000); });

  const close = Math.abs(a.x - b.x) < 220;
  const r = Math.random();
  if (r < 0.38 && close && Math.random() < 0.8) {
    face(a, b); a.do('chat'); b.do('chat');
    const [e1, e2] = pick([['👋', '🫡'], ['☕?', '👍'], ['🍜?', '🤤'], ['😮‍💨', '🫂'], ['🐛', '😱'], ['🚀', '🙄'], ['🎉', '🥳'], ['💤', '💤']]);
    a.emote(e1); setTimeout(() => !b.dead && b.emote(e2), 1100);
  } else if (r < 0.38 && close) {
    const pair = pick(CHATS); face(a, b);
    a.do('chat'); b.do('chat'); a.say(pair[0], 2600);
    setTimeout(() => !b.dead && b.say(pair[1], 2800), 1500);
  } else if (r < 0.48) goTo(a, b, () => { face(a, b); a.do('highfive', { say: 0 }); b.do('highfive', { say: 0 }); a.emote('🙌'); b.emote('🙌'); });
  else if (r < 0.6) teaseChase(a, b);
  else if (r < 0.7 && close) { face(a, b); a.do('sideeye', { say: 0 }); b.do('sideeye', { say: 0 }); a.emote('🤨'); setTimeout(() => !b.dead && b.emote('😒'), 1100); }
  else if (r < 0.8 && ['hook', 'jet', 'puff'].includes(a.type) && Math.random() < 0.6) powerAttack(a, b);
  else if (r < 0.8) argue(a, b);
  else if (r < 0.88) (['hook', 'jet', 'puff'].includes(a.type) && Math.random() < 0.5 ? powerAttack : brawl)(a, b);
  else if (r < 0.94) duel(a, b);
  else shootout(a, b);
}

function teaseChase(a, b) {
  face(a, b); a.do('tease', { say: 0 });
  a.emote(pick(['😜', '😛']));
  setTimeout(() => {
    if (!ok(a, b)) return;
    const away = a.x < b.x ? -1 : 1;
    a.walkTo(a.x + away * rand(250, 450), 'flee');
    b.walkTo(a.x + away * rand(150, 300), 'chase');
    b.onArrive = () => { b.do('rage'); };
    a.onArrive = () => { a.do(Math.random() < 0.5 ? 'rofl' : 'tease'); };
  }, 1800);
}

function goTo(a, b, cb) {
  const side = a.x < b.x ? -1 : 1;
  const tx = b.x + side * (b.w * 0.55);
  if (Math.abs(tx - a.x) < 12) return cb();
  b.do('chat', { dur: 8000 });
  a.walkTo(tx);
  a.onArrive = () => { if (!b.dead && b.ground) cb(); };
}

// ---------- ném trúng nhau (bowling) ----------
function collisions(t) {
  for (const p of world.pets) {
    if (p.ground || p.dead || !(p.action === 'dangle' || p.action === 'tumble')) continue;
    if (Math.abs(p.vx) + Math.abs(p.vy) < 650) continue;
    for (const q of world.pets) {
      if (q === p || !q.ground || q.dead || q.owner || (q.knockedUntil || 0) > t) continue;
      if (Math.abs(p.x - q.x) < q.w * 0.35 && Math.abs(p.y + p.footY - (q.y + q.footY)) < 60) {
        q.knockedUntil = t + 1500;
        q.inEvent = false;
        q.knock(Math.sign(p.vx) || 1, 0.9);
        q.emote(pick(['😡', '🤕', '💢']));
        if (p.action === 'dangle') p.emote(pick(['🎳', '💥']));
        q.grudge = p;
      }
    }
  }
}

// ---------- phản ứng theo session ----------
function onSessionEvent(p, kind) {
  const near = [...world.pets].filter((q) => q !== p && available(q) && Math.abs(q.x - p.x) < 500);
  if (!near.length) return;
  const q = pick(near);
  if (kind === 'error') {
    setTimeout(() => { if (ok(q)) { q.dir = p.x > q.x ? 1 : -1; q.do('rofl', { say: 0 }); if (Math.random() < 0.4) q.say(line('mock')); else q.emote('🤣'); } }, 1200);
    setTimeout(() => { if (ok(p)) p.emote(pick(['😒', '😤', '🙄'])); }, 3000);
  } else if (kind === 'done') {
    setTimeout(() => { if (ok(q)) { q.do('cheer', { say: 0 }); q.emote(pick(['🎉', '👏', '🥳'])); } }, 900);
  }
}
