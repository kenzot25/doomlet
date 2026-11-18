// Câu thoại của team thỏ. {tool} {project} {name} {other} sẽ được thay bằng dữ liệu thật.
const LINES = {
  idle: [
    'ừ.', 'lại một ngày nữa.', 'tui ổn. chắc vậy.', 'deadline chỉ là một khái niệm xã hội.',
    'hôm nay cũng chẳng có gì. như mọi hôm.', 'nghĩ lại thì… thôi khỏi nghĩ.',
    'sống chậm lại. chậm tới mức đứng im luôn.', 'tui không lười. tui đang tiết kiệm pin.',
    'mọi thứ đều ổn. (không ổn)', 'đang chờ thứ Sáu. hôm nay mới thứ Hai.',
    'tui có 47 tab đang mở. tâm hồn cũng vậy.', 'mơ ước lớn nhất: inbox 0.',
    'nếu không ai thấy tui làm thì có tính là tui làm không?', 'tui đang ở chế độ máy bay. tinh thần.',
    'cuộc đời là một cái PR chưa ai review.', 'tui không trì hoãn. tui đang ủ ý tưởng.',
    'hôm qua tui hứa mai làm. hôm nay là mai của hôm qua. ờ.', 'thở ra. hít vào. quên mất bước tiếp theo.',
    'có ai thấy động lực của tui đâu không?', 'tui là thỏ. nhưng không nhanh.',
    'tai tui gập vì nghe quá nhiều yêu cầu thay đổi.', 'quầng thâm này là huy chương.',
    'đang chạy trên 2% pin cảm xúc.', 'tui hứa với bản thân sẽ ngủ sớm. tui nói dối giỏi ghê.',
  ],
  walk: ['đi đâu cũng vậy thôi.', 'đi dạo cho có.', 'bước một bước… thôi đủ rồi.', 'đi tìm ý nghĩa. chưa thấy.',
    'đi cho đủ 10.000 bước. còn 9.990.', 'tui đi tuần tra. không có gì đáng tuần tra.', 'đi lấy nước. rồi quên lấy nước.'],
  sigh: ['haizzz.', 'mưa trong lòng, nắng ngoài trời.', 'cái mây này đi theo tui cả tuần rồi.', 'thở dài lần thứ 47 trong ngày.',
    'tui mang theo mây riêng. tiện ghê.', 'dự báo: buồn rải rác, có lúc buồn to.', 'mây ơi đi chỗ khác đi. nó không nghe.'],
  coffee: ['ly thứ năm. tim đập nhịp 4/4.', 'cà phê là chất lỏng duy nhất hiểu tui.', 'không đường. như cuộc đời.', 'cafein đang chạy. não thì chưa.',
    'máu tui giờ 60% là cà phê.', 'uống để tỉnh. tỉnh để uống tiếp.', 'cà phê nguội rồi. như nhiệt huyết.', 'ly này là ly cuối. (lần thứ 3 nói vậy)'],
  void: ['nhìn vào hư vô… hư vô seen không rep.', '…', 'tui đang suy nghĩ. về không gì cả.', 'nếu một con bug crash mà không ai thấy thì nó có crash không?',
    'mình là ai. mình đang ở sprint nào.', 'nhìn chằm chằm vào màn hình. màn hình nhìn lại.', 'hư vô nói nó cũng mệt.'],
  dance: ['đang nhảy. đừng nhìn.', 'niềm vui bắt buộc.', 'team building tinh thần.', 'đây là điệu nhảy của sự cam chịu.',
    'nhảy cho quên việc. chưa quên.', 'lắc lư theo nhịp quạt tản nhiệt.', 'bài này tên là "build xanh lần đầu".'],
  scroll: ['lướt tin. tin xấu. lướt tiếp.', 'thêm một video nữa thôi. (video thứ 80)', 'thị trường đỏ. code cũng đỏ.', 'ai cũng đang thành công trừ tui.',
    'người ta đi du lịch. tui đi debug.', 'đọc tin "AI thay thế lập trình viên". lướt tiếp.', 'xem người khác nấu ăn. tui ăn mì.'],
  sleep: ['zzz… deadline… zzz', 'zzz… merge conflict… zzz', 'đừng gọi. đang offline tâm hồn.', 'zzz… "chỉ sửa một dòng thôi"… zzz', 'zzz… npm install… zzz'],
  flip: ['lộn một vòng. đời vẫn vậy.', 'ta-da. (không ai vỗ tay)', 'cú lộn của sự tuyệt vọng.', 'thể dục giữa giờ.'],
  cry: ['không sao. tui ổn. (khóc)', 'bug này làm tui khóc 2 lần rồi.', 'nước mắt này là cafein đó.', 'đừng nhìn. tui đang xả RAM.',
    'ai đó nói "việc nhỏ thôi". tui tin.', 'estimate 2 điểm. giờ là tuần thứ ba.', 'khóc xong code tiếp. quy trình chuẩn.'],
  rage: ['AAAAAAAAA.', 'ai push thẳng lên main???', 'BỐC KHÓI RỒI ĐÓ.', 'tui bình tĩnh. TUI RẤT BÌNH TĨNH.',
    'AI SỬA FILE CONFIG CỦA TUI?', 'lại đổi requirement giữa sprint hả???', 'ĐỪNG AI NÓI CHỮ "NHANH THÔI" NỮA.'],
  facepalm: ['trời ơi.', 'lại là cái lỗi thiếu dấu phẩy.', 'tui không muốn biết nữa.', 'ai đặt tên biến là data2_final_v3?',
    'bug do chính tui viết hôm qua. tuyệt.', 'test pass vì không có test.', 'quên lưu file. 40 phút debug.'],
  shrug: ['ai biết.', 'chạy trên máy tui mà.', 'kệ. ¯\\_(ツ)_/¯', 'không phải việc của tui. chắc vậy.', 'nó tự chạy được. tui không đụng.', 'có thể là cache. luôn luôn là cache.'],
  sideeye: ['…hmm.', 'tui thấy hết đó nha.', 'đáng ngờ.', 'commit message "fix" là sao?', 'ai vừa force push?', 'cái PR 3000 dòng đó…'],
  melt: ['tan chảy…', 'tui đang thành chất lỏng.', 'nóng quá. hay tại deadline.', 'đợi tui đông lại đã.', 'CPU 100%. tui cũng vậy.'],
  soul: ['hồn tui đi đâu rồi?', 'tạm biệt thể xác.', 'đi ra ngoài hít thở chút. hồn thôi.', 'xác ở lại họp giùm.', 'linh hồn đã logout.'],
  hide: ['không có ai ở đây.', 'tui là cái thùng.', 'đừng giao việc cho thùng.', 'trốn tạm 5 phút. 5 tiếng.', 'thùng này có wifi không?'],
  corner: ['để tui ngồi đây một chút.', 'góc này hiểu tui.', 'đang sạc lại tâm hồn… 1%', 'không cần an ủi. (cần)', 'góc nhà là bạn thân.'],
  rofl: ['HAHAHAHA.', 'cười để khỏi khóc.', 'cái estimate 2 ngày. HAHA.', 'tui cười tới lệch tai.', 'ai đó nói "sẽ không có bug". HAHAHA.'],
  faint: ['…x_x', 'tui ngất chút.', 'hết pin.', 'gọi tui khi sprint xong.', 'đặt tui nằm đây. đừng hỏi.'],
  headbang: ['đập đầu vào bàn phím = code mới.', 'cộc. cộc. cộc.', 'có thể cách này sẽ fix được.', 'asdfjkl;asdfjkl;', 'thử reset não.'],
  tease: ['lêu lêu.', 'bé ơi bé à.', 'đuổi kịp tui không?', 'code ông có bug kìa.', 'ông commit thiếu file kìa. đùa đó. hay không?', 'nhìn mặt ông kìa.'],
  chase: ['ĐỨNG LẠI.', 'quay lại đây!', 'tui bắt được là biết tay.', 'chạy đi đâu!', 'tui nhớ mặt ông rồi!'],
  hug: ['lại đây.', 'ôm cái. không tính phí.', 'tui cũng buồn. ôm cho đỡ.', 'không sao đâu. bug nào rồi cũng fix được. chắc vậy.'],
  hugged: ['…cảm ơn.', 'ấm ghê.', 'đừng nói ai biết.', 'ok tui đỡ hơn 3%.'],
  highfive: ['đập tay!', 'ê team!', 'xong một việc. đập tay cái.', 'build xanh! đập tay!'],
  steal: ['ly này giờ của tui.', 'cảm ơn vì cà phê.', 'tui cần nó hơn.', 'chia sẻ là quan tâm.'],
  stolen: ['?? cà phê tui đâu.', 'ăn cướp!', 'đó là ly thứ 6 của tui!', 'TRẢ ĐÂY.'],
  spin: ['quaaaay.', 'chóng mặt. vui.', 'đời quay như chong chóng.', 'tui là spinner loading.'],
  stretch: ['vươn vai cái.', 'xương kêu răng rắc.', 'ngồi 8 tiếng rồi đó.', 'lưng tui là của công ty.'],
  pancake: ['bẹp.', 'tui thành bánh rồi.', 'trọng lực thắng.', 'nằm im đây. dễ chịu.'],

  working: [
    'đang code… như thể nó có ý nghĩa.', 'chạy {tool}. cầu trời đừng đỏ.', 'lại {tool}. lại hy vọng.',
    'gõ gõ gõ. đời là chuỗi phím bấm.', 'làm việc cho {project}. {project} có biết không?',
    'tui làm, Claude làm, ai cũng làm. ai được nghỉ?', 'đang chạy {tool}… đừng hỏi bao giờ xong.',
    'Claude gõ nhanh hơn tui. tui chỉ ngồi gật gù.', '{tool} lần này chắc ổn. lần trước cũng nói vậy.',
    'tui đang supervise. nghĩa là ngồi nhìn.', 'tiến độ: đang có tiến độ.', '{project} ơi cố lên. tui cũng cố… ngồi.',
  ],
  thinking: ['để nghĩ đã…', 'suy nghĩ là đau.', 'hmm. hmmmm.', 'đang load não… 3%', 'Claude đang nghĩ. tui thì đang lo.',
    'nghĩ cách làm. hoặc cách trốn.', 'đọc lại yêu cầu lần thứ 4.', 'có 3 cách làm. cả 3 đều tệ.'],
  waiting: ['ê. duyệt đi.', 'tui chờ được. tui giỏi chờ lắm.', 'bấm Yes giùm cái.', 'cần quyền. như mọi thứ trong đời.', 'đang chờ ông… hoặc đang chạy lâu. ai biết.',
    'cầm biển này mỏi tay rồi đó.', 'ông ơi. ông ơiii.', 'Claude xin phép. tui xin nghỉ.'],
  done: ['xong. chắc vậy.', 'chạy được rồi. đáng ngờ.', 'yay. (giọng đều đều)', 'ship đi trước khi tui đổi ý.', '{project} xong việc. tui thì chưa xong đời.',
    'đừng chạy lại. nó sẽ hỏng.', 'xong rồi! ai test chưa? thôi khỏi.'],
  error: ['toang.', 'đỏ lòm. quen rồi.', 'lỗi không phải tại tui. chắc vậy.', 'stack trace dài hơn tuổi thơ tui.', 'lại toang. ngạc nhiên ghê.',
    '{tool} phản bội tui.', 'exit code 1. như điểm thi của tui.'],

  poke: ['đừng.', 'chọc nữa tui báo HR.', '?', 'tui đang bận buồn.', 'có việc gì… hay chọc chơi?', 'ui.', 'tui cảm nhận được sự chọc.',
    'chuột của ông có vấn đề hả?', 'đây là quấy rối nơi công sở.', 'lần thứ hai rồi đó.'],
  angry: ['ĐỦ RỒI.', 'tui sẽ nhớ chuyện này.', 'chọc lần nữa là tui nghỉ việc.', 'tui ghi sổ đen rồi.'],
  dangle: ['thả tui xuống.', 'đây là bắt cóc.', 'ờ. bay. hay quá.', 'tui sợ độ cao. và mọi thứ khác.', 'đây là sa thải bằng tay hả?', 'nhẹ tay. tui là tài sản công ty.'],
  land: ['ui.', 'ít nhất tui đã từng bay.', 'trọng lực cũng ghét tui.', 'hạ cánh. không ai đón.', 'mông tui. ui.'],
  spawn: ['lại phải đi làm.', 'ai gọi tui?', 'có mặt. không vui lắm.', 'tui tới rồi. đừng mong gì nhiều.', 'chấm công. rồi ngủ.'],
  helper: ['tui là subagent. lương bằng không.', 'được giao việc. không được hỏi tại sao.', 'phụ việc tới.', 'sếp ơi em tới.'],
  leave: ['tan ca. bye.', 'session xong. tui về với hư vô.', 'đi đây. đừng nhớ.', 'log out khỏi cuộc đời. tạm thời.'],
  leap: ['qua màn kia chơi.', 'màn này chán rồi.', 'wheeee. (giọng đều đều)', 'màn bên kia chắc cũng vậy thôi.', 'đổi gió cái.'],
  leapUp: ['lên tầng trên chơi.', 'nhảy cao hơn kỳ vọng của sếp.', 'trên đó chắc yên tĩnh hơn.', 'bay lên. như giá cà phê.'],
  dropDown: ['xuống tầng dưới.', 'rơi tự do. như KPI.', 'tạm biệt trên này.', 'nhảy xuống. đừng cản.'],
  arrive: ['tới rồi. cũng vậy.', 'màn này nhiều tab hơn.', 'ai mở Jira ở đây vậy?', 'hạ cánh an toàn. tiếc ghê.', 'màn mới, buồn cũ.'],

  // cãi nhau / đánh nhau
  argueStart: ['ê. nói chuyện chút.', 'tui cần nói chuyện với ông.', 'chuyện hôm qua chưa xong đâu.'],
  mediate: ['thôi thôi hai ông.', 'bình tĩnh. ai cũng sai.', 'cãi nhau tốn RAM lắm.', 'đi uống cà phê đi rồi tính.'],
  fightStart: ['RA ĐÂY.', 'hôm nay một mất một còn.', 'tui nhịn đủ rồi.', 'xắn tay áo hoodie lên.'],
  win: ['ai là thỏ đầu đàn giờ?', 'nhẹ nhàng thôi mà.', 'chuyện nhỏ.', 'GG. dễ.', 'tập gym vì ngày này.'],
  lose: ['…tui để ông thắng đó.', 'tui trượt chân.', 'ván sau.', 'không tính. lag.', 'tui đang bị cảm.'],
  draw: ['hoà. cả hai cùng thua.', 'không ai thắng. như mọi cuộc họp.', 'mệt quá. nghỉ.'],
  makeup: ['thôi làm hoà.', 'cãi chi cho mệt.', 'đi ăn trưa không?', 'tui xin lỗi. một chút.'],
  watch: ['ồ ồ ồ.', 'quay lại đăng nhóm chat.', 'đánh đi đánh đi.', 'tui cược con xám.', 'có bắp rang không?', 'drama giờ trưa.'],
  cheer: ['hay quá!', 'tiếp đi!', 'ối!', 'đỉnh!'],
  strike: ['STRIKE!', 'xin lỗi. không xin lỗi.', 'bowling thỏ.', 'trúng!'],
  knocked: ['AI NÉM ĐÓ?', 'tui đang đứng yên mà!', 'ui da!', 'tai nạn lao động.'],
  revenge: ['nhớ mặt ông rồi đó.', 'tới lượt tui.', 'nợ thì phải trả.'],
  mock: ['lại toang à?', 'hehe đỏ kìa.', 'cần tui giúp không? đùa đó.', 'build đỏ đẹp ghê.'],
  mockReply: ['im.', 'lần sau tới lượt ông.', 'ít nhất tui có làm.', 'đi chỗ khác chơi.'],
  congrats: ['đỉnh vậy!', 'xong rồi hả? thật hả?', 'đi ăn mừng thôi!', 'cho tui ké công với.'],
  scared: ['á! cái gì đó?', 'ai đó?', 'hú hồn.'],
};

// Câu theo giờ trong ngày / ngày trong tuần
function timeLines() {
  const d = new Date(), h = d.getHours(), wd = d.getDay();
  const pool = [];
  if (h >= 0 && h < 5) pool.push('mấy giờ rồi mà còn thức?', 'giờ này chỉ có thỏ với bug thức.', 'đi ngủ đi. tui nói thật.', 'ca đêm không có phụ cấp.');
  if (h >= 5 && h < 9) pool.push('sáng sớm. chưa có cà phê. đừng nói chuyện với tui.', 'buổi sáng là ý tưởng tồi.', 'mới mở mắt đã thấy Slack.');
  if (h >= 11 && h < 13) pool.push('đói. ăn gì giờ.', 'trưa nay ăn cơm tấm không?', 'không ai làm việc lúc 11h59.', 'đói tới mức đọc code thấy mì.');
  if (h >= 13 && h < 15) pool.push('buồn ngủ sau ăn. luật tự nhiên.', 'mắt nhắm mắt mở. đang review code.', 'giấc ngủ trưa bị đánh cắp.');
  if (h >= 17 && h < 19) pool.push('5 giờ chiều rồi. về được chưa.', 'giờ này deploy là liều đó.', 'tan làm! (vẫn ngồi đây)');
  if (h >= 21 && h < 24) pool.push('tối rồi còn code.', 'thêm một commit nữa rồi ngủ. (nói dối)', 'tối nay ngủ sớm. (cười)');
  if (wd === 1) pool.push('thứ Hai. không cần giải thích.', 'thứ Hai lại tới. nó không bao giờ trễ.');
  if (wd === 5) pool.push('thứ Sáu! đừng ai deploy.', 'thứ Sáu rồi. tinh thần đã về nhà.');
  if (wd === 0 || wd === 6) pool.push('cuối tuần mà vẫn mở máy?', 'cuối tuần. sao tui ở đây.');
  return pool;
}

// Cặp hội thoại ngắn khi 2 đứa đứng gần nhau
const CHATS = [
  ['ông ổn không?', 'không. còn ông?'], ['cuối tuần làm gì?', 'nằm.'], ['tui vừa fix được bug.', 'nó sẽ quay lại.'],
  ['họp lúc mấy giờ?', 'họp là gì? tui không biết.'], ['đi ăn không?', 'ăn để làm gì… ừ đi.'], ['code này ai viết vậy?', 'tui. 3 tháng trước.'],
  ['sprint này kịp không?', 'ha.'], ['ông có ước mơ gì không?', 'được ngủ trưa không ai gọi.'], ['nghe nói AI sẽ thay thế mình.', 'mời nó vào làm thay đi.'],
  ['hôm nay trời đẹp ghê.', 'đừng nói vậy. nó nghe thấy là mưa.'], ['ông thích tab hay space?', 'tui thích nghỉ việc.'],
  ['sếp đi ngang kìa.', '*giả vờ gõ phím*'], ['tui mới học Rust.', 'chúc ông sống sót.'], ['ông commit chưa?', 'commit với cái gì? với cuộc đời này hả?'],
  ['có ai thấy cái sạc của tui không?', 'thấy. tui đang dùng.'], ['tui có ý tưởng startup.', 'đừng.'], ['tui giảm được 2 ly cà phê/ngày.', 'còn bao nhiêu?', ],
  ['năm nay tăng lương không?', 'tăng. tăng khối lượng công việc.'], ['test chạy hết chưa?', 'chạy hết. chạy hết đi đâu thì không biết.'],
  ['ông có nghe tiếng gì không?', 'tiếng quạt laptop. nó đang khóc.'], ['ê tối nay ship được không?', 'được. ship đồ ăn.'],
];

// Kịch bản cãi nhau: các câu luân phiên A, B, A, B…; end: kết thúc gợi ý
const ARGUMENTS = [
  { lines: ['tab mới là chân ái.', 'space. 2 space. hết.', 'tab tiết kiệm byte!', 'ổ cứng ông 1TB mà tiếc byte?', 'NGUYÊN TẮC!', 'NGUYÊN TẮC CỦA AI?'], end: 'fight' },
  { lines: ['ai deploy chiều thứ Sáu?', 'tui. có sao không?', 'giờ prod sập rồi đó.', 'nó sập vì nó muốn sập.', 'ông phải trực cuối tuần.', '…tui rút lại câu "có sao không".'], end: 'any' },
  { lines: ['ai uống ly cà phê của tui?', 'ly nào?', 'ly có chữ "ĐỪNG ĐỤNG".', 'tui tưởng đó là lời khuyên.', 'TRẢ CÀ PHÊ ĐÂY.', 'nó ở trong bụng tui rồi.'], end: 'fight' },
  { lines: ['ông review PR của tui chưa?', 'rồi. 87 comment.', '87???', 'tui còn nương tay.', 'ông comment "đổi tên biến" 40 lần!', 'vì ông đặt tên biến là a, b, c.'], end: 'any' },
  { lines: ['dark mode mới là sống.', 'light mode cho mắt sáng.', 'mắt ông sáng hay chói?', 'ít nhất tui thấy được bug.', 'tui thấy bug trong bóng tối. như ninja.', 'ninja gì mà 3 tháng chưa fix xong.'], end: 'fight' },
  { lines: ['ông xoá branch của tui hả?', 'branch nào?', 'feature/final-final-v2.', 'à. tưởng rác.', 'ĐÓ LÀ 2 TUẦN CÔNG SỨC.', 'vậy sao không push?'], end: 'fight' },
  { lines: ['cuộc họp này có thể là một email.', 'email này có thể là một tin nhắn.', 'tin nhắn này có thể là im lặng.', 'đúng. vậy im đi.', 'ông im trước.', '…'], end: 'makeup' },
  { lines: ['tui estimate 3 điểm.', '13 điểm.', '3!', '13! ông chưa đọc spec.', 'spec có 1 dòng mà.', 'chính vì vậy nên 13.'], end: 'any' },
  { lines: ['ai để console.log lên prod?', 'không phải tui.', 'nó in ra "tui đây nè".', '…ok là tui.', 'ông có biết khách thấy hết không?', 'thì khách biết tui đang ở đó. thân thiện mà.'], end: 'makeup' },
  { lines: ['ông ngáy trong lúc họp.', 'tui đang suy nghĩ sâu.', 'suy nghĩ ra tiếng "khò"?', 'đó là âm thanh của trí tuệ.', 'mic ông đang bật.', '…tui đi chỗ khác đây.'], end: 'walk' },
  { lines: ['ông lại đổi config ESLint!', 'tui cải tiến nó.', 'giờ cả repo đỏ lòm!', 'thì giờ mình biết code xấu cỡ nào.', 'ÔNG MUỐN GÌ?', 'tui muốn thế giới có dấu chấm phẩy.'], end: 'fight' },
  { lines: ['ông chiếm hết cái sạc.', 'tui cần nó.', 'pin tui 2%!', 'tinh thần tui 1%. tui cần hơn.', 'sạc đâu sạc tinh thần!', 'ông không hiểu đâu.'], end: 'any' },
];

// ---- Thầy Thỏ Triết Gia ----
Object.assign(LINES, {
  wisdom: [
    'con à, bug không nằm trong code. bug nằm trong lòng.', 'người khôn không sửa bug. người khôn không viết code.',
    'deadline như dòng sông. con không thể bước qua nó hai lần. vì lần đầu đã trễ.',
    'ta từng trẻ như con. rồi ta làm frontend.', 'hạnh phúc là khi build xanh mà không biết vì sao.',
    'muốn đi nhanh hãy đi một mình. muốn đi xa hãy viết test.', 'cái gì đến sẽ đến. trừ tiền thưởng.',
    'đời là một vòng lặp. chỉ là ta chưa tìm ra điều kiện thoát.', 'đừng hỏi code làm được gì cho con. hãy hỏi con đã commit chưa.',
    'người xưa nói: "chạy trên máy ta". người nay nói: "dùng Docker đi".', 'trà nguội rồi. như tình yêu với dự án cũ.',
    'tâm tĩnh thì tab tự đóng.', 'cái tôi lớn nhất của dev là nghĩ code mình không có bug.',
    'mỗi lần con nói "sửa nhanh thôi", một con bug được sinh ra.', 'thiền đi con. thiền không cần merge.',
    'ta đã thấy nhiều framework sinh ra và chết đi. ta vẫn dùng jQuery trong tim.',
    'cuộc đời là refactor. không bao giờ xong, chỉ có tạm dừng.', 'con không lười. con đang tối ưu năng lượng vũ trụ.',
    'đúng hay sai không quan trọng. quan trọng là ai merge trước.', 'nghe ta nói này…', 'trà ngon. đời đắng. cân bằng.',
  ],
  lectureReply: ['dạ.', 'hiểu chết liền.', 'thầy ơi em đi vệ sinh.', 'ừm… dạ… vâng.', 'thầy nói tiếp đi, em đang ngủ.', 'cái này lên được TikTok không thầy?', 'thầy có slide không?'],
  lectureClap: ['hay quá thầy!', 'thấm. thấm thật.', 'em ghi vào note rồi.', 'thầy ơi nhận em làm đệ tử.'],
  lectureFlee: ['em có họp! đi đây!', 'thầy ơi nhà em cháy!', 'em quên tắt bếp!'],
  lectureArgue: ['thầy nói sai rồi.', 'cái đó là lý thuyết thôi thầy.', 'thời thầy khác, thời em khác.'],
  duelStart: ['rút kiếm ra!', 'hôm nay phân thắng bại.', 'kiếm pháp code review!', 'đỡ này!'],
  duelWin: ['kiếm pháp vô địch.', 'mài kiếm 3 năm chỉ để chờ ngày này.', 'thua rồi về luyện thêm.'],
  standoff: ['đất này không đủ chỗ cho hai ta.', 'rút súng đi.', 'đếm tới ba.', 'một… hai…'],
  shot: ['ÁI!', 'trúng rồi!', 'tui chết rồi. (nằm nghỉ chút)', 'đạn xốp mà đau ghê!', 'tui sẽ trở lại.'],
  shooterWin: ['nhanh hơn ông 0.1 giây.', 'pew pew.', 'thổi khói nòng súng.', 'lần sau tập rút súng nhanh hơn.'],
  miss: ['trượt?', 'hết đạn rồi.', 'súng đồ chơi mà. ai ngờ.', 'thôi huề đi.'],
  pew: ['pew pew!', 'ăn đạn!', 'bùm bùm!', 'ĐỨNG LẠI!'],
});

// Bài giảng nhiều câu của Thầy (giảng liền một mạch)
const LECTURES = [
  ['con ngồi xuống đây.', 'ngày xưa ta cũng nghĩ code sạch sẽ cứu thế giới.', 'rồi ta gặp code legacy.', 'giờ ta chỉ mong nó đừng sập lúc ta nghỉ phép.'],
  ['con biết vì sao ta đeo kính không?', 'để nhìn rõ bug.', 'nhưng nhìn rõ quá thì buồn.', 'nên ta tháo kính ra. rồi không đọc được code nữa.'],
  ['có ba loại dev.', 'loại viết test.', 'loại nói sẽ viết test.', 'và loại như con.'],
  ['con có biết tại sao cây tre cong mà không gãy?', 'vì nó không phải deploy thứ Sáu.', 'hãy như cây tre.', 'cong lưng mà làm. đừng gãy.'],
  ['ta đã ngồi thiền 40 năm.', 'ta đã đạt tới cảnh giới không cảm xúc.', 'cho tới khi ai đó gửi ta file "final_final_v7.docx".', 'giờ ta lại phải thiền thêm 40 năm.'],
  ['con muốn hạnh phúc không?', 'đơn giản lắm.', 'tắt thông báo Slack.', 'rồi đổi nghề.'],
  ['con nhìn ly trà này.', 'nó rỗng một nửa hay đầy một nửa?', 'sai. nó là ly của ta. đừng đụng vào.'],
  ['đời người như một pull request.', 'có người approve, có người request changes.', 'có người để đó ba tháng không ai đọc.', 'con là cái thứ ba. ta biết.'],
  ['con trâu đi trước, cái cày theo sau.', 'deadline đi trước, bug theo sau.', 'con hiểu chưa?', 'ta cũng chưa.'],
  ['ta có một bí kíp.', 'khi không biết làm gì…', 'hãy restart.', 'cả máy lẫn cuộc đời.'],
];

const NAMES = ['Mệt', 'Chán', 'Buồn Ngủ', 'Lười', 'Kệ', 'Hết Pin', 'Bỏ Cuộc', 'Thứ Hai', 'Deadline', 'Ừ', 'Quầng Thâm', 'Tăng Ca'];
const SAGE_NAMES = ['Thầy Ngộ', 'Lão Thỏ', 'Thầy Tĩnh'];
