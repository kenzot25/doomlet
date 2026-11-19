# Doomlet: team thỏ mất ngủ trên desktop

> 🇬🇧 English: [README.md](README.md)

Một bầy thỏ pixel chán đời sống ở đáy màn hình, tự lẩm bẩm (tiếng Việt hoặc tiếng Anh) và chạy theo các phiên Claude Code bạn đang mở.

**Xem thử ngay:** [bản demo chạy trên trình duyệt](https://kenzot25.github.io/doomlet/demo.html) — không cần tải về.

## Cài và chạy

Cần Node.js 18 trở lên.

- Windows: double-click `start-doomlet.cmd`. Lần đầu nó tự cài Electron, sau đó app chạy nền và cửa sổ console tự đóng.
- macOS/Linux: `npm install` rồi `npm start`.

App chỉ sống trên khay hệ thống, không có cửa sổ hay icon trên taskbar. Lần chạy đầu tiên nó tự đăng ký khởi động cùng máy. Muốn tắt thì bỏ tick "Khởi động cùng máy" trong menu khay.

Trong menu khay còn có: **Kích thước nhân vật** (Nhỏ / Vừa / Lớn / Siêu lớn) và **Ngôn ngữ / Language** (Tiếng Việt / English) — đổi lúc nào cũng được.

## Nhiều màn hình

Mỗi màn hình có một lớp trong suốt riêng, nên các màn khác độ phân giải hay mức scale vẫn chạy đúng. App đọc vị trí thật của từng màn (trái, phải, trên, dưới) theo cách bạn sắp xếp trong Windows Display settings.

Thỉnh thoảng thỏ tự đổi màn: nhảy ngang sang màn bên cạnh, nhảy vọt lên màn phía trên, hoặc thả mình rơi xuống màn phía dưới. Có lấy đà, tung bụi, lộn vòng và vệt mờ. Bạn cũng có thể ném thỏ qua mép (ném lên trên hoặc ném mạnh xuống dưới đều được), hoặc chuột phải chọn hướng muốn nhảy. Phía nào không có màn hình thì thỏ đập tường nảy lại. Thỏ đang theo một phiên Claude cũng mang theo phiên đó sang màn mới, còn thỏ subagent thì chạy theo sếp.

Trong menu khay có thêm: "Rải team ra mọi màn hình" và "Cả team chuyển sang màn bên cạnh".

## Cập nhật

- Chép đè file mới vào thư mục app là xong. App tự nạp lại: sửa `renderer/` thì thỏ load lại ngay, sửa `main.js`/`watcher.js` thì app tự khởi động lại.
- Nếu thư mục là git repo: menu khay → "Cập nhật & khởi động lại" sẽ chạy `git pull` + `npm install` rồi khởi động lại.

Biểu tượng con thỏ hiện trên thanh menu (macOS) hoặc khay hệ thống (Windows/Linux). Bấm vào đó để gọi thêm thỏ, gọi cả team, giải tán, bật/tắt theo dõi Claude Code, hoặc thoát.

Muốn xem thử mà chưa cài gì thì mở `demo.html` bằng trình duyệt. Bản demo có nút giả lập một phiên Claude.

## Tương tác

| Thao tác | Kết quả |
|---|---|
| Click vào thỏ | Chọc nó. Chọc 5 lần liên tục là nó nổi điên |
| Kéo thả | Nhấc lên rồi ném đi, có trọng lực và nảy |
| Double-click | Trò hề ngẫu nhiên: lộn vòng, xoay, nhảy, cười lăn lộn, đập đầu bàn phím |
| Chuột phải | Menu đủ 20+ hành động, trêu hoặc ôm đứa gần nhất, gọi hoặc đuổi team |

Chỗ nào không có thỏ thì click xuyên qua xuống app bên dưới như bình thường.

Thỏ còn tự làm đủ trò: thở dài dưới mây mưa, uống cà phê, lướt điện thoại, khóc, nổi điên bốc khói, facepalm, nhún vai, liếc xéo, tan chảy, hồn lìa khỏi xác, trốn vào thùng giấy, ngồi bó gối, ngất, ngủ, vươn vai.

Khi đứng gần nhau, chúng nói chuyện, đập tay, trêu nhau rồi bị rượt, giật ly cà phê của nhau, và ôm đứa đang khóc.

## Nhân vật

- Thỏ Mất Ngủ (leader), Thỏ Xám Beanie, Thỏ Cà Rốt Héo, Thỏ Văn Phòng.
- Thầy Thỏ Triết Gia: đeo kính, râu trắng, chống gậy. Thầy ngồi thiền, uống trà và hay đi tìm người để giảng đời. Đứa bị giảng có thể ngủ gật, facepalm, vỗ tay, bỏ chạy, hoặc cãi lại rồi thành đánh nhau.

## Siêu anh hùng (nhân vật gốc)

- **Thỏ Dây Móc**: ninja khăn xanh, kính bảo hộ. Bắn móc lên mép trên màn hình, các góc màn, mép trên và góc của cửa sổ app khác (VS Code, Chrome…), hoặc vào thỏ khác đang bay, rồi đu như con lắc. Buông dây giữa không trung để bay tiếp, có lúc nối liên tiếp 2–3 dây. Đánh nhau thì đu tới đá văng đối thủ.
- **Thỏ Phản Lực**: mũ phi công, ba lô phản lực. Bay lượn khắp màn, đôi khi bay sang màn khác, có lửa và khói. Hết xăng giữa trời thì rơi bẹp. Đánh nhau thì bay trên đầu đối thủ thả bom bánh mì 🥖.
- **Thỏ Phình To**: bình thường hiền lành. Bị chọc 5 lần hoặc thua trận thì phình to gấp 2.6 lần, đỏ au, bốc khói: dậm chân làm cả team nảy lên, nhấc bổng thỏ khác rồi ném văng đi (có khi sang màn khác). Một lúc sau xì hơi, xấu hổ.
- Menu khay: "Gọi 3 siêu anh hùng". Chuột phải: đu dây, bay, phình to, tung chiêu vào đứa gần nhất.
- Vị trí cửa sổ app khác được đọc bằng một tiến trình PowerShell ẩn (chỉ đọc toạ độ, không đọc nội dung), chỉ trên Windows.

## Drama

- Cãi nhau theo kịch bản (tab hay space, deploy thứ Sáu, ai uống cà phê, review PR…). Cãi xong có thể làm hoà, bỏ đi hoặc lao vào đánh nhau. Đôi khi có đứa (thường là Thầy) vào can.
- Đánh nhau kiểu hoạt hình: đám mây bụi kèm chữ BỐP! BỤP! và tay chân văng ra. Kết quả có thắng, thua, hoà hoặc làm hoà.
- Đấu kiếm: toé lửa KENG!, đứa thua bị đánh văng kiếm.
- Đấu súng đồ chơi: hai đứa đứng đối mặt, có bụi cỏ lăn ngang, đếm "một… hai…" rồi pew. Đứa trúng đạn bị hất văng, nằm thấy sao.
- Mấy đứa rảnh kéo tới hóng: cầm điện thoại quay lại hoặc cổ vũ.
- Ném một con thỏ trúng đứa khác là STRIKE: đứa bị trúng sẽ thù và tìm cách trả đũa sau.
- Session Claude lỗi thì có đứa chạy tới cười cợt. Session xong thì có đứa chạy tới chúc mừng.
- Thoại thay đổi theo giờ trong ngày và thứ trong tuần (sáng sớm, giờ trưa, khuya, thứ Hai, thứ Sáu…).
- Chuột phải vào thỏ để tự gây chuyện: cãi nhau, đánh nhau, đấu kiếm, thách đấu súng, bắn pew pew, gọi Thầy ra giảng đạo.

## Kết nối với Claude Code

Không cần cấu hình gì: app tự đọc transcript ở `~/.claude/projects/` (chỉ đọc file trên máy, không gửi đi đâu).

- Mỗi phiên Claude Code đang hoạt động có 1 con thỏ riêng, gắn tên project.
- Theo trạng thái của phiên: ôm laptop khi Claude chạy tool, hiện dấu ? khi đang nghĩ, giơ biển khi chờ duyệt, tung confetti khi xong, ngất xỉu khi tool lỗi.
- Khi Claude gọi subagent, thỏ con được spawn ra đứng cạnh phụ việc, xong thì tự về.
- Phiên im lặng 10 phút thì thỏ "tan ca" đi ra khỏi màn hình.

Nếu chỉ đọc transcript, trạng thái "chờ duyệt" là đoán: tool chạy quá 25 giây thì coi là đang chờ. Muốn biết chính xác lúc Claude xin quyền thì cài hook:

```bash
npm run install-hooks     # thêm hook vào ~/.claude/settings.json (có backup)
npm run uninstall-hooks   # gỡ ra
```

Hook chỉ ghi một dòng vào `~/.doomlet/events.jsonl`, luôn thoát ngay và không chặn Claude Code. Sau khi cài thì mở lại các phiên Claude Code để áp dụng.

## Tuỳ biến

- `renderer/lines.js`: toàn bộ câu thoại, cứ sửa thoải mái.
- `renderer/sprites.js`: sprite 16×16 vẽ bằng ký tự. Mỗi chữ là một màu trong `pal`, dấu `.` là trong suốt.
- `renderer/pet.js`: danh sách hành động (`ACT`) và tần suất tự làm (`FREE`).

## Góp ngôn ngữ — rất cần bạn giúp!

Hiện thỏ nói được **tiếng Việt** và **tiếng Anh**. Rất mong có thêm ngôn ngữ của bạn. 🐰

Thêm một ngôn ngữ chỉ là dịch một file, không cần build:

1. Mở [`renderer/lines.js`](renderer/lines.js), copy nguyên khối `I18N.vi`.
2. Đổi tên thành mã ngôn ngữ của bạn (vd `I18N.ja`, `I18N.fr`) và đặt `label`.
3. Dịch từng câu — giữ cái humor "dev mất ngủ", giữ nguyên các chỗ `{tool}` / `{project}`.
4. Thêm ngôn ngữ vào menu khay trong [`main.js`](main.js) (submenu **Ngôn ngữ / Language**).
5. Mở PR. 🎉

Không cần dịch sát nghĩa — miễn câu đùa "ăn" trong tiếng của bạn. Dịch thiếu cũng được, phần nào chưa dịch sẽ tự fallback.

## Góp sức

Mọi đóng góp đều hoan nghênh: nhân vật mới, animation, siêu năng lực, fix bug, tối ưu, tài liệu, bản dịch.

- Thấy bug hoặc có ý tưởng? [Mở issue](https://github.com/kenzot25/doomlet/issues).
- Muốn code? Fork, chạy `npm install && npm start`, rồi gửi PR. Giữ thay đổi gọn và pixel art là tự vẽ.
- Không code cũng được: star ⭐, báo lỗi, góp ý đều giúp ích.

## Ghi chú

- macOS: thỏ hiện trên mọi Desktop/Space. App không có icon trên Dock, chỉ có trên thanh menu.
- Linux: cần trình quản lý cửa sổ có hỗ trợ trong suốt (compositor).
- Có log debug ở `doomlet.log` trong thư mục app.
