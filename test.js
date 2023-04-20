var o1 = { a: 1, b: 1, c: 1, d: 5 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3, d: 1 };

var obj = Object.assign({}, o1, o2, o3);
console.log(obj);
