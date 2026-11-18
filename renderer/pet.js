// Một con thỏ trên màn hình: vật lý, hành động, tự nói chuyện, gắn với session Claude.
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const now = () => performance.now();
function line(key, ctx = {}) {
  const l = pick(LINES[key] || ['…']);
  return l.replace(/\{tool\}/g, ctx.tool || 'tool').replace(/\{project\}/g, ctx.project || 'project');
}

// eyes / mouth / props / blush: hình dạng mặt; anim: class CSS cho chuyển động thân; dur: ms
const ACT = {
  fall:     { eyes: 'wide', mouth: 'open', anim: 'fall' },
  land:     { eyes: 'tired', mouth: 'wide', dur: [1100, 1100], lines: 'land', say: 0.7, anim: 'squash' },
  idle:     { eyes: 'tired', mouth: 'flat', dur: [3000, 7000], lines: 'idle', anim: 'breathe' },
  walk:     { eyes: 'tired', mouth: 'flat', walk: true, lines: 'walk', anim: 'hop' },
  sigh:     { eyes: 'tired', mouth: 'frown', props: ['cloud'], dur: [4000, 6500], lines: 'sigh', say: 0.8, anim: 'sad' },
  coffee:   { eyes: 'tired', mouth: 'flat', props: ['mug'], dur: [4000, 7000], lines: 'coffee', say: 0.6, anim: 'breathe' },
  void:     { eyes: 'wide', mouth: 'none', dur: [4000, 7000], lines: 'void', say: 0.6 },
  dance:    { eyes: 'happy', mouth: 'smile', dur: [3000, 4500], lines: 'dance', say: 0.7, anim: 'dance' },
  scroll:   { eyes: 'down', mouth: 'frown', props: ['phone'], dur: [4000, 7000], lines: 'scroll', say: 0.6 },
  sleep:    { eyes: 'closed', mouth: 'flat', props: ['zzz'], dur: [8000, 15000], lines: 'sleep', say: 0.4, anim: 'sleep' },
  flip:     { eyes: 'happy', mouth: 'smile', dur: [900, 900], lines: 'flip', say: 0.6, anim: 'flip' },
  cry:      { eyes: 'cry', mouth: 'wobble', props: ['tears'], dur: [4000, 6000], lines: 'cry', say: 0.9, anim: 'sob' },
  rage:     { eyes: 'angry', mouth: 'wide', props: ['steam'], blush: 'rage', dur: [3000, 4000], lines: 'rage', say: 1, anim: 'rage' },
  facepalm: { eyes: 'closed', mouth: 'frown', props: ['hand'], dur: [2500, 3500], lines: 'facepalm', say: 0.9, anim: 'sad' },
  shrug:    { eyes: 'tired', mouth: 'flat', props: ['shrug'], dur: [2200, 3000], lines: 'shrug', say: 0.9 },
  sideeye:  { eyes: 'side', mouth: 'flat', props: ['sweatdrop'], dur: [2500, 4000], lines: 'sideeye', say: 0.8 },
  melt:     { eyes: 'tired', mouth: 'wobble', props: ['puddle'], dur: [4000, 6000], lines: 'melt', say: 0.8, anim: 'melt' },
  soul:     { eyes: 'dead', mouth: 'open', props: ['ghost'], dur: [4000, 5500], lines: 'soul', say: 0.9, anim: 'still' },
  hide:     { eyes: 'side', mouth: 'none', props: ['box'], dur: [5000, 9000], lines: 'hide', say: 0.7 },
  corner:   { eyes: 'cry', mouth: 'frown', props: ['cloud'], dur: [5000, 8000], lines: 'corner', say: 0.8, anim: 'shrink' },
  rofl:     { eyes: 'happy', mouth: 'laugh', props: ['tears'], dur: [3000, 4000], lines: 'rofl', say: 1, anim: 'rofl' },
  faint:    { eyes: 'dead', mouth: 'open', props: ['stars'], dur: [3500, 5000], lines: 'faint', say: 0.8, anim: 'faint' },
  headbang: { eyes: 'closed', mouth: 'wide', props: ['stars'], dur: [2500, 3500], lines: 'headbang', say: 0.9, anim: 'headbang' },
  spin:     { eyes: 'spiral', mouth: 'smile', dur: [1800, 2400], lines: 'spin', say: 0.6, anim: 'spin' },
  stretch:  { eyes: 'closed', mouth: 'open', dur: [1800, 2400], lines: 'stretch', say: 0.6, anim: 'stretch' },
  pancake:  { eyes: 'dead', mouth: 'flat', dur: [2000, 3000], lines: 'pancake', say: 0.9, anim: 'pancake' },
  tease:    { eyes: 'happy', mouth: 'tongue', dur: [1800, 2400], lines: 'tease', say: 1, anim: 'wiggle' },
  flee:     { eyes: 'happy', mouth: 'tongue', walk: true, speed: 150, anim: 'hop' },
  chase:    { eyes: 'angry', mouth: 'wide', props: ['steam'], blush: 'rage', walk: true, speed: 130, lines: 'chase', say: 1, anim: 'hop' },
  hug:      { eyes: 'happy', mouth: 'smile', props: ['heart'], dur: [2500, 2500], lines: 'hug', say: 1 },
  hugged:   { eyes: 'cry', mouth: 'smile', props: ['heart'], dur: [2500, 2500], lines: 'hugged', say: 1 },
  highfive: { eyes: 'happy', mouth: 'smile', props: ['stars'], dur: [1400, 1400], lines: 'highfive', say: 0.8, anim: 'jump' },
  steal:    { eyes: 'side', mouth: 'smile', props: ['mug'], dur: [2500, 3000], lines: 'steal', say: 1 },
  stolen:   { eyes: 'wide', mouth: 'open', props: ['sweatdrop'], dur: [2000, 2000], lines: 'stolen', say: 1, anim: 'rage' },
  // cãi nhau, đánh nhau, súng, kiếm
  argue:    { eyes: 'angry', mouth: 'wide', blush: 'rage', anim: 'argue' },
  brawl:    { eyes: 'angry', mouth: 'wide', anim: 'hidden' },
  tumble:   { eyes: 'dead', mouth: 'open', anim: 'spin' },
  flex:     { eyes: 'happy', mouth: 'smile', props: ['stars'], dur: [2600, 2600], anim: 'jump' },
  watch:    { eyes: 'wide', mouth: 'open', props: ['phone'], lines: 'watch', say: 0.4 },
  cheer:    { eyes: 'happy', mouth: 'open', anim: 'jump', lines: 'cheer', say: 0.5 },
  aim:      { eyes: 'side', mouth: 'flat', props: ['gun'] },
  shoot:    { eyes: 'angry', mouth: 'wide', props: ['gun', 'flash'], anim: 'recoil' },
  swordReady: { eyes: 'angry', mouth: 'flat', props: ['sword'], anim: 'breathe' },
  swing:    { eyes: 'angry', mouth: 'wide', props: ['sword', 'swing'], anim: 'lunge' },
  lecture:  { eyes: 'closed', mouth: 'flat', props: ['scroll'], anim: 'preach' },
  listen:   { eyes: 'tired', mouth: 'flat' },
  meditate: { eyes: 'closed', mouth: 'smile', dur: [5000, 8000], lines: 'wisdom', say: 0.7, anim: 'float' },
  tea:      { eyes: 'closed', mouth: 'smile', props: ['mug'], dur: [4000, 7000], lines: 'wisdom', say: 0.7 },
  // trạng thái theo session Claude
  working:  { eyes: 'tired', mouth: 'flat', props: ['laptop'], lines: 'working', say: 1, typing: true },
  thinking: { eyes: 'side', mouth: 'flat', props: ['qmark'], lines: 'thinking', say: 1, anim: 'breathe' },
  waiting:  { eyes: 'wide', mouth: 'open', props: ['sign'], lines: 'waiting', say: 1, anim: 'bounce' },
  done:     { eyes: 'happy', mouth: 'smile', props: ['confetti'], dur: [5000, 5000], lines: 'done', say: 1, anim: 'jump' },
  error:    { eyes: 'dead', mouth: 'open', props: ['cloud'], dur: [4500, 4500], lines: 'error', say: 1, anim: 'faint' },
  // tương tác
  poke:     { eyes: 'wide', mouth: 'open', dur: [900, 900], lines: 'poke', say: 1, anim: 'squash' },
  angry:    { eyes: 'angry', mouth: 'wide', props: ['steam'], blush: 'rage', dur: [2500, 2500], lines: 'angry', say: 1, anim: 'rage' },
  dangle:   { eyes: 'wide', mouth: 'open', lines: 'dangle', say: 1, anim: 'dangle' },
  leave:    { eyes: 'tired', mouth: 'flat', walk: true, lines: 'leave', say: 1, anim: 'hop' },
  chat:     { eyes: 'tired', mouth: 'flat', dur: [3200, 3200] },
  // nhảy qua màn hình khác
  run:      { eyes: 'happy', mouth: 'open', walk: true, speed: 170, anim: 'hop' },
  windup:   { eyes: 'side', mouth: 'smile', dur: [650, 650], anim: 'windup' },
  leap:     { eyes: 'happy', mouth: 'open', props: ['stars'], anim: 'leap' },
  arrive:   { eyes: 'wide', mouth: 'smile', dur: [1300, 1300], lines: 'arrive', say: 0.9, anim: 'squash' },
};

// Hành động tự do khi không có việc (trọng số)
const FREE = {
  idle: 3, walk: 4, sigh: 1.1, coffee: 1, void: 0.6, dance: 0.6, scroll: 1, sleep: 0.5, flip: 0.35,
  cry: 0.4, rage: 0.3, facepalm: 0.6, shrug: 0.6, sideeye: 0.6, melt: 0.35, soul: 0.3, hide: 0.35,
  corner: 0.35, rofl: 0.35, faint: 0.2, headbang: 0.3, spin: 0.35, stretch: 0.6, pancake: 0.2,
};
// Emoji cảm xúc cho từng hành động (bật lên trên đầu thay cho lời nói)
const EMOJI = {
  idle: ['😐', '🫥', '😑', '🥱'], walk: ['🚶', '😮‍💨'], sigh: ['😮‍💨', '🌧️', '😞'], coffee: ['☕', '☕', '🫗'], void: ['🫥', '🌀', '🕳️'],
  dance: ['🎶', '💃', '🕺', '🪩'], scroll: ['📱', '😩', '📉'], sleep: ['😴', '💤', '🛌'], flip: ['🤸', '✨'], cry: ['😭', '💧', '🥲'],
  rage: ['💢', '🤬', '🔥', '😤'], facepalm: ['🤦', '😩', '🙃'], shrug: ['🤷', '¯\\_(ツ)_/¯'], sideeye: ['🙄', '👀', '🤨', '😒'],
  melt: ['🫠', '🥵', '🫠'], soul: ['👻', '💀', '🪦'], hide: ['📦', '🙈', '🫣'], corner: ['🥀', '😔', '🫂'], rofl: ['🤣', '😂', '💀'],
  faint: ['😵', '💫', '🪦'], headbang: ['😵‍💫', '⌨️', '🔨'], spin: ['🌀', '😵‍💫', '🌪️'], stretch: ['🙆', '✨', '🦴'], pancake: ['🥞', '🫓'],
  tease: ['😜', '😛', '🤪'], chase: ['💢', '😤', '🏃'], flee: ['😝', '💨'], hug: ['🤗', '❤️', '🫂'], hugged: ['🥹', '💕', '🥺'],
  highfive: ['🙌', '✋', '🤝'], steal: ['😏', '☕', '🦹'], stolen: ['😱', '☕❓', '😾'], working: ['⌨️', '💻', '🛠️', '🔧'],
  thinking: ['🤔', '💭', '🧠'], waiting: ['✋', '🙏', '⏳', '👀'], done: ['🎉', '✅', '🥳', '🚀'], error: ['💥', '🔥', '💀', '🧯'],
  poke: ['❗', '😠', '👉', '❓'], angry: ['💢', '😡', '🤬'], dangle: ['😨', '🙀', '😱'], land: ['💥', '🤕', '😖'],
  leap: ['🚀', '✨', '🦘'], arrive: ['👋', '🛬', '😎'], argue: ['💢', '🗯️', '😤'], flex: ['💪', '😎', '🏆'],
  watch: ['📱', '🍿', '👀', '📸'], cheer: ['📣', '🙌', '🔥'], aim: ['🎯', '🤠'], shoot: ['💥', '🔫'], swordReady: ['⚔️', '😠'],
  swing: ['⚔️', '💥'], lecture: ['📜', '☝️', '🧘'], listen: ['😐', '😴', '🙄'], meditate: ['🧘', '☯️', '🍃'], tea: ['🍵', '🫖'],
  tumble: ['😵', '💫', '🌪️'], chat: ['💬'], windup: ['😤', '💨'], run: ['💨', '🏃'], fall: ['😱'],
};
// Ít khi xuất hiện emoji ở các hành động bình thường
const EMOTE_P = { idle: 0.15, walk: 0.08, run: 0.3, chat: 0, brawl: 0, fall: 0.3 };
const TALK = 0.12; // hệ số nói: càng nhỏ càng ít nói

const SAGE_FREE = { idle: 2, walk: 3, meditate: 2.2, tea: 1.5, stretch: 0.5, void: 0.6, sigh: 0.3, facepalm: 0.3, shrug: 0.4 };
const SESSION_STATES = ['working', 'thinking', 'waiting'];

function weighted(table) {
  const entries = Object.entries(table);
  let r = Math.random() * entries.reduce((s, [, w]) => s + w, 0);
  for (const [k, w] of entries) { if ((r -= w) <= 0) return k; }
  return entries[0][0];
}

class Pet {
  static z = 10;
  constructor(world, o = {}) {
    this.world = world;
    this.type = o.type || pick(Object.keys(CHARS));
    this.ch = CHARS[this.type];
    this.pal = { ...this.ch.pal };
    if (o.hoodie) { this.pal.H = o.hoodie[0]; this.pal.h = o.hoodie[1]; }
    this.scale = o.scale || 4;
    this.name = o.name || pick(NAMES);
    this.owner = o.owner || null;
    this.offset = o.offset || 0;
    this.session = null;
    this.label = o.label || this.name;

    this.el = document.createElement('div');
    this.el.className = 'pet';
    this.el.innerHTML = '<div class="bubble"></div><div class="spr"><div class="grow"><canvas></canvas></div></div><div class="tag"></div>';
    this.canvas = this.el.querySelector('canvas');
    this.canvas.width = SPR_W; this.canvas.height = SPR_H;
    this.canvas.style.width = SPR_W * this.scale + 'px';
    this.canvas.style.height = SPR_H * this.scale + 'px';
    this.ctx2d = this.canvas.getContext('2d');
    this.bubble = this.el.querySelector('.bubble');
    this.tagEl = this.el.querySelector('.tag');
    this.el._pet = this;
    world.layer.appendChild(this.el);

    this.w = SPR_W * this.scale; this.h = SPR_H * this.scale;
    this.footY = (OY + 16) * this.scale;
    this.x = o.x ?? rand(20, Math.max(40, world.W - this.w - 20));
    this.y = o.y ?? -this.h;
    this.vx = 0; this.vy = 0; this.ground = false; this.dir = 1;
    this.frame = 0; this.nextFrame = 0; this.nextBlink = now() + rand(2000, 5000); this.blinkUntil = 0;
    this.nextTalk = now() + rand(25000, 60000);
    this.nextEmote = now() + rand(6000, 15000);
    this.pokes = []; this.dead = false; this.leaving = false; this.fresh = true;
    this.setTag();
    if (o.migrated) {
      const m = o.migrated;
      this.fresh = false; this.vx = m.vx; this.vy = m.vy; this.dir = m.dir;
      this.sessionId = m.sessionId || null;
      if (m.session) this.session = m.session;
      this.setTag();
      this.do('leap');
      if (m.flying && this.type === 'jet') setTimeout(() => this.startFly({ fuelLeft: m.flying, silent: true }), 0);
    } else this.do('fall');
  }

  // bị hất văng (trúng đạn, thua đánh nhau, bị ném trúng)
  knock(dir, power = 1, after = 'faint') {
    clearTimeout(this._lt);
    this.target = null; this.ground = false; this.dropping = false;
    this.vx = dir * rand(260, 380) * power; this.vy = -rand(480, 620) * power;
    this.afterLand = after;
    this.do('tumble');
  }
  bump() { this.el.classList.remove('bump'); void this.el.offsetWidth; this.el.classList.add('bump'); }

  canTravel() { return !this.owner && !this.leaving && !this.dead && !this.giantUntil && !this.carriedBy; }

  availableDirs() { return ['left', 'right', 'up', 'down'].filter((d) => this.world.travelPlan(d, this)); }

  // chạy tới chỗ thích hợp rồi nhảy sang màn khác (trái/phải/lên/xuống)
  travel(dir) {
    if (!this.canTravel()) return false;
    const plan = this.world.travelPlan(dir, this);
    if (!plan) return false;
    this.walkTo(plan.x, 'run');
    this.onArrive = () => (dir === 'up' ? this.leapUp() : dir === 'down' ? this.dropDown() : this.leap(dir));
    return true;
  }

  leapUp() {
    this.do('windup');
    if (Math.random() < 0.3) this.say(line('leapUp')); else this.emote('⬆️');
    clearTimeout(this._lt);
    this._lt = setTimeout(() => {
      if (this.dead || this.dragging) return;
      this.ground = false; this.vy = -rand(1900, 2050); this.vx = rand(-60, 60);
      this.world.dust(this, 14); this.do('leap');
    }, 700);
  }

  dropDown() {
    this.do('windup');
    if (Math.random() < 0.3) this.say(line('dropDown')); else this.emote('⬇️');
    clearTimeout(this._lt);
    this._lt = setTimeout(() => {
      if (this.dead || this.dragging) return;
      this.ground = false; this.dropping = true; this.vy = -420; this.vx = rand(-40, 40);
      this.world.dust(this, 8); this.do('leap');
    }, 550);
  }

  leap(side) {
    this.dir = side === 'left' ? -1 : 1;
    this.do('windup');
    if (Math.random() < 0.3) this.say(line('leap')); else this.emote(pick(['🚀', '😤', '🦘']));
    clearTimeout(this._lt);
    this._lt = setTimeout(() => {
      if (this.dead || this.dragging) return;
      this.ground = false;
      this.vy = -rand(820, 980);
      this.vx = this.dir * rand(420, 520);
      this.world.dust(this, 10);
      this.do('leap');
    }, 650);
  }

  migrate(to) {
    const flyLeft = this.flying ? Math.max(1500, this.flying.fuelEnd - now()) : 0;
    this.cutRope?.(); this.flying = null;
    const o = this.world.origin;
    this.world.migrate(to, {
      type: this.type, hoodie: [this.pal.H, this.pal.h], name: this.name, label: this.label, scale: this.scale,
      sessionId: this.sessionId || null, session: this.session,
      vx: this.vx, vy: this.vy, dir: this.dir, gx: this.x + o.x, gy: this.y + o.y, flying: flyLeft,
    });
    this.world.onMigrated?.(this);
    this.dead = true; this.el.remove(); this.world.pets.delete(this);
    for (const p of [...this.world.pets]) if (p.owner === this) { p.dead = true; p.el.remove(); this.world.pets.delete(p); }
  }

  floor() { return this.world.H - this.footY - 2; }
  get A() { return ACT[this.action] || ACT.idle; }
  ctx() { return { tool: this.session?.tool, project: this.session?.project || this.label }; }
  busy() { return this.session && SESSION_STATES.includes(this.session.state); }

  do(name, o = {}) {
    if (this.dead) return;
    const a = ACT[name] || ACT.idle;
    this.action = name;
    this.until = o.dur ?? (a.dur ? now() + rand(a.dur[0], a.dur[1]) : Infinity);
    if (o.dur) this.until = now() + o.dur;
    if (!a.walk) this.target = null;
    this.applyClass();
    this.draw();
    const sayP = o.say === undefined ? (a.say || 0) * TALK : o.say * 0.3;
    if (a.lines && Math.random() < sayP) { this.say(line(a.lines, this.ctx())); this.nextTalk = now() + rand(25000, 50000); }
    else if (EMOJI[name] && Math.random() < (EMOTE_P[name] ?? 0.7)) this.emote();
  }

  walkTo(x, actName = 'walk') {
    this.target = Math.max(0, Math.min(this.world.W - this.w, x));
    this.dir = this.target > this.x ? 1 : -1;
    this.do(actName);
  }

  applyClass() {
    const a = this.A;
    this.el.className = 'pet a-' + this.action + (a.anim ? ' an-' + a.anim : '') +
      (this.dir < 0 ? ' left' : '') + (this.owner ? ' helper' : '') + (this.dragging ? ' dragging' : '') + (this.giantUntil ? ' giant' : '') +
      (this.bubbleOn ? ' talking' : '');
  }

  draw() {
    const a = this.A;
    const blinking = now() < this.blinkUntil && (a.eyes === 'tired' || a.eyes === 'wide' || a.eyes === 'side');
    renderSprite(this.ctx2d, this.ch, this.pal, {
      eyes: blinking ? 'closed' : a.eyes, mouth: a.mouth, props: a.props || [], blush: a.blush,
      frame: this.frame, legFrame: (a.walk || this.dragging) && this.frame % 2 === 1,
    });
  }

  emote(e) {
    e = e || pick(EMOJI[this.action] || ['…']);
    const el = this.emoteEl || (this.emoteEl = Object.assign(document.createElement('div'), { className: 'emote' }));
    if (!el.isConnected) this.el.appendChild(el);
    el.textContent = e;
    el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
    this.el.style.zIndex = ++Pet.z;
  }

  say(text, ms) {
    if (!text) return;
    // gắn thêm 1 emoji theo cảm xúc hiện tại nếu câu chưa có
    if (!/\p{Extended_Pictographic}/u.test(text) && EMOJI[this.action] && Math.random() < 0.85) {
      const e = pick(EMOJI[this.action].filter((x) => x.length <= 4) || ['']);
      text = Math.random() < 0.5 ? `${e} ${text}` : `${text} ${e}`;
    }
    this.bubble.textContent = text;
    this.bubbleOn = true; this.el.classList.add('talking');
    this.el.style.zIndex = ++Pet.z;
    clearTimeout(this._bt);
    const d = ms || Math.max(2500, Math.min(6000, 1600 + text.length * 70));
    this._bt = setTimeout(() => { this.bubbleOn = false; this.el.classList.remove('talking'); }, d);
  }

  setTag() {
    const s = this.session;
    let status = '';
    if (s) status = { working: ' · ⌨ ' + (s.tool || 'đang làm'), thinking: ' · 💭', waiting: ' · ✋ chờ duyệt', done: ' · ✓ xong', error: ' · 💥', idle: '' }[s.state] || '';
    if (this.owner) status = ' · subagent';
    this.tagEl.textContent = this.label + status;
    this.el.classList.toggle('has-tag', !!(s || this.owner));
  }

  setSession(s) {
    const prev = this.session?.state;
    const prevTool = this.session?.tool;
    this.session = s;
    this.label = s.project || this.label;
    this.setTag();
    if (this.dragging || !this.ground) return;
    if (s.state !== prev) {
      if (SESSION_STATES.includes(s.state) || s.state === 'done' || s.state === 'error') { this.inEvent = false; this.do(s.state, { say: 0 }); if (Math.random() < 0.15) this.say(line(s.state, this.ctx())); else this.emote(); }
      if (s.state === 'error' || s.state === 'done') onSessionEvent(this, s.state);
      else if (SESSION_STATES.includes(this.action)) this.next();
    } else if (s.state === 'working' && s.tool !== prevTool && Math.random() < 0.25) {
      this.emote(pick(EMOJI.working));
    }
  }

  next() {
    if (this.dead || this.leaving || this.inEvent) return;
    if (this.owner) {
      if (this.owner.dead || this.owner.leaving) return this.leave();
      const tx = this.owner.x + this.offset;
      if (Math.abs(tx - this.x) > 40) return this.walkTo(tx);
      return this.do(this.owner.busy() ? 'working' : weighted({ idle: 3, coffee: 1, shrug: 0.5, sideeye: 0.5, scroll: 1 }));
    }
    if (this.busy()) return this.do(this.session.state);
    if (Math.random() < 0.08) { const dirs = this.availableDirs(); if (dirs.length && this.travel(pick(dirs))) return; }
    let choice = weighted(this.freeTable());
    if (POWER_MOVES[choice] && this[POWER_MOVES[choice]]() !== false) return;
    if (POWER_MOVES[choice]) choice = 'idle';
    if (choice === 'walk') return this.walkTo(rand(0, this.world.W - this.w));
    this.do(choice);
  }

  leave() {
    if (this.leaving) return;
    this.leaving = true;
    if (Math.random() < 0.4) this.say(line('leave')); else this.emote(pick(['👋', '🫡', '🚪']));
    this.target = this.x < this.world.W / 2 ? -this.w - 20 : this.world.W + 20;
    this.dir = this.target > this.x ? 1 : -1;
    this.action = 'leave'; this.until = Infinity; this.applyClass();
  }

  remove() {
    this.cutRope?.();
    this.dead = true;
    this.el.remove();
    this.world.pets.delete(this);
    for (const p of this.world.pets) if (p.owner === this) p.leave();
  }

  poke() {
    const t = now();
    this.pokes = this.pokes.filter((x) => t - x < 3000);
    this.pokes.push(t);
    if (this.giantUntil) { this.emote(pick(['💢', '👊'])); return; }
    if (this.pokes.length >= 5) { this.pokes = []; if (this.type === 'puff') { this.puffUp(); return; } this.do('angry'); return; }
    this.do(pick(['poke', 'poke', 'poke', 'sideeye', 'facepalm', 'shrug']), { say: Math.random() < 0.3 ? 1 : 0 });
    if (!this.bubbleOn) this.emote();
    this.vy = -260; this.ground = false;
  }

  update(t, dt) {
    if (this.dead) return;
    const W = this.world.W;
    if (this.carriedBy && this.updateCarried()) {
      this.el.style.transform = `translate(${Math.round(this.x)}px, ${Math.round(this.y)}px)`;
      if (t >= this.nextFrame) { this.frame++; this.nextFrame = t + 200; this.draw(); }
      return;
    }
    if (this.dragging) {
      // vị trí do chuột điều khiển
    } else if (!this.ground) {
      if (this.rope) this.updateRope(t, dt);
      else if (this.flying) this.updateFly(t, dt);
      else { this.vy += 1800 * dt; this.x += this.vx * dt; this.y += this.vy * dt; }
      if (this.dead) return;
      const wd = this.world, cx = this.x + this.w / 2, cy = this.y + this.footY * 0.6, go = this.canTravel();
      // bay ra khỏi mép trái/phải/trên mà bên đó có màn khác → chuyển sang màn đó
      if (go && this.action !== 'fall' && (cx < 0 || cx > W || (cy < 0 && this.vy < 0))) { const t = wd.findTarget(cx, cy); if (t != null) return this.migrate(t); }
      if (this.x < 0 && !(go && wd.findTarget(-30, cy) != null)) { this.x = 0; this.vx = -this.vx * 0.5; }
      if (this.x > W - this.w && !(go && wd.findTarget(W + 30, cy) != null)) { this.x = W - this.w; this.vx = -this.vx * 0.5; }
      if (!this.flying && this.y < -this.h * 3 && wd.findTarget(cx, -60) == null) this.vy = Math.max(this.vy, 0);
      if (this.flying && this.y < 4 && wd.findTarget(cx, -60) == null) { this.y = 4; this.vy = Math.max(this.vy, 0); }
      const fl = this.floor();
      // rơi xuyên sàn khi đang thả xuống, hoặc bị ném mạnh xuống, và bên dưới có màn
      const below = this.y >= fl && this.vy >= 0 && go && (this.dropping || (this.action === 'dangle' && this.vy > 900)) ? wd.findBelow(cx) : null;
      if (below != null) {
        this.dropping = true;
        if (this.y + this.footY * 0.5 > wd.H) return this.migrate(below);
      } else if (this.y >= fl && this.vy >= 0) {
        this.y = fl; this.dropping = false;
        if (this.rope) this.cutRope();
        if (this.flying && this.vy < 260) { this.stopFly(); this.vy = 0; }
        if (this.vy > 520) { this.vy = -this.vy * 0.35; this.vx *= 0.7; }
        else {
          this.vy = 0; this.vx = 0; this.ground = true;
          const g0 = this.el.querySelector('.grow'); if (g0) g0.style.rotate = '';
          if (this.action === 'leap' && this.type === 'hook' && !this.afterLand) { this.world.dust(this, 10); this.do('land', { say: 0 }); this.emote(pick(['😎', '🤸', '✨'])); }
          else if (this.action === 'leap') { this.world.dust(this, 12); this.do('arrive'); }
          else if (this.action === 'fly' || this.action === 'fuelOut') { this.world.dust(this, 10); if (this.afterLand) { const al = this.afterLand; this.afterLand = null; this.do(al); } else this.do('land', { say: 0 }); }
          else if (this.afterLand) { const al = this.afterLand; this.afterLand = null; this.world.dust(this, 8); this.do(al); }
          else if (this.action === 'fall' || this.action === 'dangle') {
            if (this.fresh) { this.fresh = false; this.do('land', { say: 0 }); if (Math.random() < 0.35) this.say(line(this.owner ? 'helper' : 'spawn')); else this.emote(pick(['👋', '😪', '🫡', '🥱'])); }
            else this.do(Math.random() < 0.25 ? 'pancake' : 'land');
          }
          else if (!this.inEvent && !this.giantUntil && this.until > now() + 100000) this.do('land', { say: 0 });
        }
      }
    } else {
      this.y = this.floor();
      const a = this.A;
      if (a.walk && this.target != null) {
        const dx = this.target - this.x, step = (a.speed || 55) * dt;
        this.dir = dx >= 0 ? 1 : -1;
        if (Math.abs(dx) <= step) {
          this.x = this.target; this.target = null;
          if (this.action === 'leave') { this.remove(); return; }
          this.onArrive?.(); this.onArrive = null;
          this.next();
        } else this.x += Math.sign(dx) * step;
      }
      if (t >= this.until) this.next();
      if (t > this.nextEmote && !this.inEvent && !this.bubbleOn) {
        this.nextEmote = t + rand(9000, 20000);
        if (EMOJI[this.action] && Math.random() < 0.6) this.emote();
      }
      if (a.lines && t > this.nextTalk && !this.bubbleOn && !this.inEvent && Math.random() < 0.2) {
        let key = a.lines;
        if (this.type === 'sage' && (key === 'idle' || key === 'walk')) key = 'wisdom';
        const tl = key === 'idle' && Math.random() < 0.3 ? timeLines() : [];
        this.say(tl.length ? pick(tl) : line(key, this.ctx()));
        this.nextTalk = t + rand(45000, 100000);
      } else if (t > this.nextTalk) this.nextTalk = t + rand(10000, 20000);
    }
    if (t >= this.nextBlink) { this.blinkUntil = t + 160; this.nextBlink = t + rand(2500, 6000); }
    if (t >= this.nextFrame) {
      this.frame++;
      this.nextFrame = t + (this.A.walk ? 160 : this.A.typing ? 140 : 260);
      this.draw();
    }
    const flipNeeded = this.dir < 0;
    if (flipNeeded !== this.el.classList.contains('left')) this.applyClass();
    this.el.style.transform = `translate(${Math.round(this.x)}px, ${Math.round(this.y)}px)`;
  }
}
