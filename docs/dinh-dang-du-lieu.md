# Định dạng dữ liệu

Tài liệu này quy định cách viết dữ liệu dùng chung trong web. Nhóm lập trình dựa vào đây để viết code đọc dữ liệu, nhóm nội dung dựa vào đây để soạn câu hỏi, thuật ngữ và mã giả.

## 1. Quy ước chung

Các bước mô phỏng được code tạo ra khi chạy, không soạn tay. Mỗi thuật toán có một hàm gen(input), hàm này chạy thuật toán trên dữ liệu đầu vào và lưu lại từng bước, giống cách demo Sắp xếp đang làm. Làm như vậy vì học sinh có thể tự nhập dãy số khác (FR-SORT-05, FR-SEARCH-04), nên không thể soạn trước các bước cho mọi dãy.

Phần chữ được để trong thư mục data/, không viết trong code. Mã giả, lời giới thiệu, độ phức tạp, câu hỏi và thuật ngữ đều là file JSON. Khi cần sửa chữ thì chỉ sửa file JSON.

Mỗi bài gồm ba phần:

| Phần | Vị trí | Người phụ trách |
| --- | --- | --- |
| Code tạo các bước | modules/<mã-bài>/ | Nhóm của Hạnh và Dương |
| Nội dung bài | data/modules/<mã-bài>.json | Nhóm còn lại soạn, nhóm Hạnh và Dương kiểm tra định dạng |
| Câu hỏi củng cố | data/quiz/<mã-bài>.json | Nhóm còn lại |

Thuật ngữ của tất cả các bài để chung trong file data/glossary.json.

Mã bài viết thường, không dấu, các chữ nối bằng dấu gạch ngang: mang, sap-xep, tim-kiem, de-quy, chia-de-tri, cay-nhi-phan, do-thi, ngan-xep, hang-doi.

## 2. Một bước mô phỏng

Tên các trường giữ giống demo Sắp xếp để không phải sửa lại code đã viết.

| Trường | Kiểu | Bắt buộc | Ý nghĩa |
| --- | --- | --- | --- |
| array | mảng số | có | Giá trị của mảng ở bước này |
| compare | mảng chỉ số | có | Các ô đang được so sánh (màu vàng, viền đậm) |
| swap | mảng chỉ số | có | Các ô đang đổi chỗ hoặc được ghi giá trị (màu đỏ, viền nét đứt) |
| done | mảng chỉ số | có | Các ô đã đúng vị trí (màu xanh lá, có dấu ✓) |
| ptr | đối tượng tên - chỉ số | không | Con trỏ vẽ dưới ô, ví dụ {"left": 0, "mid": 3, "right": 6}. Hai con trỏ trùng ô thì gộp tên; chỉ số ngoài 0..n−1 (ví dụ j = −1) thì không vẽ // Hạnh: câu sau ví dụ |
| vars | đối tượng tên - giá trị | có | Giá trị các biến hiện ở bảng biến, ví dụ {"i": 0, "j": 2}. Bước chưa có biến nào thì ghi {} // Hạnh: câu sau ví dụ |
| line | số nguyên | có | Dòng mã giả đang chạy, đếm từ 0 và phải nhỏ hơn số dòng mã giả của thuật toán; ghi -1 nếu không tô dòng nào (bước mở đầu) // Hạnh: thêm điều kiện nhỏ hơn số dòng mã giả và ghi chú bước mở đầu |
| explain | chuỗi | có | Câu giải thích của bước |
| cmp, sw | số nguyên | không | Số phép so sánh và số lần đổi chỗ (hoặc dịch) tính đến bước này |
| anim | "swap" hoặc null | không | Có chạy hiệu ứng trượt khi chuyển sang bước này hay không. Bước ghi giá trị (như dịch phần tử của sắp xếp chèn) để null // Hạnh: câu sau dấu chấm |
| ids | mảng số | không | Mã của từng ô, chỉ dùng trong code để làm hiệu ứng trượt. Khi đổi chỗ thì mã đi theo giá trị; khi ghi giá trị mới vào ô thì cấp mã mới // Hạnh: câu sau dấu chấm |

Ô không có trong compare, swap và done là ô chưa xét (màu xám). Nếu một ô có trong nhiều trường thì ưu tiên swap trước, rồi đến compare, cuối cùng là done.

Ví dụ một bước của sắp xếp nổi bọt:

```json
{
  "array": [3, 5, 8, 1],
  "compare": [1, 2], "swap": [], "done": [],
  "ptr": { "j": 1, "j+1": 2 },
  "vars": { "i": 0, "j": 1 },
  "line": 2,
  "explain": "So sánh A[1]=5 và A[2]=8: 5 ≤ 8 nên giữ nguyên.",
  "cmp": 2, "sw": 1
}
```

### Cách viết câu giải thích (explain)

1. Mỗi bước viết một câu, khoảng 25 chữ trở xuống. Riêng bước mở đầu, bước kết thúc và bước đặt x vào chỗ trống (sắp xếp chèn) được viết hai câu ngắn, tổng vẫn không quá 25 chữ. // Hạnh: câu sau "khoảng 25 chữ trở xuống"
2. Ghi giá trị cụ thể đang xét, ví dụ A[1]=5.
3. Nói luôn kết quả và lý do trong câu, ví dụ "5 > 3 nên đổi chỗ".
4. Chỉ dùng tên biến có trong mã giả của bài và dùng thuật ngữ giống SGK.

### Mảng hai chiều và mê cung

Với các bài vẽ dạng lưới, bước mô phỏng dùng trường grid (mảng gồm các hàng) thay cho array. Các trường compare, swap, done khi đó ghi theo cặp [hàng, cột].

```json
{ "grid": [[1, 2, 3], [4, 5, 6]], "compare": [[1, 2]], "swap": [], "done": [[0, 0], [0, 1]],
  "vars": { "i": 1, "j": 2, "s": 15 }, "line": 3, "explain": "Cộng B[1][2]=6 vào s, được s = 21." }
```

Dạng bước cho các bài có cây (Đệ quy, Chia để trị, Cây nhị phân) sẽ bổ sung ở đợt 2.

## 3. Nội dung bài: data/modules/<mã-bài>.json

```json
{
  "id": "sap-xep",
  "title": "Sắp xếp",
  "order": 2,
  "level": "bat-buoc",
  "sgk": "Tin học 11, Bài 21–22",
  "intro": "Câu giới thiệu ngắn hiện ở đầu bài.",
  "defaultInput": [5, 3, 8, 1, 9, 2],
  "inputRule": { "minLength": 2, "maxLength": 10, "minValue": 0, "maxValue": 99 },
  "algorithms": [
    {
      "id": "bubble",
      "name": "Sắp xếp nổi bọt",
      "pseudocode": ["for i ← 0 đến n−2:", "  for j ← 0 đến n−2−i:", "    nếu A[j] > A[j+1]:", "      đổi chỗ A[j] và A[j+1]", "kết thúc"],
      "complexity": "Cần khoảng n(n−1)/2 phép so sánh, độ phức tạp O(n²).",
      "counterLabels": { "cmp": "Số phép so sánh", "sw": "Số lần đổi chỗ" }
    }
  ],
  "glossary": ["mang", "chi-so", "phep-so-sanh", "doi-cho"]
}
```

Giải thích một số trường:

- level ghi bat-buoc hoặc nen-co.
- line trong mỗi bước chỉ vào dòng của pseudocode thuộc cùng thuật toán. Vì vậy khi thêm hoặc bớt dòng mã giả cần báo nhóm lập trình để chỉnh lại số dòng.
- complexity hiện trong mục "Xem thêm".
- glossary là danh sách mã thuật ngữ dùng trong bài, để trang bài học tô màu và cho học sinh bấm xem nghĩa.

Danh sách các bài cho trang chủ nằm trong file data/modules/index.json.

## 4. Câu hỏi củng cố: data/quiz/<mã-bài>.json

```json
{
  "module": "sap-xep",
  "questions": [
    {
      "id": "sap-xep-01",
      "algorithm": "bubble",
      "level": "nhan-biet",
      "question": "Sắp xếp nổi bọt so sánh những cặp phần tử nào?",
      "options": ["Hai phần tử bất kỳ", "Hai phần tử kề nhau A[j] và A[j+1]", "Phần tử đầu và phần tử cuối"],
      "answer": 1,
      "explain": "Thuật toán chỉ so sánh và đổi chỗ các cặp kề nhau."
    }
  ]
}
```

- answer là vị trí của đáp án đúng trong options, đếm từ 0.
- algorithm là mã thuật toán mà câu hỏi thuộc về, hoặc null nếu câu hỏi chung cho cả bài.
- level ghi một trong ba mức: nhan-biet, thong-hieu, van-dung.
- Mỗi câu có 3 hoặc 4 phương án. Các phương án sai nên là những lỗi học sinh hay nhầm.
- explain giải thích vì sao đáp án đúng, hiện ra sau khi học sinh chọn.

Do đáp án nằm trong file công khai nên học sinh xem mã nguồn vẫn thấy được. Với câu hỏi tự ôn tập thì điều này chấp nhận được. Nếu sau này cần chấm điểm thì sẽ chuyển đáp án lên máy chủ.

## 5. Thuật ngữ: data/glossary.json

```json
{
  "terms": [
    { "id": "chi-so", "vi": "Chỉ số", "en": "Index", "definition": "Số thứ tự xác định vị trí phần tử trong mảng, bắt đầu từ 0.", "modules": ["mang", "sap-xep", "tim-kiem"] }
  ]
}
```

- id viết thường, không dấu, nối bằng gạch ngang. Khi đã dùng rồi thì không đổi id.
- definition viết một câu, khoảng 25 chữ trở xuống, dùng từ ngữ giống SGK.

## 6. Kiểm tra file trước khi mở PR

Các mẫu kiểm tra (JSON Schema) nằm trong thư mục data/schema/:

| File dữ liệu | Mẫu kiểm tra |
| --- | --- |
| Bước mô phỏng (khi xuất JSON) | step.schema.json |
| data/modules/<mã-bài>.json | module.schema.json |
| data/quiz/<mã-bài>.json | quiz.schema.json |
| data/glossary.json | glossary.schema.json |

### Tệp JSON xuất từ demo // Hạnh thêm mới: cả đoạn này, đến hết câu "sẽ đổi khi tách code ở các nhiệm vụ sau"

Nút xuất của demo Sắp xếp tạo file có dạng:

```json
{ "module": "sort", "algo": "bubble", "input": [5, 3, 8, 1, 9, 2], "steps": [ ... ] }
```

Mỗi phần tử của steps chỉ giữ 7 trường array, compare, swap, done, vars, line, explain (bỏ ptr, cmp, sw, anim, ids) nên vẫn đúng step.schema.json. Mẫu này chỉ kiểm tra từng bước, không kiểm tra phần bao ngoài (module, algo, input). Giá trị module của demo hiện là "sort", chưa trùng mã bài "sap-xep" ở mục 1; sẽ đổi khi tách code ở các nhiệm vụ sau.

Trước khi mở PR có file JSON, vào trang https://www.jsonschemavalidator.net, dán mẫu kiểm tra vào khung bên trái và file của mình vào khung bên phải. Nếu trang báo "No errors found" thì file đúng định dạng.

## Ghi chú chỉnh sửa // Hạnh thêm mới: cả mục này

Hạnh đối chiếu tài liệu với các hàm gen() trong demo Sắp xếp (nổi bọt, chọn, chèn). Không đổi tên trường nào vì tên trường đã khớp với demo. Các chỗ đã sửa hoặc bổ sung:

| Vị trí | Nội dung sửa | Lý do |
| --- | --- | --- |
| Mục 2, bảng, dòng ptr | Thêm: trùng ô thì gộp tên; chỉ số ngoài 0..n−1 thì không vẽ | Đúng với cách demo vẽ con trỏ |
| Mục 2, bảng, dòng vars | Thêm: chưa có biến nào thì ghi {} | Demo ghi {} ở bước mở đầu |
| Mục 2, bảng, dòng line | Thêm: phải nhỏ hơn số dòng mã giả; -1 dành cho bước mở đầu | Để khớp với pseudocode trong data/modules |
| Mục 2, bảng, dòng anim | Thêm: bước ghi giá trị (dịch phần tử) để null | Demo chỉ dùng "swap" cho bước đổi chỗ |
| Mục 2, bảng, dòng ids | Thêm: đổi chỗ thì mã đi theo giá trị, ghi giá trị mới thì cấp mã mới | Đúng với cách demo làm hiệu ứng trượt |
| Mục 2, quy tắc explain số 1 | Cho phép hai câu ngắn ở bước mở đầu, bước kết thúc và bước đặt x (sắp xếp chèn), tổng không quá 25 chữ | Demo đang viết như vậy |
| Mục 6, thêm đoạn "Tệp JSON xuất từ demo" | Ghi lại khung {module, algo, input, steps} và 7 trường mỗi bước | Để biết nút xuất vẫn đúng step.schema.json |

Chỗ chưa khớp, chưa sửa trong code: nút xuất của demo ghi module là "sort", trong khi mã bài là "sap-xep" (mục 1). Sẽ đổi khi tách code ở nhiệm vụ sau.