function run() {
  var object1 = { foo: "bar", a: 5 };

  var object2 = { name: "foo", d: 10 };

  Object.assign(object1, object2);

  console.log(object2);
}
