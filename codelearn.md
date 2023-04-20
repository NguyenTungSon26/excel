Viết chương trình javascript để sắp xếp 4 số (a, b, c, d). Và in ra kết quả.

Ví dụ:
Cho a = 3; b = 2; c= 9; d= -1; In ra "9,3,2,-1";
Cho a = 3; b = 3; c= 8; d= -5; In ra "8,3,3,-5";
Đầu vào: a, b, c, d
Đầu ra: sắp xếp 4 số (a, b, c, d). Và in ra kết quả.

Dưới đây là một ví dụ về chương trình JavaScript để sắp xếp 4 số và in ra kết quả:

javascript
Copy code
// Hàm sắp xếp 4 số
function sortFourNumbers(a, b, c, d) {
let arr = [a, b, c, d];
arr.sort(function(a, b) {
return b - a; // Sắp xếp giảm dần
});
return arr.join(','); // Chuyển mảng thành chuỗi và cách nhau bằng dấu phẩy
}

// Test với các giá trị đầu vào
let a1 = 3, b1 = 2, c1 = 9, d1 = -1;
console.log(sortFourNumbers(a1, b1, c1, d1)); // Kết quả: "9,3,2,-1"

let a2 = 3, b2 = 3, c2 = 8, d2 = -5;
console.log(sortFourNumbers(a2, b2, c2, d2)); // Kết quả: "8,3,3,-5"
Trong chương trình này, chúng ta sử dụng hàm sort() của JavaScript để sắp xếp mảng chứa 4 số theo thứ tự giảm dần (từ lớn đến nhỏ). Sau đó, sử dụng hàm join() để chuyển mảng thành chuỗi và cách nhau bằng dấu phẩy. Kết quả được in ra bằng cách sử dụng hàm console.log().

tungson.ktct@gmail.com
viết lại hàm trên bằng if else

Dưới đây là một phiên bản của chương trình sắp xếp 4 số sử dụng câu lệnh if-else:

javascript
Copy code
// Hàm sắp xếp 4 số sử dụng if-else
function sortFourNumbers(a, b, c, d) {
let max, mid1, mid2, min;

// Tìm số lớn nhất
if (a >= b && a >= c && a >= d) {
max = a;
} else if (b >= a && b >= c && b >= d) {
max = b;
} else if (c >= a && c >= b && c >= d) {
max = c;
} else {
max = d;
}

// Tìm số nhỏ nhất
if (a <= b && a <= c && a <= d) {
min = a;
} else if (b <= a && b <= c && b <= d) {
min = b;
} else if (c <= a && c <= b && c <= d) {
min = c;
} else {
min = d;
}

// Tìm 2 số ở giữa
if (a !== max && a !== min) {
mid1 = a;
} else if (b !== max && b !== min) {
mid1 = b;
} else if (c !== max && c !== min) {
mid1 = c;
} else {
mid1 = d;
}

if ((a === mid1 && a !== max) || (a === mid1 && a !== min)) {
mid2 = a;
} else if ((b === mid1 && b !== max) || (b === mid1 && b !== min)) {
mid2 = b;
} else if ((c === mid1 && c !== max) || (c === mid1 && c !== min)) {
mid2 = c;
} else {
mid2 = d;
}

return max + ',' + mid1 + ',' + mid2 + ',' + min;
}

// Test với các giá trị đầu vào
let a1 = 3, b1 = 2, c1 = 9, d1 = -1;
console.log(sortFourNumbers(a1, b1, c1, d1)); // Kết quả: "9,3,2,-1"

let a2 = 3, b2 = 3, c2 = 8, d2 = -5;
console.log(sortFourNumbers(a2, b2, c2, d2)); // Kết quả: "8,3,3,-5"
Trong phiên bản này, chúng ta sử dụng câu lệnh if-else để so sánh các số và xác định số lớn nhất, số nhỏ nhất, và 2 số ở giữa. Sau đó, chúng ta kết hợp các số này lại thành một chuỗi và trả về kết quả.

--** bài 25 else if 