// Câu thoại của team thỏ, theo ngôn ngữ. {tool} {project} {name} {other} sẽ được thay bằng dữ liệu thật.
// Muốn thêm ngôn ngữ? Chép khối `vi` bên dưới, dịch lại từng câu, rồi thêm vào I18N với mã ngôn ngữ mới.
// Want to add a language? Copy the `vi` block below, translate every line, and add it to I18N under a new code.

const I18N = {};

// ---------------------------------------------------------------------------
// Tiếng Việt (bản gốc)
// ---------------------------------------------------------------------------
I18N.vi = {
  label: 'Tiếng Việt',
  LINES: {
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

    // Thầy Thỏ Triết Gia
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

    // Siêu năng lực (từ powers.js)
    swing: ['đu thôi!', 'ai cần thang máy.', 'bám chắc vào…', 'giờ này đi bộ là lạc hậu.'],
    fly: ['cất cánh!', 'tầm nhìn đẹp. đời vẫn xấu.', 'xăng đắt quá.', 'trên này không có Slack.'],
    fuelOut: ['hết xăng!!', 'quên đổ xăng…', 'đáng lẽ phải sạc pin…'],
    puff: ['TUI. ĐANG. RẤT. BÌNH. TĨNH.', 'ĐỪNG CHỌC NỮA!', 'AI. LÀM. VỠ. BUILD?'],
    deflate: ['…xin lỗi. tui hơi quá.', 'xì hơi rồi. ngại ghê.', 'tui không nhớ gì hết.'],
    grabbed: ['THẢ TUI RA!', 'ơ ơ ơ', 'tui nhẹ lắm, đừng ném!'],
    bomb: ['bánh mì giao tận nơi!', 'ăn sáng chưa?', 'bữa sáng từ trên trời!'],
  },
  timeLines() {
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
  },
  CHATS: [
    ['ông ổn không?', 'không. còn ông?'], ['cuối tuần làm gì?', 'nằm.'], ['tui vừa fix được bug.', 'nó sẽ quay lại.'],
    ['họp lúc mấy giờ?', 'họp là gì? tui không biết.'], ['đi ăn không?', 'ăn để làm gì… ừ đi.'], ['code này ai viết vậy?', 'tui. 3 tháng trước.'],
    ['sprint này kịp không?', 'ha.'], ['ông có ước mơ gì không?', 'được ngủ trưa không ai gọi.'], ['nghe nói AI sẽ thay thế mình.', 'mời nó vào làm thay đi.'],
    ['hôm nay trời đẹp ghê.', 'đừng nói vậy. nó nghe thấy là mưa.'], ['ông thích tab hay space?', 'tui thích nghỉ việc.'],
    ['sếp đi ngang kìa.', '*giả vờ gõ phím*'], ['tui mới học Rust.', 'chúc ông sống sót.'], ['ông commit chưa?', 'commit với cái gì? với cuộc đời này hả?'],
    ['có ai thấy cái sạc của tui không?', 'thấy. tui đang dùng.'], ['tui có ý tưởng startup.', 'đừng.'], ['tui giảm được 2 ly cà phê/ngày.', 'còn bao nhiêu?'],
    ['năm nay tăng lương không?', 'tăng. tăng khối lượng công việc.'], ['test chạy hết chưa?', 'chạy hết. chạy hết đi đâu thì không biết.'],
    ['ông có nghe tiếng gì không?', 'tiếng quạt laptop. nó đang khóc.'], ['ê tối nay ship được không?', 'được. ship đồ ăn.'],
  ],
  ARGUMENTS: [
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
  ],
  LECTURES: [
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
  ],
  NAMES: ['Mệt', 'Chán', 'Buồn Ngủ', 'Lười', 'Kệ', 'Hết Pin', 'Bỏ Cuộc', 'Thứ Hai', 'Deadline', 'Ừ', 'Quầng Thâm', 'Tăng Ca'],
  SAGE_NAMES: ['Thầy Ngộ', 'Lão Thỏ', 'Thầy Tĩnh'],
  HERO_NAMES: { hook: ['Móc', 'Đu Dây'], jet: ['Phản Lực', 'Bay Cao'], puff: ['Bánh Bao', 'Phồng'] },
};

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------
I18N.en = {
  label: 'English',
  LINES: {
    idle: [
      'yeah.', 'another day.', "i'm fine. probably.", 'deadlines are a social construct.',
      'nothing happening today. like every day.', 'on second thought… let me not think.',
      'slowing down. slowed down to full stop, actually.', "i'm not lazy. i'm saving battery.",
      'everything is fine. (it is not)', "waiting for friday. it's monday.",
      'i have 47 tabs open. same with my soul.', 'biggest dream: inbox zero.',
      'if no one sees me work, does it count?', "i'm in airplane mode. spiritually.",
      "life is a PR nobody reviewed.", "i'm not procrastinating. i'm marinating the idea.",
      "yesterday i promised to do it tomorrow. today is that tomorrow. huh.", "breathe out. breathe in. forgot the next step.",
      'has anyone seen my motivation?', "i'm a bunny. but not a fast one.",
      'my ears droop from too many change requests.', 'these eyebags are medals.',
      'running on 2% emotional battery.', 'i promised myself an early night. i lie well.',
    ],
    walk: ['same everywhere, really.', 'just a little walk.', 'one step… okay that was enough.', 'looking for meaning. not found yet.',
      '10,000 steps a day. 9,990 to go.', 'patrolling. nothing worth patrolling.', 'going for water. forgot the water.'],
    sigh: ['sigh.', 'raining inside, sunny outside.', "this cloud has followed me all week.", "47th sigh of the day.",
      'i bring my own cloud. convenient.', 'forecast: scattered sadness, heavy at times.', 'cloud, please move. it never listens.'],
    coffee: ['fifth cup. heart in 4/4 time.', 'coffee is the only liquid that understands me.', 'no sugar. like life.', 'caffeine online. brain still booting.',
      "my blood is 60% coffee now.", 'drink to wake up. wake up to drink.', 'coffee went cold. like my passion.', 'this is the last one. (said that 3 times)'],
    void: ['staring into the void… it left me on read.', '…', "i'm thinking. about nothing.", "if a bug crashes and no one sees it, did it crash?",
      'who am i. what sprint is this.', 'staring at the screen. it stares back.', 'the void says it is tired too.'],
    dance: ['dancing. do not look.', 'mandatory fun.', 'spiritual team building.', 'this is the dance of acceptance.',
      'dancing to forget work. still remember.', 'swaying to the cooling fan.', 'this song is called "first green build".'],
    scroll: ['scrolling the news. bad news. keep scrolling.', 'one more video. (video #80)', 'market is red. so is my code.', 'everyone is winning but me.',
      "people travel. i debug.", 'read "AI replaces developers". keep scrolling.', 'watching people cook. i eat instant noodles.'],
    sleep: ['zzz… deadline… zzz', 'zzz… merge conflict… zzz', "don't call. soul is offline.", 'zzz… "just one line"… zzz', 'zzz… npm install… zzz'],
    flip: ['one flip. life is the same.', 'ta-da. (no applause)', 'the flip of despair.', 'midday exercise.'],
    cry: ["it's fine. i'm fine. (crying)", 'this bug made me cry twice.', 'these tears are caffeine.', "don't look. i'm freeing up RAM.",
      'someone said "small task". i believed them.', 'estimated 2 points. it is week three.', 'cry, then code. standard process.'],
    rage: ['AAAAAAAAA.', 'who pushed straight to main???', 'SMOKE IS COMING OUT.', "i'm calm. I AM VERY CALM.",
      'WHO EDITED MY CONFIG FILE?', 'changing requirements mid-sprint again???', 'STOP SAYING "QUICK FIX".'],
    facepalm: ['oh no.', "it's the missing comma again.", "i don't want to know anymore.", 'who named a variable data2_final_v3?',
      'a bug i wrote yesterday. lovely.', 'tests pass because there are no tests.', 'forgot to save. 40 minutes of debugging.'],
    shrug: ['who knows.', 'works on my machine.', 'meh. ¯\\_(ツ)_/¯', 'not my problem. probably.', 'it runs on its own. i did not touch it.', 'could be the cache. always the cache.'],
    sideeye: ['…hmm.', 'i saw that, you know.', 'suspicious.', 'commit message just says "fix"?', 'who just force-pushed?', 'that 3000-line PR…'],
    melt: ['melting…', "i'm turning into liquid.", 'so hot. or maybe the deadline.', 'wait for me to re-solidify.', 'CPU at 100%. me too.'],
    soul: ['where did my soul go?', 'goodbye, body.', 'stepping out for air. just the soul.', 'the body stays for the meeting.', 'soul has logged out.'],
    hide: ['nobody here.', "i'm a box.", "don't assign work to a box.", 'hiding for 5 minutes. 5 hours.', 'does this box have wifi?'],
    corner: ['let me sit here a bit.', 'this corner gets me.', 'recharging my soul… 1%', "i don't need comfort. (i do)", 'the corner is my best friend.'],
    rofl: ['HAHAHAHA.', 'laughing so i do not cry.', 'the 2-day estimate. HAHA.', 'laughing my ears off.', 'someone said "there will be no bugs". HAHAHA.'],
    faint: ['…x_x', 'fainting for a sec.', 'battery dead.', 'wake me when the sprint ends.', 'leave me here. no questions.'],
    headbang: ['head on keyboard = new code.', 'thud. thud. thud.', 'maybe this will fix it.', 'asdfjkl;asdfjkl;', 'trying a brain restart.'],
    tease: ['nyah nyah.', 'hey little one.', 'catch me if you can.', 'your code has a bug.', "you forgot to commit a file. kidding. or am i?", 'look at your face.'],
    chase: ['STOP RIGHT THERE.', 'get back here!', 'if i catch you, you are done.', 'where do you think you are going!', 'i remember your face!'],
    hug: ['come here.', 'free hug. no charge.', "i'm sad too. hug helps.", "it's okay. every bug gets fixed. probably."],
    hugged: ['…thanks.', 'so warm.', "don't tell anyone.", 'okay i feel 3% better.'],
    highfive: ['high five!', 'yo team!', 'one thing done. high five.', 'green build! high five!'],
    steal: ['this cup is mine now.', 'thanks for the coffee.', 'i need it more.', 'sharing is caring.'],
    stolen: ['?? where is my coffee.', 'thief!', 'that was my 6th cup!', 'GIVE IT BACK.'],
    spin: ['spiiiin.', 'dizzy. fun.', 'life spins like a fidget.', "i'm a loading spinner."],
    stretch: ['big stretch.', 'bones going crackle.', "that's 8 hours sitting.", 'my back belongs to the company.'],
    pancake: ['splat.', "i'm a pancake now.", 'gravity wins.', 'lying here. comfy.'],

    working: [
      'coding… as if it means something.', 'running {tool}. please do not go red.', '{tool} again. hope again.',
      'type type type. life is a key sequence.', 'working on {project}. does {project} even know?',
      'i work, Claude works, everyone works. who rests?', 'running {tool}… do not ask when it finishes.',
      'Claude types faster than me. i just nod along.', '{tool} will be fine this time. said that last time.',
      "i'm supervising. means sitting and watching.", 'progress: there is progress.', '{project}, hang in there. i am hanging… in this chair.',
    ],
    thinking: ['let me think…', 'thinking hurts.', 'hmm. hmmmm.', 'loading brain… 3%', 'Claude is thinking. i am worrying.',
      'figuring out how. or how to escape.', 'reading the requirements for the 4th time.', 'three ways to do this. all bad.'],
    waiting: ['hey. approve it.', "i can wait. i'm great at waiting.", 'press Yes please.', 'need permission. like everything in life.', 'waiting on you… or it is just slow. who knows.',
      'my arm hurts holding this sign.', 'hey. heyyy.', 'Claude asks permission. i ask for a break.'],
    done: ['done. probably.', 'it runs. suspicious.', 'yay. (monotone)', 'ship it before i change my mind.', '{project} is done. my life is not.',
      "don't run it again. it will break.", 'done! did anyone test it? nah.'],
    error: ['broken.', 'all red. used to it.', "not my fault. probably.", 'stack trace longer than my childhood.', 'broken again. shocking.',
      '{tool} betrayed me.', 'exit code 1. like my exam scores.'],

    poke: ['stop.', 'poke again and i call HR.', '?', "i'm busy being sad.", 'is there a reason… or just poking?', 'ow.', 'i can feel the poking.',
      'is your mouse okay?', 'this is workplace harassment.', "that's twice now."],
    angry: ['ENOUGH.', 'i will remember this.', 'poke again and i quit.', "you're on my list now."],
    dangle: ['put me down.', 'this is a kidnapping.', 'yeah. flying. great.', 'i fear heights. and everything else.', 'is this layoff by hand?', 'gently. i am company property.'],
    land: ['ow.', 'at least i flew once.', 'gravity hates me too.', 'landed. no welcome party.', 'my butt. ow.'],
    spawn: ['back to work.', 'who summoned me?', 'present. not thrilled.', "i'm here. don't expect much.", 'clock in. then nap.'],
    helper: ["i'm a subagent. salary: zero.", 'given tasks. not allowed to ask why.', 'helper reporting.', 'boss, i am here.'],
    leave: ['shift over. bye.', 'session done. back to the void.', 'leaving. do not miss me.', 'logging out of life. temporarily.'],
    leap: ['off to the other screen.', 'this screen is boring.', 'wheeee. (monotone)', 'the other screen is probably the same.', 'change of scenery.'],
    leapUp: ['up to the screen above.', 'jumping higher than the boss expects.', 'quieter up there, probably.', 'going up. like coffee prices.'],
    dropDown: ['down to the screen below.', 'free fall. like my KPIs.', 'bye-bye up here.', 'jumping down. do not stop me.'],
    arrive: ['arrived. same thing.', 'more tabs on this screen.', 'who left Jira open here?', 'landed safely. shame.', 'new screen, old sadness.'],

    argueStart: ['hey. we need to talk.', 'i need a word with you.', "yesterday's thing is not over."],
    mediate: ['easy, you two.', 'calm down. everyone is wrong.', 'arguing wastes RAM.', 'go get coffee, sort it out later.'],
    fightStart: ['OUTSIDE. NOW.', "it's one or the other today.", "i've had enough.", 'rolling up my hoodie sleeves.'],
    win: ['who is the alpha bunny now?', 'took it easy on you.', 'no big deal.', 'GG. easy.', 'i hit the gym for this day.'],
    lose: ['…i let you win.', 'i slipped.', 'next round.', "doesn't count. lag.", 'i have a cold.'],
    draw: ['draw. both lose.', 'nobody wins. like every meeting.', 'too tired. break.'],
    makeup: ["okay, let's make up.", 'why even fight.', 'lunch?', 'i am sorry. a little.'],
    watch: ['oooooh.', 'posting this in the group chat.', 'fight, fight!', "i bet on the gray one.", 'got popcorn?', 'lunchtime drama.'],
    cheer: ['nice!', 'keep going!', 'oof!', 'epic!'],
    strike: ['STRIKE!', 'sorry. not sorry.', 'bunny bowling.', 'bullseye!'],
    knocked: ['WHO THREW THAT?', 'i was just standing there!', 'ow!', 'workplace injury.'],
    revenge: ['i remember your face.', 'my turn.', 'debts get paid.'],
    mock: ['broke again?', 'heh, all red.', 'need help? kidding.', 'lovely red build.'],
    mockReply: ['quiet.', 'your turn next time.', 'at least i did something.', 'go play elsewhere.'],
    congrats: ['that good?', 'done already? really?', "let's celebrate!", 'let me take some credit too.'],
    scared: ['ah! what was that?', 'who is there?', 'yikes.'],

    // Philosopher Bunny
    wisdom: [
      'child, the bug is not in the code. the bug is in the heart.', 'the wise do not fix bugs. the wise do not write code.',
      'a deadline is like a river. you cannot cross it twice. the first time you were already late.',
      'i was young like you. then i did frontend.', 'happiness is a green build you cannot explain.',
      'go fast, go alone. go far, write tests.', 'what is meant to come will come. except the bonus.',
      'life is a loop. we just have not found the exit condition.', 'ask not what the code can do for you. ask whether you committed.',
      'the old masters said "works on my machine". the new ones say "use Docker".', 'the tea is cold. like love for an old project.',
      'a calm mind closes its own tabs.', "a developer's biggest ego is thinking their code has no bugs.",
      'every time you say "quick fix", a bug is born.', 'meditate, child. meditation needs no merge.',
      'i have seen many frameworks born and die. i still keep jQuery in my heart.',
      'life is a refactor. never finished, only paused.', 'you are not lazy. you are optimizing cosmic energy.',
      'right or wrong does not matter. who merges first matters.', 'listen to me now…', 'tea is sweet. life is bitter. balance.',
    ],
    lectureReply: ['yes master.', 'crystal clear (not).', 'master, i need the restroom.', 'um… yes… sure.', 'go on master, i am asleep.', 'could this go on TikTok, master?', 'got any slides?'],
    lectureClap: ['so wise, master!', 'deep. truly deep.', 'noted it down.', 'master, take me as your student.'],
    lectureFlee: ['i have a meeting! bye!', 'master, my house is on fire!', 'i left the stove on!'],
    lectureArgue: ['master, you are wrong.', "that's just theory, master.", 'your time was different from mine.'],
    duelStart: ['draw your sword!', 'we settle this today.', 'the sword art of code review!', 'parry this!'],
    duelWin: ['my sword art is unmatched.', 'sharpened my blade 3 years for this day.', 'you lost. go train more.'],
    standoff: ['this screen is not big enough for us both.', 'draw.', 'count to three.', 'one… two…'],
    shot: ['OW!', 'got me!', 'i am dead. (resting a bit)', 'foam bullet and it still hurts!', 'i shall return.'],
    shooterWin: ['0.1 seconds faster than you.', 'pew pew.', 'blowing smoke off the barrel.', 'practice your draw next time.'],
    miss: ['missed?', 'out of ammo.', 'it is a toy gun. who knew.', "let's call it a draw."],
    pew: ['pew pew!', 'eat lead!', 'boom boom!', 'FREEZE!'],

    // Superpowers (from powers.js)
    swing: ["let's swing!", 'who needs elevators.', 'hold on tight…', 'walking is so last year.'],
    fly: ['liftoff!', 'nice view. life still ugly.', 'fuel is so expensive.', 'no Slack up here.'],
    fuelOut: ['out of fuel!!', 'forgot to refuel…', 'should have charged up…'],
    puff: ['I. AM. VERY. CALM.', 'STOP POKING ME!', 'WHO. BROKE. THE. BUILD?'],
    deflate: ['…sorry. that was a bit much.', 'deflated. embarrassing.', "i don't remember any of that."],
    grabbed: ['PUT ME DOWN!', 'uh uh uh', "i'm light, don't throw me!"],
    bomb: ['bread delivery!', 'had breakfast yet?', 'breakfast from the sky!'],
  },
  timeLines() {
    const d = new Date(), h = d.getHours(), wd = d.getDay();
    const pool = [];
    if (h >= 0 && h < 5) pool.push("it's this late and you're still up?", 'only bunnies and bugs are awake now.', 'go to sleep. i mean it.', 'night shift. no extra pay.');
    if (h >= 5 && h < 9) pool.push('early morning. no coffee yet. do not talk to me.', 'mornings were a bad idea.', 'eyes open, Slack already pinging.');
    if (h >= 11 && h < 13) pool.push('hungry. what is for lunch.', 'lunch? please?', 'nobody works at 11:59.', 'so hungry the code looks like noodles.');
    if (h >= 13 && h < 15) pool.push('post-lunch sleepy. law of nature.', 'eyes half shut. reviewing code.', 'someone stole my nap.');
    if (h >= 17 && h < 19) pool.push("5pm. can i go home yet.", 'deploying now would be brave.', 'clocking out! (still sitting here)');
    if (h >= 21 && h < 24) pool.push('late and still coding.', 'one more commit then bed. (lie)', 'early night tonight. (laughs)');
    if (wd === 1) pool.push('monday. no further comment.', 'monday again. never late, that one.');
    if (wd === 5) pool.push('friday! nobody deploy.', "it's friday. my spirit already left.");
    if (wd === 0 || wd === 6) pool.push('weekend and the laptop is open?', 'weekend. why am i here.');
    return pool;
  },
  CHATS: [
    ['you okay?', 'no. you?'], ['plans for the weekend?', 'lying down.'], ['i just fixed a bug.', 'it will come back.'],
    ['when is the meeting?', 'a meeting? i know nothing.'], ['wanna grab food?', 'what is the point of eating… fine, let us go.'], ['who wrote this code?', 'me. 3 months ago.'],
    ['will we make the sprint?', 'ha.'], ['any dreams?', 'a nap nobody interrupts.'], ['they say AI will replace us.', 'invite it to do the work then.'],
    ['nice weather today.', 'do not say that. it hears you and rains.'], ['tabs or spaces?', 'i prefer quitting.'],
    ['boss walking by.', '*pretends to type*'], ['i started learning Rust.', 'good luck surviving.'], ['did you commit?', 'commit to what? to this life?'],
    ['anyone seen my charger?', 'yeah. i am using it.'], ['i have a startup idea.', 'do not.'], ['i cut down 2 coffees a day.', 'how many are left?'],
    ['getting a raise this year?', 'yes. a raise in workload.'], ['did all the tests run?', 'they all ran. where to, nobody knows.'],
    ['do you hear something?', 'the laptop fan. it is crying.'], ['can we ship tonight?', 'yes. ship some food.'],
  ],
  ARGUMENTS: [
    { lines: ['tabs are the one true way.', 'spaces. 2 spaces. done.', 'tabs save bytes!', 'your drive is 1TB and you count bytes?', 'PRINCIPLE!', 'WHOSE PRINCIPLE?'], end: 'fight' },
    { lines: ['who deployed on friday afternoon?', 'me. a problem?', 'prod is down now.', 'it went down because it wanted to.', 'you are on call this weekend.', '…i take back "a problem?".'], end: 'any' },
    { lines: ['who drank my coffee?', 'which cup?', 'the one labeled "DO NOT TOUCH".', 'i thought that was advice.', 'GIVE THE COFFEE BACK.', 'it is in my stomach now.'], end: 'fight' },
    { lines: ['did you review my PR?', 'yes. 87 comments.', '87???', 'i went easy on you.', 'you wrote "rename variable" 40 times!', 'because you named them a, b, c.'], end: 'any' },
    { lines: ['dark mode is living.', 'light mode for bright eyes.', 'bright or blinded?', 'at least i can see the bugs.', 'i see bugs in the dark. like a ninja.', 'some ninja, 3 months and not fixed.'], end: 'fight' },
    { lines: ['did you delete my branch?', 'which branch?', 'feature/final-final-v2.', 'oh. thought it was trash.', 'THAT WAS 2 WEEKS OF WORK.', 'then why not push it?'], end: 'fight' },
    { lines: ['this meeting could be an email.', 'this email could be a message.', 'this message could be silence.', 'right. so be silent.', 'you be silent first.', '…'], end: 'makeup' },
    { lines: ['i estimate 3 points.', '13 points.', '3!', '13! you did not read the spec.', 'the spec is one line.', 'exactly why it is 13.'], end: 'any' },
    { lines: ['who left console.log in prod?', 'not me.', 'it prints "hi it is me".', '…okay it is me.', 'customers can see all of it!', 'then they know i am there. friendly.'], end: 'makeup' },
    { lines: ['you snored during the meeting.', 'i was thinking deeply.', 'thinking that goes "zzz"?', 'that is the sound of wisdom.', 'your mic was on.', '…i am leaving.'], end: 'walk' },
    { lines: ['you changed the ESLint config again!', 'i improved it.', 'the whole repo is red now!', 'now we know how bad the code is.', 'WHAT DO YOU WANT?', 'i want a world with semicolons.'], end: 'fight' },
    { lines: ['you hogged the charger.', 'i need it.', 'my battery is 2%!', 'my spirit is 1%. i need it more.', 'you cannot charge a spirit!', 'you would not understand.'], end: 'any' },
  ],
  LECTURES: [
    ['sit down, child.', 'i once thought clean code would save the world.', 'then i met legacy code.', 'now i only hope it does not crash while i am on leave.'],
    ['do you know why i wear glasses?', 'to see the bugs clearly.', 'but seeing too clearly makes me sad.', 'so i take them off. then i cannot read the code.'],
    ['there are three kinds of devs.', 'those who write tests.', 'those who say they will write tests.', 'and those like you.'],
    ['do you know why bamboo bends but does not break?', 'because it does not deploy on friday.', 'be like bamboo.', 'bend your back and work. do not break.'],
    ['i meditated for 40 years.', 'i reached a state of no emotion.', 'until someone sent me "final_final_v7.docx".', 'now i must meditate another 40 years.'],
    ['do you want to be happy?', 'it is simple.', 'turn off Slack notifications.', 'then change careers.'],
    ['look at this cup of tea.', 'half empty or half full?', 'wrong. it is my cup. do not touch it.'],
    ['a life is like a pull request.', 'some approve, some request changes.', 'some sit there three months unread.', 'you are the third kind. i know.'],
    ['the ox walks first, the plow follows.', 'the deadline walks first, the bugs follow.', 'do you understand?', 'neither do i.'],
    ['i have one secret.', 'when you do not know what to do…', 'restart.', 'the machine and your life.'],
  ],
  NAMES: ['Tired', 'Bored', 'Sleepy', 'Lazy', 'Meh', 'No Battery', 'Given Up', 'Monday', 'Deadline', 'Sure', 'Eyebags', 'Overtime'],
  SAGE_NAMES: ['Master Oops', 'Old Bun', 'Master Zen'],
  HERO_NAMES: { hook: ['Hook', 'Swing'], jet: ['Jet', 'Sky High'], puff: ['Dumpling', 'Puff'] },
};

// ---------------------------------------------------------------------------
// Ngôn ngữ đang dùng — các biến dưới được code khác đọc trực tiếp.
// applyLang() đổi cả bộ khi người dùng chuyển ngôn ngữ trong menu khay.
// ---------------------------------------------------------------------------
let LANG = 'vi';
let LINES, CHATS, ARGUMENTS, LECTURES, NAMES, SAGE_NAMES, HERO_NAMES, timeLines;

function applyLang(lang) {
  LANG = I18N[lang] ? lang : 'vi';
  const p = I18N[LANG];
  LINES = p.LINES; CHATS = p.CHATS; ARGUMENTS = p.ARGUMENTS; LECTURES = p.LECTURES;
  NAMES = p.NAMES; SAGE_NAMES = p.SAGE_NAMES; HERO_NAMES = p.HERO_NAMES;
  timeLines = p.timeLines;
}
applyLang(LANG);
