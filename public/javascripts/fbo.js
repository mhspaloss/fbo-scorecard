function fboDate() {
  var myDate = new Date();
  myDate.getFullYear().toString().slice(-2);
  console.log('Two Digit year: ', myDate);
  return myDate;
}; 

module.exports = {
  foo: function () {
    console.log('function foo');
  },
  bar: function () {
    console.log('function bar');
  }
};