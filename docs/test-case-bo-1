# Test case bộ 1: Điều khiển và xem mô phỏng

Phạm vi: UC9 (Xem mô phỏng) và UC10 (Điều khiển mô phỏng). Chạy trên bài Sắp xếp. Khi có thêm bài Mảng và Tìm kiếm thì chạy lại các test case từ TC1-01 đến TC1-13 trên từng bài.

Cách ghi kết quả: cột "Thực tế" ghi lại những gì thấy được, cột "Đạt" ghi Đạt, Không đạt hoặc Chưa áp dụng (khi chức năng chưa có). Mỗi test case không đạt tạo một GitHub Issue, tiêu đề có mã test case.

## Thông tin lần chạy

| Mục | Ghi |
| --- | --- |
| Người chạy | Bảo Thy|
| Ngày chạy | 19/11/2026|
| Bản được kiểm tra | GitHub Pages (https://bblan19.github.io/demo_web/modules/sap-xep/)|
| Trình duyệt và phiên bản | Google Chrome|
| Độ phân giải màn hình | 1366x768|
| Máy tính hay máy chiếu | Máy tính|

## Các test case

| Mã | Mục đích | Điều kiện ban đầu | Các bước | Kết quả mong đợi | Thực tế | Đạt|
| --- | --- | --- | --- | --- | --- | --- |
| TC1-01 | Vào bài từ trang chủ | Chưa đăng nhập, đang ở trang chủ | Bấm vào bài Sắp xếp | Vào trang bài học sau 1 lần bấm, không bị yêu cầu đăng nhập| Chưa có trang chủ, mở thẳng vào bài Sắp xếp | Chưa áp dụng|
| TC1-02 | Trạng thái lúc mới mở bài | Vừa mở bài | Quan sát | Hiện "Bước 1/N", nút Lùi bị mờ, nút chính ghi "Phát", nút tới và nút làm lại hiện màu đen, tất cả ô màu xám | Như kết quả mong đợi | Đạt|
| TC1-03 | Đi tới 1 bước | Đang ở bước 1 | Bấm Tới | Hiện "Bước 2/N", câu giải thích thay đổi, có một dòng mã giả được tô màu, bảng biến cập nhật | Như kết quả mong đợi| Đạt|
| TC1-04 | Màu ô đang so sánh | Đang ở một bước có so sánh | Quan sát hai ô đang so sánh | Hai ô màu vàng, viền đậm, có mũi tên và tên biến ở dưới | Như kết quả mong đợi | Đạt|
| TC1-05 | Lùi lại đúng trạng thái cũ | Đang ở bước 5 | Bấm Lùi | Về bước 4, hình, mã giả, bảng biến và câu giải thích giống hệt lúc đi tới bước 4 | Như kết quả mong đợi | Đạt|
| TC1-06 | Phát tự động | Đang ở bước 1 | Bấm Phát | Các bước tự chạy, nút đổi thành "Tạm dừng" | Như kết quả mong đợi| Đạt|
| TC1-07 | Tạm dừng | Đang phát | Bấm Tạm dừng | Dừng ngay ở bước đang hiện, không chạy thêm bước nào | Như kết quả mong đợi | Đạt|
| TC1-08 | Chạy đến bước cuối | Đang phát | Chờ đến hết | Tự dừng ở bước cuối, nút ghi "Phát lại", nút Tới bị mờ, tất cả ô màu xanh lá có dấu ✓ | Như kết quả mong đợi | Đạt|
| TC1-09 | Đổi tốc độ khi đang phát | Đang phát ở mức 3 | Kéo thanh tốc độ lên mức 5 rồi về mức 1 | Tốc độ thay đổi ngay, không cần bấm Phát lại | Như kết quả mong đợi| Đạt|
| TC1-10 | Làm lại | Đang ở một bước giữa | Bấm Làm lại | Về bước 1, dãy số vẫn là dãy đang dùng | Như kết quả mong đợi| Đạt|
| TC1-11 | Phím tắt | Không đặt con trỏ trong ô nhập | Lần lượt nhấn Space, mũi tên phải, mũi tên trái, R | Phát/dừng, tới, lùi, làm lại giống như bấm nút | Như kết quả mong đợi | Đạt|
| TC1-12 | Phím tắt không chạy khi đang gõ | Con trỏ đang ở ô nhập dãy số | Nhấn Space, mũi tên trái, mũi tên phải | Chỉ tác động lên ô nhập, mô phỏng không thay đổi | Như kết quả mong đợi | Đạt|
| TC1-13 | Đổi thuật toán | Đang phát sắp xếp nổi bọt | Bấm tab Chọn | Ngừng phát, về bước 1, mã giả và câu hỏi chuyển sang sắp xếp chọn | Như kết quả mong đợi| Đạt|
| TC1-14 | Nhập dãy hợp lệ | Đang ở bài Sắp xếp | Nhập 9, 4, 7 rồi bấm "Dùng dãy này" | Mô phỏng chạy với 3 ô 9, 4, 7, không có thông báo lỗi | Như kết quả mong đợi| Đạt|
| TC1-15 | Nhập dãy không hợp lệ | Đang ở bài Sắp xếp | Lần lượt thử: 5 / 1,2,3,4,5,6,7,8,9,10,11 / a, 3 / 100, 2 | Báo lỗi đúng nội dung (số lượng hoặc khoảng giá trị), mô phỏng giữ dãy cũ | Như kết quả mong đợi| Đạt|
| TC1-16 | Dãy đã sắp xếp sẵn | Đang ở bài Sắp xếp | Nhập 1, 2, 3, 4, chạy đến cuối với Nổi bọt rồi với Chèn | Nổi bọt: 0 lần đổi chỗ. Chèn: 0 lần dịch. Kết quả cuối vẫn đúng | Như kết quả mong đợi| Đạt|
| TC1-17 | Dãy có giá trị trùng | Đang ở bài Sắp xếp | Nhập 3, 1, 3, 1, chạy đến cuối | Kết quả là 1, 1, 3, 3, không mất hoặc thêm giá trị nào | Như kết quả mong đợi| Đạt|
| TC1-18 | Bộ đếm đúng công thức | Dãy có 6 số, sắp xếp nổi bọt | Chạy đến bước cuối | Số phép so sánh bằng 15 (= 6 × 5 / 2). Nếu dãy mặc định đổi sang ví dụ SGK [5, 3, 9, 7, 2] (5 số) thì kết quả đúng là 10 (= 5 × 4 / 2) | Như kết quả mong đợi| Đạt|
| TC1-19 | Thu gọn và mở lại khung | Đang ở bài Sắp xếp | Bấm "Thu gọn" ở khung Mã giả và Bảng biến, sau đó bấm "Mở" | Khung ẩn rồi hiện lại đúng nội dung, mô phỏng không bị ảnh hưởng | Như kết quả mong đợi| Đạt|
| TC1-20 | Vừa màn hình 1366×768 | Cửa sổ 1366×768 | Mở bài và quan sát | Thấy cùng lúc hình, mã giả, câu giải thích và bảng điều khiển, không có thanh cuộn ngang | Như kết quả mong đợi| Đạt |
| TC1-21 | Mất kết nối mạng | Đã mở bài | Tắt Wi-Fi rồi tiếp tục bấm | Mô phỏng vẫn chạy bình thường | Như kết quả mong đợi| Đạt |

## Tổng kết

| Tổng số | Đạt | Không đạt | Chưa áp dụng | Các Issue đã tạo |
| --- | --- | --- | --- | --- |
| 21 | 20 | 0| 1| 0|
