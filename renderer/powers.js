// Siêu năng lực của 3 thỏ siêu anh hùng (nhân vật gốc):
//  - Thỏ Dây Móc (hook): bắn móc lên mép màn hình / mép cửa sổ app / thỏ khác rồi đu như con lắc
//  - Thỏ Phản Lực (jet): bay bằng ba lô phản lực, có xăng, hết xăng thì rơi
//  - Thỏ Phình To (puff): nổi giận phình to gấp 2.6, dậm chân rung màn, nhấc thỏ khác ném đi

Object.assign(ACT, {
  aimRope:   { eyes: 'side', mouth: 'flat', props: ['rope-hand'] },
  swinging:  { eyes: 'happy', mouth: 'open', props: ['rope-hand'] },
  fly:       { eyes: 'happy', mouth: 'smile', props: ['jetflame'] },
  fuelOut:   { eyes: 'wide', mouth: 'open', anim: 'spin' },
  giant:     { eyes: 'angry', mouth: 'wide', props: ['steam'], blush: 'rage', anim: 'giant' },
  giantWalk: { eyes: 'angry', mouth: 'wide', props: ['steam'], blush: 'rage', walk: true, speed: 75, anim: 'stomp' },
  carry:     { eyes: 'angry', mouth: 'smile', props: ['steam'], blush: 'rage' },
  carried:   { eyes: 'wide', mouth: 'open', anim: 'dangle' },
  deflate:   { eyes: 'cry', mouth: 'wobble', props: ['sweatdrop'], dur: [2500, 3500], anim: 'shrink' },
});
Object.assign(EMOJI, {
  aimRope: ['🪝', '🎯'], swinging: ['🪝', '🤸', '😆', '🌬️'], fly: ['🚀', '😎', '✈️', '🛩️'], fuelOut: ['⛽', '😱'],
  giant: ['💢', '😤', '👊', '🌋'], giantWalk: ['💢', '👣'], carry: ['😈', '💪'], carried: ['😱', '🙀', '🆘'], deflate: ['😳', '🫣', '🎈'],
});
// Thoại siêu năng lực (swing/fly/puff…) và HERO_NAMES đã chuyển vào lines.js để dịch đa ngôn ngữ.
const HERO_FREE = { hook: { swing: 3.2 }, jet: { fly: 3.2 }, puff: { puffUp: 0.15 } };
const POWER_MOVES = { swing: 'swing', fly: 'startFly', puffUp: 'puffUp' };
const GIANT = 2.6;

// ---------- chọn bảng hành động tự do theo nhân vật ----------
Pet.prototype.freeTable = function () {
  if (this.type === 'sage') return SAGE_FREE;
  return HERO_FREE[this.type] ? { ...FREE, ...HERO_FREE[this.type] } : FREE;
};

// ---------- DÂY MÓC ----------
Pet.prototype.handPos = function () {
  return { x: this.x + this.w / 2, y: this.y + (OY + 3) * this.scale };
};

// Tìm điểm móc phía trên, hơi lệch về hướng muốn đu
Pet.prototype.findAnchor = function (dir, preferX) {
  const w = this.world, h = this.handPos();
  const cands = [];
  const wantX = preferX ?? h.x + dir * rand(120, 320);
  // mép trên màn hình
  cands.push({ x: Math.max(20, Math.min(w.W - 20, wantX)), y: 3, kind: 'screen' });
  // góc màn hình
  cands.push({ x: 4, y: 3, kind: 'corner' }, { x: w.W - 4, y: 3, kind: 'corner' });
  // mép trên + góc của các cửa sổ app khác
  for (const r of w.appRects || []) {
    if (r.y < 30 || r.y > h.y - 90) continue;
    const x = Math.max(r.x + 12, Math.min(r.x + r.w - 12, wantX));
    cands.push({ x, y: r.y, kind: 'window' }, { x: r.x + 6, y: r.y, kind: 'window' }, { x: r.x + r.w - 6, y: r.y, kind: 'window' });
  }
  // thỏ khác đang ở trên cao (ví dụ Thỏ Phản Lực đang bay)
  for (const q of w.pets) {
    if (q === this || q.dead) continue;
    const qy = q.y + OY * q.scale + 10;
    if (qy < h.y - 140) cands.push({ x: q.x + q.w / 2, y: qy, kind: 'pet', pet: q });
  }
  const ok = cands.filter((c) => {
    const dy = h.y - c.y, dx = c.x - h.x;
    return dy > 90 && Math.hypot(dx, dy) < 820 && Math.abs(dx) < 520;
  });
  if (!ok.length) return null;
  // ưu tiên: lệch đúng hướng, gần điểm mong muốn; cửa sổ app và thỏ khác được cộng điểm cho vui
  ok.forEach((c) => {
    c.score = Math.abs(c.x - wantX) + Math.abs((h.y - c.y) - 320) * 0.6 - (c.kind === 'window' ? 180 : c.kind === 'pet' ? 220 : 0) + Math.random() * 120;
    if (Math.sign(c.x - h.x) !== dir && Math.abs(c.x - h.x) > 40) c.score += 400;
  });
  ok.sort((a, b) => a.score - b.score);
  return ok[0];
};

Pet.prototype.ropeLine = function () {
  if (!this.ropeEl) {
    this.ropeEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.ropeEl.setAttribute('class', 'rope');
    this.world.ropes.appendChild(this.ropeEl);
  }
  return this.ropeEl;
};

Pet.prototype.shootRope = function (anchor, opts = {}) {
  const t = now();
  this.rope = {
    anchor, ax: anchor.x, ay: anchor.y, len: 0, shootStart: t, shootEnd: t + 170,
    releaseAt: t + (opts.releaseMs ?? rand(1300, 2300)), chain: opts.chain ?? 0, kick: opts.kick || null, dir: opts.dir ?? this.dir,
  };
  this.ground = false;
  if (this.vy > -200) this.vy = -320;
  this.vx = this.rope.dir * Math.max(Math.abs(this.vx), 220);
  this.do('swinging', { dur: HOLD_POWER });
  if (anchor.kind === 'window') this.world.spark?.(anchor.x, anchor.y);
};
const HOLD_POWER = 600000;

Pet.prototype.cutRope = function () {
  if (this.ropeEl) { this.ropeEl.remove(); this.ropeEl = null; }
  this.rope = null;
};

// Physics con lắc: trả về 'stop' nếu đã chuyển màn / bị huỷ
Pet.prototype.updateRope = function (t, dt) {
  const r = this.rope;
  if (r.anchor.pet) {
    const q = r.anchor.pet;
    if (q.dead) { this.cutRope(); this.vy += 1800 * dt; this.x += this.vx * dt; this.y += this.vy * dt; return; }
    r.ax = q.x + q.w / 2; r.ay = q.y + OY * q.scale + 10;
  }
  this.vy += 1800 * dt;
  this.x += this.vx * dt; this.y += this.vy * dt;
  const h = this.handPos();
  let line = this.ropeLine();
  if (t < r.shootEnd) {
    // dây đang bắn ra
    const k = (t - r.shootStart) / (r.shootEnd - r.shootStart);
    line.setAttribute('x1', h.x); line.setAttribute('y1', h.y);
    line.setAttribute('x2', h.x + (r.ax - h.x) * k); line.setAttribute('y2', h.y + (r.ay - h.y) * k);
    return;
  }
  if (!r.len) r.len = Math.hypot(h.x - r.ax, h.y - r.ay) * 0.92;
  const dx = h.x - r.ax, dy = h.y - r.ay, d = Math.hypot(dx, dy) || 1;
  const nx = dx / d, ny = dy / d;
  if (d > r.len) {
    const hx = r.ax + nx * r.len, hy = r.ay + ny * r.len;
    this.x += hx - h.x; this.y += hy - h.y;
    const radial = this.vx * nx + this.vy * ny;
    if (radial > 0) { this.vx -= radial * nx; this.vy -= radial * ny; }
  }
  // "đạp" thêm lực cho đu cao hơn
  const tx = -ny, ty = nx, vt = this.vx * tx + this.vy * ty;
  const pump = 380 * dt * (Math.abs(vt) < 40 ? r.dir : Math.sign(vt));
  if (ny > 0.3) { this.vx += tx * pump; this.vy += ty * pump; }
  this.dir = this.vx >= 0 ? 1 : -1;
  line.setAttribute('x1', this.handPos().x); line.setAttribute('y1', this.handPos().y);
  line.setAttribute('x2', r.ax); line.setAttribute('y2', r.ay);

  // đá trúng mục tiêu khi đang đu
  if (r.kick && !r.kick.dead) {
    const k = r.kick, kx = k.x + k.w / 2, ky = k.y + k.footY * 0.6;
    const px2 = this.x + this.w / 2, py2 = this.y + this.footY * 0.7;
    if (Math.hypot(kx - px2, ky - py2) < 45 && Math.hypot(this.vx, this.vy) > 250) {
      k.inEvent = false; k.knock(this.vx >= 0 ? 1 : -1, 1.4);
      this.world.impactAt?.(kx, ky, 'BỐP!');
      k.emote(pick(['😵', '🤕', '💫'])); this.emote('🦵');
      k.grudge = this; r.kick = null;
      r.releaseAt = t + 150;
    }
  }
  // buông dây khi đang vung lên phía trước
  const stuck = t > r.releaseAt + 2500 || (r.kick && t > r.releaseAt + 1500);
  if (stuck) { r.kick = null; this.cutRope(); this.do('leap', { dur: HOLD_POWER }); return; }
  if (t > r.releaseAt && this.vy < 60 && Math.sign(this.vx) === Math.sign(r.dir) && !r.kick) {
    this.vx *= 1.12; this.vy -= 120;
    const chain = r.chain;
    this.cutRope();
    this.do('leap', { dur: HOLD_POWER });
    if (chain > 0 && Math.random() < 0.75) {
      setTimeout(() => {
        if (this.dead || this.ground || this.dragging || this.rope) return;
        const a = this.findAnchor(this.vx >= 0 ? 1 : -1);
        if (a) this.shootRope(a, { chain: chain - 1, dir: this.vx >= 0 ? 1 : -1 });
      }, rand(180, 380));
    }
  }
};

Pet.prototype.swing = function (opts = {}) {
  if (this.type !== 'hook' || !this.ground || this.dragging) return false;
  const dir = opts.dir ?? (Math.random() < 0.5 ? -1 : 1);
  const anchor = this.findAnchor(dir, opts.preferX);
  if (!anchor) { this.emote('🤷'); return false; }
  this.dir = dir;
  this.do('aimRope', { dur: HOLD_POWER, say: 0 });
  if (Math.random() < 0.2) this.say(line('swing')); else this.emote(pick(['🪝', '😏', '🎯']));
  setTimeout(() => {
    if (this.dead || this.dragging || !this.ground) { if (!this.dead && this.ground && !this.dragging) this.next(); return; }
    this.vy = -380; this.vx = dir * 160;
    this.shootRope(anchor, { chain: opts.chain ?? (Math.random() < 0.6 ? 2 : 0), kick: opts.kick, dir, releaseMs: opts.releaseMs });
  }, 380);
  return true;
};

// ---------- BAY PHẢN LỰC ----------
Pet.prototype.pickFlyTarget = function (mode) {
  const w = this.world;
  if (mode === 'land') return { x: rand(20, w.W - this.w - 20), y: this.floor(), land: true };
  if (mode === 'away') {
    const o = (w.others || []).length ? pick(w.others) : null;
    if (o) return { x: o.x + o.w / 2 - this.w / 2, y: Math.max(o.y + 80, Math.min(o.y + o.h - 260, o.y + o.h / 2)), away: true };
  }
  return { x: rand(20, w.W - this.w - 20), y: rand(40, Math.max(60, this.floor() - 180)) };
};

Pet.prototype.startFly = function (opts = {}) {
  if (this.type !== 'jet' || this.dragging) return false;
  this.flying = {
    target: opts.target || this.pickFlyTarget(),
    fuelEnd: now() + (opts.fuelLeft ?? rand(9000, 16000)), hops: opts.hops ?? Math.floor(rand(2, 5)), lastSmoke: 0,
  };
  this.ground = false; this.target = null;
  if (this.vy > -150) this.vy = -260;
  this.do('fly', { dur: HOLD_POWER, say: 0 });
  if (!opts.silent) { if (Math.random() < 0.2) this.say(line('fly')); else this.emote(pick(['🚀', '😎'])); }
  this.world.dust(this, 10);
  return true;
};

Pet.prototype.stopFly = function (reason) {
  this.flying = null;
  const g = this.el.querySelector('.grow'); if (g) g.style.rotate = '';
  if (reason === 'fuel') { this.do('fuelOut', { dur: HOLD_POWER, say: 0 }); if (Math.random() < 0.4) this.say(line('fuelOut')); else this.emote(pick(['⛽', '😱'])); this.afterLand = 'pancake'; }
};

Pet.prototype.updateFly = function (t, dt) {
  const f = this.flying;
  if (t > f.fuelEnd) { this.stopFly('fuel'); return; }
  const tg = f.follow && !f.follow.dead ? { x: f.follow.x, y: f.follow.y - 170 } : f.target;
  const dx = tg.x - this.x, dy = tg.y - this.y, d = Math.hypot(dx, dy);
  const sp = f.away ? 420 : 300;
  const wantVx = (dx / (d || 1)) * Math.min(sp, d * 2.2), wantVy = (dy / (d || 1)) * Math.min(sp, d * 2.2);
  const acc = 1100 * dt;
  this.vx += Math.max(-acc, Math.min(acc, wantVx - this.vx));
  this.vy += Math.max(-acc, Math.min(acc, wantVy - this.vy)) + Math.sin(t / 180) * 30 * dt;
  this.x += this.vx * dt; this.y += this.vy * dt;
  this.dir = this.vx >= 0 ? 1 : -1;
  const g = this.el.querySelector('.grow'); if (g) g.style.rotate = Math.max(-18, Math.min(18, this.vx / 14)) * this.dir + 'deg';
  if (t - f.lastSmoke > 110) { f.lastSmoke = t; this.world.smoke?.(this.x + this.w / 2 - this.dir * 18, this.y + this.footY - 6); }
  if (!f.follow && d < 26) {
    if (tg.land) { this.stopFly(); this.vy = 80; return; }
    if (--f.hops <= 0) f.target = this.pickFlyTarget(Math.random() < 0.25 ? 'away' : 'land');
    else f.target = this.pickFlyTarget(Math.random() < 0.18 ? 'away' : undefined);
    if (f.target.away) f.away = true;
  }
};

// ---------- PHÌNH TO ----------
Pet.prototype.puffUp = function (ms) {
  if (this.type !== 'puff' || this.giantUntil || this.dead) return false;
  this.giantUntil = now() + (ms ?? rand(9000, 14000));
  this.basePal = this.basePal || { ...this.pal };
  Object.assign(this.pal, PUFF_RAGE);
  this.el.classList.add('giant');
  this.inEvent = true;
  this.do('giant', { dur: HOLD_POWER, say: 0 });
  if (Math.random() < 0.35) this.say(line('puff')); else this.emote(pick(['💢', '🌋', '😤']));
  this.world.quake?.(this, 0.6);
  giantLoop(this);
  return true;
};

Pet.prototype.deflate = function () {
  if (!this.giantUntil) return;
  this.giantUntil = 0;
  if (this.basePal) Object.assign(this.pal, this.basePal);
  this.el.classList.remove('giant');
  this.inEvent = false;
  if (this.carrying) { const c = this.carrying; this.carrying = null; c.carriedBy = null; c.inEvent = false; c.knock(this.dir, 0.6); }
  this.do('deflate', { say: 0 });
  if (Math.random() < 0.4) this.say(line('deflate')); else this.emote(pick(['😳', '🎈', '🫣']));
};

async function giantLoop(p) {
  const S = (ms) => new Promise((r) => setTimeout(r, ms));
  while (!p.dead && p.giantUntil && now() < p.giantUntil) {
    if (p.dragging) { await S(300); continue; }
    if (!p.ground) { await S(150); continue; }
    const victims = [...p.world.pets].filter((q) => q !== p && !q.dead && q.ground && !q.dragging && !q.carriedBy && !q.giantUntil && !q.leaving);
    const r = Math.random();
    if (r < 0.4 || !victims.length) {
      // dậm chân
      p.do('giant', { dur: HOLD_POWER, say: 0 });
      p.vy = -380; p.ground = false;
      await S(520);
      if (p.dead || !p.giantUntil) break;
      p.world.quake?.(p, 1);
      p.world.impactAt?.(p.x + p.w / 2, p.y + p.footY, 'RẦM!');
      await S(rand(700, 1300));
    } else {
      // tóm một đứa rồi ném
      const v = victims.sort((a, b) => Math.abs(a.x - p.x) - Math.abs(b.x - p.x))[0];
      p.target = Math.max(0, Math.min(p.world.W - p.w, v.x + (v.x > p.x ? -40 : 40)));
      p.dir = v.x > p.x ? 1 : -1;
      p.action = 'giantWalk'; p.until = HOLD_POWER + now(); p.applyClass();
      const t0 = now();
      while (!p.dead && p.giantUntil && p.target != null && now() - t0 < 6000) await S(80);
      if (p.dead || !p.giantUntil || v.dead || v.dragging || !v.ground) { await S(300); continue; }
      v.inEvent = true; v.target = null; v.cutRope?.(); v.flying = null;
      v.carriedBy = p; p.carrying = v;
      v.do('carried', { dur: HOLD_POWER, say: 0 });
      if (Math.random() < 0.35) v.say(line('grabbed')); else v.emote(pick(['😱', '🆘', '🙀']));
      p.do('carry', { dur: HOLD_POWER, say: 0 }); p.emote('😈');
      await S(1100);
      if (p.dead || !p.carrying) continue;
      p.carrying = null; v.carriedBy = null; v.inEvent = false;
      const dir = Math.random() < 0.5 ? -1 : 1;
      p.dir = dir; p.applyClass();
      v.knock(dir, 1.9, 'faint'); v.vy = -rand(780, 980);
      v.grudge = p;
      p.do('giant', { dur: HOLD_POWER, say: 0 });
      await S(rand(900, 1500));
    }
  }
  if (!p.dead) p.deflate();
}

// Đứa đang bị cõng/nhấc bổng: dính theo tay Thỏ Phình To
Pet.prototype.updateCarried = function () {
  const g = this.carriedBy;
  if (!g || g.dead || !g.giantUntil) { this.carriedBy = null; this.inEvent = false; this.ground = false; return false; }
  this.x = g.x + g.w / 2 - this.w / 2 + Math.sin(now() / 90) * 3;
  this.y = g.y + g.footY - 16 * g.scale * GIANT - this.footY + 14;
  this.ground = false; this.vx = 0; this.vy = 0;
  return true;
};

// ---------- CHIÊU ĐÁNH NHAU CỦA SIÊU ANH HÙNG ----------
async function powerAttack(a, b) {
  if (a.type === 'hook') return swingKick(a, b);
  if (a.type === 'jet') return bombRun(a, b);
  if (a.type === 'puff') { a.emote('😤'); return a.puffUp(); }
}

async function swingKick(a, b) {
  await scene([a, b], async () => {
    face(a, b);
    a.emote(pick(['😏', '🪝']));
    b.do(b.action === 'walk' ? 'idle' : b.action, { dur: HOLD });
    await sleep(500);
    if (!ok(a, b) || !a.ground) return;
    const dir = b.x >= a.x ? 1 : -1;
    // móc vào điểm phía trên giữa 2 đứa, hơi lệch về phía mục tiêu
    if (!a.swing({ dir, preferX: (a.x + b.x) / 2 + a.w / 2 + dir * 30, chain: 0, kick: b, releaseMs: 2600 })) return;
    const t0 = performance.now();
    while (!a.dead && (a.rope || !a.ground) && performance.now() - t0 < 5000) await sleep(100);
  });
}

async function bombRun(a, b) {
  await scene([a, b], async () => {
    a.emote('😈');
    if (!a.startFly({ silent: true, fuelLeft: 12000 })) return;
    a.flying.follow = b;
    if (Math.random() < 0.3) a.say(line('bomb'));
    await sleep(1600);
    for (let i = 0; i < 3 && a.flying && ok(b); i++) {
      dropBread(a, b);
      await sleep(rand(450, 700));
    }
    await sleep(800);
    if (a.flying) { a.flying.follow = null; a.flying.hops = 1; a.flying.target = a.pickFlyTarget(); }
  });
}

function dropBread(a, tg) {
  const el = document.createElement('div');
  el.className = 'bread'; el.textContent = '🥖';
  let x = a.x + a.w / 2, y = a.y + a.footY - 10, vx = a.vx * 0.4, vy = 60, rot = 0;
  world.layer.appendChild(el);
  let last = performance.now();
  const step = (t) => {
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    vy += 1500 * dt; x += vx * dt; y += vy * dt; rot += 600 * dt;
    el.style.transform = `translate(${x - 12}px, ${y - 12}px) rotate(${rot}deg)`;
    const kx = tg.x + tg.w / 2, ky = tg.y + tg.footY * 0.6;
    if (!tg.dead && Math.abs(kx - x) < tg.w * 0.3 && Math.abs(ky - y) < 40) {
      el.remove(); world.impactAt?.(x, y, 'BỘP!');
      tg.inEvent = false; tg.knock(vx >= 0 ? 1 : -1, 0.7, 'faint'); tg.emote(pick(['🥖', '😵', '🤕'])); tg.grudge = a;
      return;
    }
    if (y > world.H + 40) { el.remove(); return; }
    if (y > world.H - 14) { el.remove(); world.impactAt?.(x, world.H - 20, 'bộp'); return; }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
