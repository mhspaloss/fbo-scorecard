console.log('Hello World from FBO.js');

//myDate = myDate().slice(-6);

function fboDate() {
  var myDate = new Date();
  myDate.getFullYear().toString().slice(-2);
  console.log('Two Digit year: ', myDate);
  return myDate;
}; 