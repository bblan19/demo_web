# Sửa nội dung 3 bài theo SGK

## Phạm vi chỉnh sửa

Phạm vi nội dung từ bài 17 đến 22, ở phần này tiến hành sửa 3 bài 17, 19, 21 vì các bài 18, 20, 22 là bài thực hành nên sẽ được điều chỉnh sau.

| Module | Bài | Trang |
| :--- | :--- | :--- |
| Mảng | 17 | 81-85 |
| Tìm kiếm | 19 | 89-93 |
| Sắp xếp | 21 | 99-103 |

---

## Đối chiếu và điều chỉnh

### Điều chỉnh trong `data/modules`

#### 1.1. Module Mảng - `mang.json`

<table>
  <thead>
    <tr>
      <th>Nội dung</th>
      <th>Ban đầu (nội dung + mã giả)</th>
      <th>Sau điều chỉnh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Giới thiệu mảng</td>
      <td>Mô tả mảng và duyệt phần tử theo chỉ số</td>
      <td>Sửa theo SGK về định nghĩa mảng một chiều (tr.82) và mảng hai chiều (tr.83)</td>
    </tr>
    <tr>
      <td rowspan="2">Tính tổng mảng một chiều</td>
      <td>Dùng mã giả s ← 0, duyệt bằng chỉ số i</td>
      <td>Chuyển sang Python theo SGK: total = 0, for mark in marks.</td>
    </tr>
    <tr>
      <td><pre>s ← 0
for i ← 0 đến n−1:
  s ← s + A[i]
kết thúc: s là tổng các phần tử</pre></td>
      <td><pre>total = 0
for mark in marks:
    total = total + mark
print(total / len(marks))</pre></td>
    </tr>
    <tr>
      <td rowspan="2">Tìm giá trị lớn nhất</td>
      <td>Dùng mã giả, biến m, duyệt từ chỉ số 1.</td>
      <td>Chuyển sang Python, dùng Max = marks[0] và duyệt trực tiếp từng phần tử.</td>
    </tr>
    <tr>
      <td><pre>m ← A[0]
for i ← 1 đến n−1:
  nếu A[i] &gt; m: m ← A[i]
kết thúc: m là giá trị lớn nhất</pre></td>
      <td><pre>Max = marks[0]
for mark in marks:
    if Max &lt; mark:
        Max = mark</pre></td>
    </tr>
    <tr>
      <td rowspan="2">Tìm giá trị nhỏ nhất</td>
      <td>Dùng mã giả, biến m.</td>
      <td>Chuyển sang Python, dùng Min = marks[0] và duyệt trực tiếp từng phần tử.</td>
    </tr>
    <tr>
      <td><pre>m ← A[0]
for i ← 1 đến n−1:
  nếu A[i] &lt; m: m ← A[i]
kết thúc: m là giá trị nhỏ nhất</pre></td>
      <td><pre>Min = marks[0]
for mark in marks:
    if Min &gt; mark:
        Min = mark</pre></td>
    </tr>
    <tr>
      <td rowspan="2">Đếm phần tử lớn hơn k</td>
      <td>Có sẵn mã giả hoàn chỉnh.</td>
      <td>- Bỏ mã giả<br>- Đổi tên nội dung thành “Bài tập: đếm số phần tử lớn hơn k”<br>- Chuyển trạng thái thành bai-tap-tu-thuc-hien<br>- Bổ sung ghi chú: Bài 17, Luyện tập 1, trang 85, SGK không cung cấp lời giải.</td>
    </tr>
    <tr>
      <td><pre>d ← 0
for i ← 0 đến n−1:
  nếu A[i] &gt; k: d ← d + 1
kết thúc: d là số phần tử lớn hơn k</pre></td>
      <td>Giữ nguyên</td>
    </tr>
    <tr>
      <td rowspan="2">Tổng mảng hai chiều</td>
      <td>Tính tổng toàn bộ ma trận bằng một biến s</td>
      <td>Thay bằng tính tổng từng hàng; khởi tạo lại total = 0 ở mỗi hàng theo qldiem_ca_lop.py, trang 87.</td>
    </tr>
    <tr>
      <td><pre>s ← 0
for i ← 0 đến m−1:
  for j ← 0 đến n−1:
    s ← s + B[i][j]
kết thúc: s là tổng các phần tử</pre></td>
      <td><pre>for i in range(n):
    total = 0
    for j in range(len(marks_all[i])):
        total = total + marks_all[i][j]</pre></td>
    </tr>
    <tr>
      <td rowspan="2">Duyệt và in ma trận</td>
      <td>Chưa có thuật toán riêng</td>
      <td>Bổ sung thuật toán Python với hai vòng for lồng nhau theo Bài 17, trang 84.</td>
    </tr>
    <tr>
      <td>Không có</td>
      <td><pre>for i in range(3):
    for j in range(3):
        print(A[i][j], end=' ')
    print()</pre></td>
    </tr>
    <tr>
      <td rowspan="2">Trung bình từng hàng</td>
      <td>Chưa có thuật toán riêng</td>
      <td>Bổ sung thao tác tính trung bình từng hàng và xác định hàng có trung bình lớn nhất, sử dụng max_avg và index_max_avg theo Bài 18, trang 87-88.</td>
    </tr>
    <tr>
      <td>Không có</td>
      <td><pre>avg = total / len(marks_all[i])
if max_avg &lt; avg:
    max_avg = avg
    index_max_avg = i</pre></td>
    </tr>
  </tbody>
</table>

---
#### 1.2. Module Tìm kiếm - tim-kiem.json

<table>
  <thead>
    <tr>
      <th>Nội dung</th>
      <th>Ban đầu (nội dung + mã giả)</th>
      <th>Sau điều chỉnh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Giới thiệu tìm kiếm</td>
      <td>Mô tả chung về việc tìm giá trị trong mảng</td>
      <td>Viết lại, phân biệt tìm kiếm tuần tự và tìm kiếm nhị phân theo cách SGK trình bày.<br>Theo SGK trang 91, 93<br>- Tìm kiếm tuần tự được thực hiện bằng cách duyệt lần lượt các phần tử của dãy từ đầu đến cuối để tìm phần tử có giá trị bằng giá trị cần tìm.<br>- Tìm kiếm nhị phân được áp dụng cho các dãy được sắp xếp theo thứ tự xác định. Sau mỗi bước lặp của thuật toán phạm vi tìm kiếm được thu hẹp dần.</td>
    </tr>
    <tr>
      <td rowspan="2">Tìm kiếm tuần tự</td>
      <td>Viết bằng mã giả</td>
      <td>Chuyển sang mã Python LinearSearch(A, K) theo SGK.</td>
    </tr>
    <tr>
      <td><pre>for i ← 0 đến n−1:
  nếu A[i] = k: trả về i
trả về −1  (không tìm thấy)</pre></td>
      <td><pre>def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K:
            return i
    return -1</pre></td>
    </tr>
    <tr>
      <td rowspan="2">Tìm kiếm nhị phân</td>
      <td>Viết bằng mã giả</td>
      <td>Chuyển sang mã Python BinarySearch(A, K) theo SGK.</td>
    </tr>
    <tr>
      <td><pre>left ← 0; right ← n−1
while left ≤ right:
  mid ← (left + right) // 2
  nếu A[mid] = k: trả về mid
  nếu A[mid] &lt; k: left ← mid + 1
  ngược lại: right ← mid − 1
trả về −1 (không tìm thấy)</pre></td>
      <td><pre>def BinarySearch(A, K):
    left = 0
    right = len(A) - 1
    while left &lt;= right:
        mid = (left + right) // 2
        if A[mid] == K:
            return mid
        elif A[mid] &lt; K:
            left = mid + 1
        else:
            right = mid - 1
    return -1</pre></td>
    </tr>
    <tr>
      <td>Điều kiện tìm kiếm nhị phân</td>
      <td>Chỉ ghi mảng phải được sắp xếp</td>
      <td>Bổ sung thông tin có thể áp dụng với dãy tăng dần hoặc giảm dần như sau:<br>“Khi viết mã cụ thể, điều kiện cập nhật biên left và right phụ thuộc vào chiều sắp xếp của dãy:<br>- Với dãy tăng dần (như hàm BinarySearch(A, K)): nếu A[mid] &lt; K thì dịch biên trái left = mid + 1, ngược lại dịch biên phải right = mid - 1.<br>- Với dãy giảm dần: chiều so sánh sẽ đảo ngược tương ứng (nếu A[mid] &gt; K thì dịch left = mid + 1, ngược lại dịch right = mid - 1)”</td>
    </tr>
    <tr>
      <td>Độ phức tạp tìm kiếm tuần tự</td>
      <td>Có ghi O(n)</td>
      <td>Bỏ khỏi module vì nội dung này thuộc Bài 25, trang 115, không thuộc Bài 19-20.</td>
    </tr>
    <tr>
      <td>Độ phức tạp tìm kiếm nhị phân</td>
      <td>Có ghi O(log n)</td>
      <td>Bỏ vì SGK không tính độ phức tạp tìm kiếm nhị phân ở Bài 19-20.</td>
    </tr>
    <tr>
      <td>Ghi chú mã mô phỏng</td>
      <td>Chưa phân biệt điều kiện áp dụng</td>
      <td>Bổ sung lưu ý mã Python mô phỏng hiện tại áp dụng cho dãy tăng dần; SGK có đề cập cả dãy giảm dần.</td>
    </tr>
  </tbody>
</table>

#### 1.3. Module Sắp xếp - sapxep.json

<table>
  <thead>
    <tr>
      <th>Nội dung</th>
      <th>Ban đầu (nội dung+mã giả)</th>
      <th>Đã điều chỉnh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Giới thiệu</td>
      <td>Mô tả chung về sắp xếp tăng dần</td>
      <td>Nêu rõ ba thuật toán SGK trình bày: sắp xếp chèn, sắp xếp chọn, sắp xếp nổi bọt.<br>Theo SGK,<br>- Sắp xếp chèn: thực hiện vòng lặp duyệt từ phần tử thứ hai đến cuối dãy. Sau mỗi bước lặp phần tử tương ứng sẽ được chèn vào vị trí đúng của dãy con đã sắp xếp là các phần tử phía trước vị trí đang duyệt. (tr.100)<br>- Sắp xếp chọn: thực hiện một vòng lặp với chỉ số i chạy từ 0 (phần tử đầu tiên) đến n-2 (phần tử gần cuối). Tại mỗi bước lặp, chọn phần tử nhỏ nhất nằm trong dãy A[i], A[i+1],...A[n-1] và đổi chỗ phần tử này với A[i] (tr.102)<br>- Sắp xếp nổi bọt: thực hiện nhiều vòng lặp, kiểm tra hai phần tử cạnh nhau, nếu chúng chưa sắp xếp đúng thì đổi chỗ. Có nhiều cách thể hiện thuật toán này, nhưng cách thường dùng là sử dụng hai vòng lặp lòng nhau, vòng lặp trong thực hiện thao tác đổi chỗ hai phần tử cạnh nhau cho đến khi dãy được sắp xếp xong. (tr.103)</td>
    </tr>
    <tr>
      <td rowspan="2">Sắp xếp nổi bọt</td>
      <td>Có mã giả</td>
      <td>Giữ nguyên mã giả; bổ sung ghi chú đối chiếu với BubbleSort(A) trong SGK.</td>
    </tr>
    <tr>
      <td><pre>for i ← 0 đến n−2:
  for j ← 0 đến n−2−i:
    nếu A[j] &gt; A[j+1]:
      đổi chỗ A[j] và A[j+1]
kết thúc</pre></td>
      <td>Giữ nguyên</td>
    </tr>
    <tr>
      <td rowspan="2">Sắp xếp chọn</td>
      <td>Sử dụng biến m để lưu vị trí phần tử nhỏ nhất</td>
      <td>Đổi m thành iMin, thống nhất với mã Python SelectionSort(A) trong SGK.</td>
    </tr>
    <tr>
      <td><pre>for i ← 0 đến n−2:
  m ← i
  for j ← i+1 đến n−1:
    nếu A[j] &lt; A[m]: m ← j
  đổi chỗ A[i] và A[m]
kết thúc</pre></td>
      <td><pre>for i ← 0 đến n−2:
  iMin ← i
  for j ← i+1 đến n−1:
    nếu A[j] &lt; A[iMin]: iMin ← j
  đổi chỗ A[i] và A[iMin]
kết thúc</pre></td>
    </tr>
    <tr>
      <td rowspan="2">Sắp xếp chèn</td>
      <td>Sử dụng biến x để lưu phần tử cần chèn</td>
      <td>Đổi x thành value, thống nhất với mã Python InsertionSort(A) trong SGK.</td>
    </tr>
    <tr>
      <td><pre>for i ← 1 đến n−1:
  x ← A[i]; j ← i−1
  while j ≥ 0 và A[j] &gt; x:
    A[j+1] ← A[j]; j ← j−1
  A[j+1] ← x
kết thúc</pre></td>
      <td><pre>for i ← 1 đến n−1:
  value ← A[i]; j ← i−1
  while j ≥ 0 và A[j] &gt; value:
    A[j+1] ← A[j]; j ← j−1
  A[j+1] ← value
kết thúc</pre></td>
    </tr>
    <tr>
      <td>Độ phức tạp</td>
      <td>Có các mô tả O(n²) và trường hợp xấu nhất</td>
      <td>Loại bỏ các thông tin độ phức tạp khỏi module vì Bài 21-22 chưa trình bày nội dung này.</td>
    </tr>
  </tbody>
</table>

### Điều chỉnh trong data/quiz/

#### 2.1. Quiz Mảng - mang.json

<table>
  <thead>
    <tr>
      <th>Mã câu hỏi</th>
      <th>Nội dung ban đầu</th>
      <th>Nội dung sau điều chỉnh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">mang-04</td>
      <td>Hỏi vị trí B[1][2] trong mảng hai chiều có 3 hàng, 4 cột.</td>
      <td>Viết lại thành: “Với mảng hai chiều B, phần tử B[1][2] nằm ở hàng và cột nào (chỉ số bắt đầu từ 0)?”</td>
    </tr>
    <tr>
      <td><pre>{
  "id": "mang-04", "algorithm": "tong-hai-chieu", "level": "thong-hieu",
  "question": "Mảng hai chiều B có 3 hàng, 4 cột. Phần tử B[1][2] nằm ở đâu?",
  "options": ["Hàng thứ 2, cột thứ 3 (đếm từ 1)", "Hàng thứ 1, cột thứ 2 (đếm từ 1)", "Hàng thứ 3, cột thứ 2 (đếm từ 1)"],
  "answer": 0,
  "explain": "Chỉ số hàng viết trước, chỉ số cột viết sau, đều bắt đầu từ 0. B[1][2] là hàng chỉ số 1 (hàng thứ 2) và cột chỉ số 2 (cột thứ 3)."
}</pre></td>
      <td><pre>{
  "id": "mang-04",
  "algorithm": "tong-hai-chieu",
  "level": "thong-hieu",
  "question": "Với mảng hai chiều B, phần tử B[1][2] nằm ở hàng và cột nào (chỉ số bắt đầu từ 0)?",
  "options": [
    "Hàng thứ 2, cột thứ 3 (đếm từ 1)",
    "Hàng thứ 1, cột thứ 2 (đếm từ 1)",
    "Hàng thứ 3, cột thứ 2 (đếm từ 1)"
  ],
  "answer": 0,
  "explain": "Chỉ số hàng viết trước, chỉ số cột viết sau, đều bắt đầu từ 0. B[1][2] có chỉ số hàng là 1 (hàng thứ 2) và chỉ số cột là 2 (cột thứ 3)."
}</pre></td>
    </tr>
  </tbody>
</table>

#### 2.2. Quiz Sắp xếp - sapxep.json

<table>
  <thead>
    <tr>
      <th>Mã câu hỏi</th>
      <th>Nội dung ban đầu</th>
      <th>Nội dung sau điều chỉnh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">sap-xep-04</td>
      <td>Hỏi biến m trong sắp xếp chọn có chức năng gì.</td>
      <td>Đổi thành hỏi biến iMin có chức năng gì.</td>
    </tr>
    <tr>
      <td><pre>{
  "id": "sap-xep-04", "algorithm": "selection", "level": "nhan-biet",
  "question": "Trong sắp xếp chọn, biến m dùng để làm gì?",
  "options": ["Đếm số lần đổi chỗ", "Lưu chỉ số của phần tử nhỏ nhất tìm được", "Lưu giá trị lớn nhất"],
  "answer": 1,
  "explain": "m giữ vị trí phần tử nhỏ nhất trong đoạn chưa sắp; cuối lượt mới đổi chỗ A[i] với A[m]."
}</pre></td>
      <td><pre>{
  "id": "sap-xep-04",
  "algorithm": "selection",
  "level": "nhan-biet",
  "question": "Trong thuật toán sắp xếp chọn (SelectionSort), biến iMin có chức năng gì?",
  "options": [
    "Lưu chỉ số của phần tử nhỏ nhất trong đoạn chưa được sắp xếp",
    "Đếm số lần đổi chỗ giữa hai phần tử",
    "Lưu giá trị lớn nhất của toàn bộ mảng"
  ],
  "answer": 0,
  "explain": "Trong thuật toán sắp xếp chọn, biến iMin lưu chỉ số của phần tử có giá trị nhỏ nhất trong phần dãy chưa được sắp xếp để đổi chỗ với phần tử ở vị trí hiện tại."
}</pre></td>
    </tr>
    <tr>
      <td rowspan="2">sap-xep-05</td>
      <td>Phần giải thích sử dụng điều kiện m = i.</td>
      <td>Đổi thành iMin = i.</td>
    </tr>
    <tr>
      <td><pre>{
  "id": "sap-xep-05", "algorithm": "selection", "level": "thong-hieu",
  "question": "Mỗi lượt của sắp xếp chọn có tối đa bao nhiêu lần đổi chỗ?",
  "options": ["0", "1", "n - 1"],
  "answer": 1,
  "explain": "Chỉ đổi chỗ một lần ở cuối mỗi lượt, hoặc không cần nếu m = i."
}</pre></td>
      <td><pre>{
  "id": "sap-xep-05",
  "algorithm": "selection",
  "level": "thong-hieu",
  "question": "Mỗi lượt của sắp xếp chọn có tối đa bao nhiêu lần đổi chỗ?",
  "options": ["0", "1", "n - 1"],
  "answer": 1,
  "explain": "Chỉ đổi chỗ một lần ở cuối mỗi lượt, hoặc không cần nếu iMin = i."
}</pre></td>
    </tr>
    <tr>
      <td rowspan="2">sap-xep-07</td>
      <td>Hỏi biến x trong sắp xếp chèn lưu giữ gì.</td>
      <td>Đổi thành biến value, đồng thời làm rõ đây là giá trị A[i] đang được chèn.</td>
    </tr>
    <tr>
      <td><pre>{
  "id": "sap-xep-07", "algorithm": "insertion", "level": "nhan-biet",
  "question": "Trong sắp xếp chèn, biến x giữ gì?",
  "options": ["Phần tử đang được chèn vào đoạn đã sắp", "Số lần so sánh", "Chỉ số cuối dãy"],
  "answer": 0,
  "explain": "x giữ A[i] trong lúc các phần tử lớn hơn được dịch sang phải để chừa chỗ."
}</pre></td>
      <td><pre>{
  "id": "sap-xep-07",
  "algorithm": "insertion",
  "level": "nhan-biet",
  "question": "Trong sắp xếp chèn, biến value giữ gì?",
  "options": [
    "Phần tử đang được chèn vào đoạn đã sắp (giá trị A[i])",
    "Số lần so sánh",
    "Chỉ số cuối dãy"
  ],
  "answer": 0,
  "explain": "value giữ A[i] (giá trị đang được chèn) trong lúc các phần tử lớn hơn được dịch sang phải để chừa chỗ."
}</pre></td>
    </tr>
    <tr>
      <td rowspan="2">sap-xep-09</td>
      <td>Sử dụng x = 3 trong tình huống minh họa.</td>
      <td>Đổi thành value = 3.</td>
    </tr>
    <tr>
      <td><pre>{
  "id": "sap-xep-09", "algorithm": "insertion", "level": "van-dung",
  "question": "Với dãy [2, 5, 3], khi chèn x = 3 (i = 2), những phần tử nào bị dịch sang phải?",
  "options": ["Chỉ 5", "Cả 2 và 5", "Không phần tử nào"],
  "answer": 0,
  "explain": "5 &gt; 3 nên dịch 5 sang phải; 2 ≤ 3 nên dừng, đặt 3 vào sau 2, được [2, 3, 5]."
}</pre></td>
      <td><pre>{
  "id": "sap-xep-09",
  "algorithm": "insertion",
  "level": "van-dung",
  "question": "Với dãy [2, 5, 3], khi chèn value = 3 (i = 2), những phần tử nào bị dịch sang phải?",
  "options": ["Chỉ 5", "Cả 2 và 5", "Không phần tử nào"],
  "answer": 0,
  "explain": "5 &gt; 3 nên dịch 5 sang phải; 2 ≤ 3 nên dừng, đặt 3 vào sau 2, được [2, 3, 5]."
}</pre></td>
    </tr>
  </tbody>
</table>

#### 2.3. Quiz Tìm kiếm - timkiem.json

<table>
  <thead>
    <tr>
      <th>Mã câu hỏi</th>
      <th>Nội dung ban đầu</th>
      <th>Nội dung sau điều chỉnh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">tim-kiem-03</td>
      <td>Hỏi tìm kiếm tuần tự trong trường hợp xấu nhất cần bao nhiêu phép so sánh.</td>
      <td>Thay bằng câu hỏi: “Nếu không tìm thấy giá trị cần tìm, hàm tìm kiếm tuần tự trong SGK trả về giá trị nào?” Đáp án: -1.</td>
    </tr>
    <tr>
      <td><pre>{
  "id": "tim-kiem-03", "algorithm": "tuan-tu", "level": "thong-hieu",
  "question": "Tìm kiếm tuần tự trên mảng n phần tử, trường hợp xấu nhất cần bao nhiêu phép so sánh?",
  "options": ["n", "n / 2", "khoảng log₂(n)"],
  "answer": 0,
  "explain": "Khi k nằm cuối mảng hoặc không có trong mảng, phải so sánh với cả n phần tử."
}</pre></td>
      <td><pre>{
  "id": "tim-kiem-03",
  "algorithm": "tuan-tu",
  "level": "thong-hieu",
  "question": "Nếu không tìm thấy giá trị cần tìm, hàm tìm kiếm tuần tự trong SGK trả về giá trị nào?",
  "options": ["-1", "0", "None"],
  "answer": 0,
  "explain": "Theo hàm tìm kiếm tuần tự LinearSearch(A, K) trong SGK, sau khi duyệt hết dãy mà không tìm thấy phần tử cần tìm, thuật toán trả về -1."
}</pre></td>
    </tr>
    <tr>
      <td rowspan="2">tim-kiem-05</td>
      <td>Hỏi tìm kiếm nhị phân trên 1.000 phần tử cần khoảng bao nhiêu lần so sánh.</td>
      <td>Thay bằng câu hỏi về khả năng áp dụng tìm kiếm nhị phân trên dãy tăng dần hoặc giảm dần. Đáp án: Cả hai thứ tự.</td>
    </tr>
    <tr>
      <td><pre>{
  "id": "tim-kiem-05", "algorithm": "nhi-phan", "level": "van-dung",
  "question": "Mảng đã sắp có 1000 phần tử. Tìm kiếm nhị phân cần tối đa khoảng bao nhiêu lần so sánh?",
  "options": ["10", "100", "500"],
  "answer": 0,
  "explain": "Mỗi lần so sánh bỏ đi một nửa số phần tử còn lại: 1000, 500, 250, 125 và cứ thế đến 1. Vì 2¹⁰ = 1024 nên cần khoảng 10 lần."
}</pre></td>
      <td><pre>{
  "id": "tim-kiem-05",
  "algorithm": "nhi-phan",
  "level": "van-dung",
  "question": "Cho dãy số sắp xếp giảm dần: [95, 80, 64, 42, 19, 5]. Theo SGK, nhận định nào đúng khi áp dụng tìm kiếm nhị phân cho dãy này?",
  "options": [
    "Áp dụng được vì tìm kiếm nhị phân dùng được cho cả dãy tăng dần và giảm dần",
    "Không áp dụng được vì tìm kiếm nhị phân chỉ dùng cho dãy tăng dần",
    "Chỉ áp dụng được nếu đảo ngược dãy thành tăng dần trước khi tìm"
  ],
  "answer": 0,
  "explain": "Theo SGK, tìm kiếm nhị phân áp dụng được cho cả dãy tăng dần hoặc giảm dần (mỗi bước vẫn thu hẹp phạm vi tìm kiếm nhờ so sánh với phần tử ở giữa), miễn là dữ liệu đã được sắp xếp theo thứ tự xác định."
}</pre></td>
    </tr>
  </tbody>
</table>

## 3. Điều chỉnh trong data/glossary.json

<table>
  <thead>
    <tr>
      <th>Thuật ngữ</th>
      <th>Ban đầu</th>
      <th>Sau điều chỉnh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">duyet-mang - Duyệt mảng</td>
      <td>Định nghĩa là lần lượt xét từng phần tử, thường bằng vòng lặp theo chỉ số.</td>
      <td>Sửa thành: mảng một chiều có thể dùng for ... in; mảng hai chiều dùng hai vòng for lồng nhau.</td>
    </tr>
    <tr>
      <td><pre>{ "id": "duyet-mang", "vi": "Duyệt mảng", "en": "Traverse", "definition": "Lần lượt xét từng phần tử của mảng, thường bằng vòng lặp theo chỉ số.", "modules": ["mang"] }</pre></td>
      <td><pre>{
  "id": "duyet-mang",
  "vi": "Duyệt mảng",
  "en": "Traverse",
  "definition": "Quá trình lần lượt truy cập và xử lý từng phần tử của mảng; mảng một chiều có thể dùng for ... in, mảng hai chiều dùng hai vòng for lồng nhau.",
  "modules": ["mang"]
}</pre></td>
    </tr>
    <tr>
      <td rowspan="2">ma-gia - Mã giả</td>
      <td>Liên kết với cả Mảng, Sắp xếp và Tìm kiếm.</td>
      <td>Chỉ còn liên kết với module Sắp xếp.</td>
    </tr>
    <tr>
      <td><pre>{ "id": "ma-gia", "vi": "Mã giả", "en": "Pseudocode", "definition": "Cách viết thuật toán gần với ngôn ngữ lập trình nhưng dễ đọc, không theo cú pháp ngôn ngữ cụ thể.", "modules": ["mang", "sap-xep", "tim-kiem"] }</pre></td>
      <td><pre>{
  "id": "ma-gia",
  "vi": "Mã giả",
  "en": "Pseudocode",
  "definition": "Cách viết thuật toán gần với ngôn ngữ lập trình nhưng dễ đọc, không theo cú pháp ngôn ngữ cụ thể.",
  "modules": ["sap-xep"]
}</pre></td>
    </tr>
    <tr>
      <td rowspan="2">do-phuc-tap - Độ phức tạp thời gian</td>
      <td>Có trong danh mục thuật ngữ của các module.</td>
      <td>Xóa khỏi glossary của phạm vi hiện tại.</td>
    </tr>
    <tr>
      <td><pre>{ "id": "do-phuc-tap", "vi": "Độ phức tạp thời gian", "en": "Time complexity", "definition": "Cách số bước của thuật toán tăng lên khi số phần tử n tăng, viết dạng O(n), O(n²).", "modules": ["mang", "sap-xep", "tim-kiem"] }</pre></td>
      <td>Loại bỏ</td>
    </tr>
    <tr>
      <td rowspan="2">truong-hop-xau-nhat - Trường hợp xấu nhất</td>
      <td>Có trong danh mục thuật ngữ.</td>
      <td>Xóa khỏi glossary của phạm vi hiện tại.</td>
    </tr>
    <tr>
      <td><pre>{ "id": "truong-hop-xau-nhat", "vi": "Trường hợp xấu nhất", "en": "Worst case", "definition": "Dữ liệu khiến thuật toán phải làm nhiều bước nhất.", "modules": ["sap-xep", "tim-kiem"] }</pre></td>
      <td>Loại bỏ</td>
    </tr>
  </tbody>
</table>

