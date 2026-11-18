// Pixel sprites 16x16 cho team thỏ doomer. Mỗi ký tự = 1 pixel, '.' = trong suốt.
const CHARS = {
  insomnia: {
    name: 'Thỏ Mất Ngủ',
    pal: { W: '#f4f1ee', p: '#e8aab4', L: '#b9b0bb', P: '#222222', b: '#b9a6b8', d: '#555555', O: '#7a2a30', H: '#3b3f52', h: '#525873' },
    skin: 'W', sclera: 'W', lid: 'L',
    eyes: [[4, 8], [11, 8]], mouth: [7, 11], legRows: [15],
    grid: [
      '....WW....WW....',
      '...WpW....WWWWW.',
      '...WpW....WpW...',
      '...WpW....WpW...',
      '...WWWWWWWWWW...',
      '..WWWWWWWWWWWW..',
      '.WWWWWWWWWWWWWW.',
      '.WWLLWWWWWWLLWW.',
      '.WWWPWWWWWWPWWW.',
      '.WWbbWWWWWWbbWW.',
      '.WWWWWWppWWWWWW.',
      '..WWWWWddWWWWW..',
      '..HHHHHHHHHHHH..',
      '.WHHHhHHHHhHHHW.',
      '..HHHHHHHHHHHH..',
      '...HH......HH...',
    ],
  },
  beanie: {
    name: 'Thỏ Xám Beanie',
    pal: { G: '#9a98a2', p: '#e8aab4', K: '#1c1c22', k: '#3a3a46', L: '#6e6c76', W: '#ffffff', P: '#222222', d: '#4a4850', O: '#7a2a30', H: '#6b2f3a', h: '#84404c' },
    skin: 'G', sclera: 'W', lid: 'L',
    eyes: [[4, 8], [11, 8]], mouth: [7, 10], legRows: [15],
    grid: [
      '...GG......GG...',
      '...GpG....GpG...',
      '...GpG....GpG...',
      '...KKKKKKKKKK...',
      '..KKKKKKKKKKKK..',
      '..kkkkkkkkkkkk..',
      '.GGGGGGGGGGGGGG.',
      '.GGLLLGGGGLLLGG.',
      '.GGWPWGGGGWPWGG.',
      '.GGGGGGppGGGGGG.',
      '..GGGGGddGGGGG..',
      '..HHHHHHHHHHHH..',
      '.HHHhHHHHHHhHHH.',
      '.GHHHHHHHHHHHHG.',
      '..HHHHHHHHHHHH..',
      '...HH......HH...',
    ],
  },
  carrot: {
    name: 'Thỏ Cà Rốt Héo',
    pal: { B: '#9b6b45', p: '#e8aab4', L: '#6e4a30', W: '#ffffff', P: '#222222', d: '#3a2416', O: '#7a2a30', T: '#e6d3b8', H: '#e07b2f', g: '#7d8a5a' },
    skin: 'B', sclera: 'W', lid: 'L',
    eyes: [[5, 6], [11, 6]], mouth: [7, 8], legRows: [14, 15],
    grid: [
      '....BB....BB.....',
      '....BpB..BpB.....',
      '....BpB..BpB.....',
      '....BBBBBBBB.....',
      '...BBBBBBBBBB....',
      '...BLLBBBBLLB....',
      '...BWPBBBBWPB....',
      '...BBBBppBBBB....',
      '....BBBddBBB.....',
      '....TTTTTTTTT.Hg.',
      '...BTTTTTTTTTBHgg',
      '...BTTTTTTTTTH..g',
      '...BTTTTTTTTTH...',
      '....TTTTTTTTT....',
      '....BB.....BB....',
      '...BBB....BBB....',
    ],
  },
  office: {
    name: 'Thỏ Văn Phòng',
    pal: { D: '#3a3640', p: '#c98a9a', L: '#5a5560', W: '#ffffff', P: '#222222', d: '#a9a3b6', O: '#c0453a', S: '#e8e8ee', H: '#c0453a', M: '#c97b4a', K: '#333333' },
    skin: 'D', sclera: 'W', lid: 'L',
    eyes: [[5, 6], [11, 6]], mouth: [7, 8], legRows: [14, 15],
    grid: [
      '....DD....DD....',
      '....DpD..DpD....',
      '....DpD..DpD....',
      '....DDDDDDDD....',
      '...DDDDDDDDDD...',
      '..DDLLDDDDLLDD..',
      '..DDWPDDDDWPDD..',
      '..DDDDDppDDDDD..',
      '...DDDDddDDDD...',
      '..SSSSSHHSSSSS..',
      '.DSSSSSHHSSSSSD.',
      '.DSSSSHHHHSSSSD.',
      '..SSSSSHHSSSSS..',
      '..SSSSSSSSSSSS..',
      '...KK......KK...',
      '...KK......KK...',
    ],
  },
  sage: {
    name: 'Thầy Thỏ Triết Gia',
    pal: { W: '#ece9e2', p: '#e8aab4', G: '#3a3020', P: '#222222', d: '#555555', O: '#7a2a30', B: '#fdfdfd', R: '#5b4a86', K: '#e4c75a', S: '#8b5a3c', L: '#bdb8b0' },
    skin: 'W', sclera: 'W', lid: 'L',
    eyes: [[4, 7], [11, 7]], mouth: [7, 10], legRows: [15],
    grid: [
      '....WW....WW....',
      '....WpW..WpW....',
      '....WpW..WpW....',
      '...WWWWWWWWWW..K',
      '..WWWWWWWWWWWW.S',
      '..GGGGGWWGGGGG.S',
      '.WGWWWGGGGWWWGWS',
      '.WGWPWGWWGWPWGWS',
      '.WGGGGGWWGGGGGWS',
      '.WWWWWWppWWWWWWS',
      '..BBWWWddWWWBB.S',
      '..BBBBBBBBBBBB.S',
      '.RBBBBBBBBBBBBRS',
      '.RRBBBBBBBBBBRRS',
      '..RRRBBBBBBRRR.S',
      '...RR......RR..S',
    ],
  },
  hook: {
    name: 'Thỏ Dây Móc',
    pal: { T: '#e6dccb', p: '#e8aab4', G: '#2b2f38', L: '#5fc4c0', W: '#ffffff', P: '#222222', d: '#5a4a3a', O: '#7a2a30', S: '#1f9e96', N: '#33363f', n: '#4a4e5a', H: '#b9bec8', K: '#bcae96' },
    skin: 'T', sclera: 'W', lid: 'K',
    eyes: [[4, 7], [10, 7]], mouth: [6, 9], legRows: [15],
    grid: [
      '...TT....TT.....',
      '...TpT..TpT.....',
      '...TpT..TpT.....',
      '..TTTTTTTTTT....',
      '..GGGGGGGGGG....',
      '..GLLGGGGLLG....',
      '.TTTTTTTTTTTT...',
      '.TTWPTTTTWPTT...',
      '.TTTTTppTTTTT...',
      '..TTTTddTTTT....',
      '..SSSSSSSSSSSS..',
      '..NNNNNNNNNNSSS.',
      '.TNNNnNNnNNNTSS.',
      '..NNNNNNNNNN..HH',
      '..NNNNNNNNNN..H.',
      '...NN....NN.....',
    ],
  },
  jet: {
    name: 'Thỏ Phản Lực',
    pal: { G: '#a9a7b0', p: '#e8aab4', B: '#6b4a2e', Y: '#e6a93a', W: '#ffffff', P: '#222222', d: '#4a4850', O: '#7a2a30', K: '#7c8059', k: '#646847', M: '#c9ced6', L: '#86848c' },
    skin: 'G', sclera: 'W', lid: 'L',
    eyes: [[4, 6], [10, 6]], mouth: [6, 8], legRows: [14, 15],
    grid: [
      '................',
      '...GG....GG.....',
      '...GpG..GpG.....',
      '..BYYBBBBYYB....',
      '.BBBBBBBBBBBB...',
      '.GGGGGGGGGGGG...',
      '.GGWPGGGGWPGG...',
      '.GGGGGppGGGGG...',
      '..GGGGddGGGG....',
      'MKKKKKKKKKKKKM..',
      'MKKKkKKKKkKKKM..',
      'MKKKKKKKKKKKKM..',
      'MMKKKKKKKKKKMM..',
      '.MKKKKKKKKKKM...',
      '...KK....KK.....',
      '...KK....KK.....',
    ],
  },
  puff: {
    name: 'Thỏ Phình To',
    pal: { Q: '#f0c7a8', p: '#e8aab4', W: '#ffffff', P: '#222222', d: '#6a4a3a', O: '#7a2a30', A: '#8fb8d8', a: '#6f9cc0', L: '#c99d80' },
    skin: 'Q', sclera: 'W', lid: 'L',
    eyes: [[4, 8], [10, 8]], mouth: [6, 10], legRows: [15],
    grid: [
      '................',
      '................',
      '................',
      '...QQ....QQ.....',
      '...QpQ..QpQ.....',
      '...QpQ..QpQ.....',
      '..QQQQQQQQQQ....',
      '.QQQQQQQQQQQQ...',
      '.QQWPQQQQWPQQ...',
      '.QQQQQppQQQQQ...',
      '..QQQQddQQQQ....',
      '..AAAAAAAAAA....',
      '.QAAAaAAaAAAQ...',
      '..AAAAAAAAAA....',
      '..AAAAAAAAAA....',
      '...AA....AA.....',
    ],
  },
};

// Bảng màu khi Thỏ Phình To nổi giận
const PUFF_RAGE = { Q: '#e8673c', p: '#ffb0a0', L: '#b8452a', d: '#5a1a10' };

// Màu hoodie cho đồng đội (ký tự H/h trong grid)
const HOODIES = [
  ['#3b3f52', '#525873'], ['#6b2f3a', '#84404c'], ['#2f4a3f', '#43634f'], ['#4a3b6b', '#5f4f86'],
  ['#5a4a32', '#74603f'], ['#22303f', '#334659'], ['#444444', '#5c5c5c'], ['#7a4b2a', '#956039'],
];

// Canvas logic: 30 x 26 pixel, nhân vật đặt tại (OX, OY)
const SPR_W = 30, SPR_H = 26, OX = 7, OY = 8;

function renderSprite(ctx, ch, pal, st) {
  ctx.clearRect(0, 0, SPR_W, SPR_H);
  const g = ch.grid.map((r) => [...r]);
  const set = (x, y, c) => { if (g[y] && x >= 0) g[y][x] = c; };

  // Chân khi đi/nhảy: tách chân ra 2 bên
  if (st.legFrame) {
    for (const row of ch.legRows) {
      const orig = g[row];
      const nr = orig.map(() => '.');
      orig.forEach((c, x) => { if (c !== '.') { const nx = x < 8 ? x - 1 : x + 1; if (nx >= 0) nr[nx] = c; } });
      g[row] = nr;
    }
  }

  // Mắt
  ch.eyes.forEach(([px, py], i) => {
    for (let dx = -1; dx <= 1; dx++) { set(px + dx, py - 1, ch.skin); set(px + dx, py, ch.sclera); }
    set(px, py, 'P');
    const e = st.eyes;
    if (e === 'tired') for (let dx = -1; dx <= 1; dx++) set(px + dx, py - 1, ch.lid);
    else if (e === 'closed') for (let dx = -1; dx <= 1; dx++) { set(px + dx, py, ch.lid); }
    else if (e === 'wide') for (let dx = -1; dx <= 1; dx++) set(px + dx, py - 1, ch.sclera);
    else if (e === 'angry') { const inner = i === 0 ? 1 : -1; set(px, py - 1, ch.lid); set(px + inner, py - 1, ch.lid); }
    else if (e === 'down') { for (let dx = -1; dx <= 1; dx++) set(px + dx, py - 1, ch.lid); }
    else if (e === 'side') { for (let dx = -1; dx <= 1; dx++) set(px + dx, py - 1, ch.lid); set(px, py, ch.sclera); set(px + 1, py, 'P'); }
    else if (e === 'happy') { for (let dx = -1; dx <= 1; dx++) set(px + dx, py, ch.skin); set(px - 1, py, ch.lid); set(px, py - 1, ch.lid); set(px + 1, py, ch.lid); }
    else if (e === 'cry') { for (let dx = -1; dx <= 1; dx++) set(px + dx, py, ch.lid); set(px, py - 1, ch.lid); }
    else if (e === 'spiral') { set(px - 1, py - 1, 'P'); set(px, py - 1, 'P'); set(px + 1, py, 'P'); set(px - 1, py, ch.sclera); set(px, py, ch.sclera); }
    else if (e === 'dead') {
      for (let dx = -1; dx <= 1; dx++) set(px + dx, py - 1, ch.sclera);
      set(px - 1, py - 1, 'P'); set(px + 1, py - 1, 'P'); set(px, py, 'P'); set(px - 1, py + 1, 'P'); set(px + 1, py + 1, 'P');
      set(px - 1, py, ch.sclera); set(px + 1, py, ch.sclera);
    }
  });

  // Miệng
  const [mx, my] = ch.mouth;
  for (let x = mx - 1; x <= mx + 2; x++) set(x, my, ch.skin);
  set(mx - 1, my - 1, ch.skin); set(mx + 2, my - 1, ch.skin);
  const m = st.mouth;
  if (m === 'flat') { set(mx, my, 'd'); set(mx + 1, my, 'd'); }
  else if (m === 'smile') { set(mx - 1, my - 1, 'd'); set(mx, my, 'd'); set(mx + 1, my, 'd'); set(mx + 2, my - 1, 'd'); }
  else if (m === 'wide') { for (let x = mx - 1; x <= mx + 2; x++) set(x, my, 'd'); }
  else if (m === 'open') { set(mx, my, 'O'); set(mx + 1, my, 'O'); }
  else if (m === 'frown') { set(mx - 1, my, 'd'); set(mx, my - 1, 'd'); set(mx + 1, my - 1, 'd'); set(mx + 2, my, 'd'); }
  else if (m === 'tongue' || m === 'laugh') { set(mx - 1, my, 'd'); set(mx, my, 'O'); set(mx + 1, my, 'O'); set(mx + 2, my, 'd'); }
  else if (m === 'wobble') { set(mx - 1, my, 'd'); set(mx, my - 1, 'd'); set(mx + 1, my, 'd'); set(mx + 2, my - 1, 'd'); }

  // Vẽ thân
  g.forEach((row, y) => row.forEach((c, x) => {
    if (c !== '.' && pal[c]) { ctx.fillStyle = pal[c]; ctx.fillRect(OX + x, OY + y, 1, 1); }
  }));

  // Props (toạ độ theo nhân vật)
  const px = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(OX + x, OY + y, 1, 1); };
  const rect = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(OX + x, OY + y, w, h); };
  const f = st.frame || 0;
  const P = st.props || [];

  if (P.includes('laptop')) {
    rect(4, 11, 8, 4, '#9aa0ad'); rect(3, 15, 10, 1, '#6b7280');
    px(7, 12, '#e8e8ee'); px(8, 12, '#e8e8ee');
    const skin = pal[ch.skin];
    px(3, f % 2 ? 13 : 14, skin); px(12, f % 2 ? 14 : 13, skin);
  }
  if (P.includes('mug')) {
    rect(15, 12, 2, 2, '#c97b4a'); px(17, 12, '#c97b4a'); px(15, 12, '#7a3f1f');
    px(15 + (f % 2), 10, '#cfd3dc'); px(16 - (f % 2), 9, '#cfd3dc');
  }
  if (P.includes('phone')) {
    rect(6, 12, 4, 3, '#222222'); rect(7, 12, 2, 2, f % 3 ? '#7fb3e0' : '#a8d0f0');
  }
  if (P.includes('sign')) {
    rect(17, 2, 1, 12, '#8b5a3c');
    rect(14, -5, 8, 7, '#f4ead0'); rect(14, -5, 8, 1, '#d8c9a2');
    const bob = f % 2;
    rect(17, -4 + bob, 2, 3, '#c0453a'); rect(17, 0 + bob, 2, 1, '#c0453a');
  }
  if (P.includes('cloud')) {
    rect(5, -7, 5, 1, '#8d96a6'); rect(3, -6, 10, 1, '#8d96a6'); rect(1, -5, 14, 1, '#8d96a6'); rect(2, -4, 12, 1, '#6f7888');
    [3, 6, 9, 12].forEach((c, i) => px(c, -3 + ((f + i * 2) % 4), '#6fa8dc'));
  }
  if (P.includes('zzz')) {
    const z = (x, y, c) => { rect(x, y, 3, 1, c); px(x + 1, y + 1, c); rect(x, y + 2, 3, 1, c); };
    const up = f % 4;
    z(13, -2 - up, '#9aa3c0');
    if (up > 1) z(17, -6 - up, '#b8bfd6');
  }
  if (P.includes('qmark')) {
    const y = -7 + (f % 2);
    rect(12, y, 3, 1, '#e4c75a'); px(14, y + 1, '#e4c75a'); px(13, y + 2, '#e4c75a'); px(13, y + 4, '#e4c75a');
  }
  if (P.includes('sweat')) { px(15, 3, '#7fb3e0'); px(15, 4, '#7fb3e0'); px(14, 4, '#a8d0f0'); }
  if (P.includes('confetti')) {
    const cols = ['#e05252', '#e4c75a', '#6fa8dc', '#7fc98a', '#c98ad8'];
    for (let i = 0; i < 9; i++) {
      const sx = (i * 37 + f * 13) % 22 - 3, sy = ((i * 19 + f * 7) % 8) - 8;
      px(sx, sy, cols[(i + f) % cols.length]);
    }
  }
  // Lưỡi lè ra khi trêu
  if (st.mouth === 'tongue') { const [tx, ty] = ch.mouth; px(tx, ty + 1, '#e8828f'); px(tx + 1, ty + 1, '#e8828f'); }
  // Má đỏ (nổi giận / ngại)
  if (st.blush) {
    const [[lx, ly], [rx]] = ch.eyes;
    const c = st.blush === 'rage' ? '#d9474799' : '#e8828f99';
    rect(lx - 2, ly + 2, 2, 1, c); rect(rx + 1, ly + 2, 2, 1, c);
    if (st.blush === 'rage') rect(lx - 1, ly - 3, 1, 2, '#d94747');
  }
  if (P.includes('tears')) {
    ch.eyes.forEach(([ex, ey]) => {
      for (let k = 0; k < 3; k++) px(ex + (k % 2 ? 0 : -1), ey + 1 + ((f + k * 2) % 6), '#6fa8dc');
    });
  }
  if (P.includes('steam')) {
    const c = f % 2 ? '#e8e8ee' : '#cfd3dc';
    rect(-2 - (f % 2), -2 - (f % 3), 2, 2, c); rect(16 + (f % 2), -2 - ((f + 1) % 3), 2, 2, c);
    px(-3, -5 - (f % 2), c); px(18, -5 - ((f + 1) % 2), c);
  }
  if (P.includes('ghost')) {
    // linh hồn rời xác bay lên
    const y = -2 - (f % 6), c = '#ffffffcc';
    rect(5, y - 4, 6, 4, c); rect(6, y - 5, 4, 1, c); px(5, y, c); px(7, y, c); px(9, y, c);
    px(7, y - 3, '#222222'); px(9, y - 3, '#222222');
  }
  if (P.includes('box')) {
    rect(-1, 6, 18, 10, '#c79a5b'); rect(-1, 6, 18, 1, '#a57a40'); rect(-2, 5, 3, 2, '#d8b071'); rect(15, 5, 3, 2, '#d8b071');
    rect(5, 10, 6, 1, '#a57a40');
  }
  if (P.includes('sweatdrop')) { rect(14, 0, 2, 3, '#a8d0f0'); px(15, -1, '#a8d0f0'); px(14, 2, '#ffffff'); }
  if (P.includes('stars')) {
    const c = '#e4c75a';
    [[2, -3], [8, -5], [13, -3]].forEach(([sx, sy], i) => { const o = (f + i) % 3; px(sx + o, sy, c); px(sx + o, sy - 1, '#fff3b0'); });
  }
  if (P.includes('fist')) { rect(16, 9 - (f % 2) * 2, 2, 2, pal[ch.skin]); }
  if (P.includes('hand')) { // facepalm: bàn tay che mắt
    const [[lx, ly], [rx]] = ch.eyes;
    rect(lx - 1, ly - 1, rx - lx + 3, 3, pal[ch.skin]); rect(lx - 1, ly + 1, rx - lx + 3, 1, '#00000033');
  }
  if (P.includes('shrug')) {
    const s = pal[ch.skin], up = f % 2;
    rect(-2, 9 - up, 2, 2, s); rect(16, 9 - up, 2, 2, s); px(-3, 8 - up, s); px(18, 8 - up, s);
  }
  if (P.includes('puddle')) { rect(-1, 15, 18, 1, '#9fb3c8'); rect(1, 14, 14, 1, '#b8c8d8'); }
  if (P.includes('gun')) {
    rect(14, 11, 4, 2, '#e07b2f'); rect(18, 11, 2, 1, '#3a3f4a'); rect(14, 13, 1, 2, '#3a3f4a'); px(16, 12, '#ffd34d');
  }
  if (P.includes('flash')) { rect(20, 10, 2, 3, '#ffd34d'); px(22, 11, '#fff3b0'); px(20, 9, '#fff3b0'); px(20, 13, '#fff3b0'); }
  if (P.includes('sword')) {
    rect(14, 12, 1, 2, '#8b5a3c'); rect(13, 11, 3, 1, '#e4c75a');
    if (P.includes('swing')) { rect(15, 11, 7, 1, '#d8dde6'); rect(15, 12, 6, 1, '#aab3c2'); px(19, 9, '#ffffff88'); px(20, 10, '#ffffff88'); px(21, 13, '#ffffff88'); }
    else { [[15, 10], [16, 9], [17, 8], [18, 7], [19, 6], [20, 5]].forEach(([x, y]) => px(x, y, '#d8dde6')); [[16, 10], [17, 9], [18, 8], [19, 7]].forEach(([x, y]) => px(x, y, '#aab3c2')); }
  }
  if (P.includes('scroll')) { rect(13, 10, 3, 4, '#f4ead0'); px(13, 10, '#c9b48a'); px(15, 13, '#c9b48a'); px(14, 11, '#8a7a5a'); px(14, 12, '#8a7a5a'); }
  if (P.includes('jetflame')) {
    const c1 = f % 2 ? '#ff9a3c' : '#ffd36b', c2 = f % 2 ? '#ffd36b' : '#ff5a3c';
    [0, 13].forEach((x) => { rect(x, 13, 1, 2, c1); px(x, 15 + (f % 2), c2); px(x, 16, f % 3 ? '#ffffff55' : c2); });
  }
  if (P.includes('rope-hand')) { rect(13, 9, 3, 2, '#b9bec8'); }
  if (P.includes('heart')) {
    const c = '#e05252', y = -6 - (f % 2);
    px(12, y, c); px(14, y, c); rect(11, y + 1, 5, 1, c); rect(12, y + 2, 3, 1, c); px(13, y + 3, c);
  }
}
