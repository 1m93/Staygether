<h1 align="center">
<img
		width="250"
		alt="Staygether - Ứng dụng tìm người ở ghép"
		src="https://github.com/1m93/Staygether/blob/master/assets/images/logo.png">
</h1>
<h3 align="center">
	Staygether - Ứng dụng tìm người ở ghép
</h3>

<p align="center">
	<img alt="Apk Download" src="https://github.com/1m93/Staygether/blob/master/assets/images/screenShots/androidLogo.png" width="150">
</p>

<p align="center">
	<img src="https://github.com/1m93/Staygether/blob/master/assets/images/screenShots/HomeScreenShot.png" width="300">
</p>


## Tổng quan

**Staygether** là ứng dụng di động hỗ trợ tìm người ở ghép một cách nhanh chóng và tiện lợi nhất.
Ứng dụng hoạt động với cơ chế "Lướt và thích", người dùng sẽ lướt các thẻ có ghi rõ thông tin cá nhân và yêu cầu - mong muốn về phòng trọ cũng như người ở ghép của người dùng khác. Khi có hai người dùng cùng thích nhau, họ sẽ được kết nối

Ứng dụng được viết bằng React-native, sử dụng framework Expo và cơ sở dữ liệu là Firebase

## Một số ảnh chụp màn hình

<img
		width="210"
		alt="Capture 1"
		src="https://github.com/1m93/Staygether/blob/master/assets/images/screenShots/HomeScreenShot.png">
<img
		width="210"
		alt="Capture 2"
		src="https://github.com/1m93/Staygether/blob/master/assets/images/Loginscreen.png">
<img
		width="210"
		alt="Capture 3"
		src="https://github.com/1m93/Staygether/blob/master/assets/images/Signupscreen.png">
<img
		width="210"
		alt="Capture 4"
		src="https://github.com/1m93/Staygether/blob/master/assets/images/MatchesScreenchot.png">
<img
		width="210"
		alt="Capture 5"
		src="https://github.com/1m93/Staygether/blob/master/assets/images/MessagesScreen.png">
<img
		width="210"
		alt="Capture 6"
		src="https://github.com/1m93/Staygether/blob/master/assets/images/UserScreenShot.png">
<img
		width="210"
		alt="Capture 7"
		src="https://github.com/1m93/Staygether/blob/master/assets/images/ProfileScreenshot.png">
<img
		width="210"
		alt="Capture 8"
		src="https://github.com/1m93/Staygether/blob/master/assets/images/Chatscreen.png">


## Cài đặt và sử dụng

Chắc chắn rằng bạn đã cài đầy đủ các ứng dụng để chạy React-native và Expo


### Chạy project

Clone repository này :

```
git clone https://github.com/1m93/Staygether.git
cd Staygether
```

Cài các packages :

```
npm install
```

Sau khi cài đặt packages thành công :

```bash
npm start
```


## Các tính năng

| Tên            | Mô tả                                                     | 
| -------------- | --------------------------------------------------------- |
| `Đăng nhập/ Đăng ký/ Đăng xuất`        | Tạo tài khoản để sử dụng ứng dụng kèm theo đăng bài về nhu cầu ở ghép.                                        |
| `Bộ lọc`         | Sử dụng bộ lọc theo khu vực, giới tính, độ tuổi,.. để dễ dàng tìm người ở ghép phù hợp.                                           |
| `Quản lý thông tin`  | Quản lý các thông tin cá nhân - mật khẩu, thay đổi và sửa lại bài đăng tìm người ở ghép của mình.                                   |
| `Đóng profile`      | Đóng profile của bản thân khi không còn nhu cầu tìm người ở ghép.                                         |
| `Xem bài đăng`      | Xem các bài đăng tìm người ở ghép của người dùng khác dưới dạng các thẻ xếp chồng lên nhau.             |
| `Yêu thích bài đăng`  | Lướt sang phải để yêu thích bài đăng của người khác, khi hai người cùng thích nhau, họ sẽ được thông báo và có thể chat với nhau. |
| `Bỏ qua bài đăng` | Lướt sang trái để bỏ qua bài đăng tìm người ở ghép của người khác, sau khi bỏ qua sẽ không thấy lại trên bảng tin vào lần sau.          |
| `Xóa quan tâm` | Xóa một người dùng khỏi danh sách quan tâm, đồng thời sẽ xóa toàn bộ cuộc trò chuyện với họ.          |
| `Chat`       | Hai người cùng thích nhau có thể nhắn tin cho nhau, hỗ trợ gửi ảnh. |
| `Thông báo`      | Gửi thông báo đến người dùng khi có người thích và có tin nhắn.  |
| `Quên mật khẩu`      | Đặt lại mật khẩu khi người dungf quên mật khẩu tài khoản của mình.  |


## Thành viên phát triển

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
* Nguyễn Tuấn Linh

* Vũ Quốc trưởng

## Phân chia công việc

| Công việc            | Thành viên thực hiện                                                    | 
| -------------- | --------------------------------------------------------- |
| `Thiết kế UI/UX`        | Nguyễn Tuấn Linh                                        |
| `Thiết kế Database`         | Vũ Quốc Trưởng                                         |
| `Code Front-end`  | Nguyễn Tuấn Linh                                |
| `Code Back-end`      | Vũ Quốc Trưởng                                      |
| `Đăng nhập/ Đăng ký/ Đăng xuất`        | Nguyễn Tuấn Linh, Vũ Quốc Trưởng                                       |
| `Bộ lọc`         | Nguyễn Tuấn Linh                                          |
| `Quản lý thông tin`  | Nguyễn Tuấn Linh                                  |
| `Đóng profile`      | Nguyễn Tuấn Linh                                         |
| `Xem bài đăng`      | Vũ Quốc Trưởng             |
| `Yêu thích bài đăng`  | Vũ Quốc Trưởng |
| `Bỏ qua bài đăng` | Vũ Quốc Trưởng          |
| `Xóa quan tâm` | Nguyễn Tuấn Linh         |
| `Chat`       | Vũ Quốc Trưởng |
| `Thông báo`      | Vũ Quốc Trưởng  |
| `Quên mật khẩu`      | Nguyễn Tuấn Linh |
| `Kiểm thử và sửa lỗi`      | Vũ Quốc Trưởng, Nguyễn Tuấn Linh                                     |

* Nguyễn Tuấn Linh: 50%
* Vũ Quốc Trưởng: 50%

<!-- ALL-CONTRIBUTORS-LIST:END -->
