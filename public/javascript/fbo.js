module.exports = {
  foo: function () {
    console.log('function foo');
  },
  bar: function () {
    console.log('function bar');
  },
  filePaths: function () {
    //capture yesterday's date as an endpoint
    var date = new Date(); 
    date.setDate(date.getDate() - 1);
    
    var curdate = parseDate(process.env.FBO_DATE); 
    console.log('curdate ', curdate);
    var pathArray = [];
    // While processing files from last processed to today (assumes I have every day in the date range), build filename array
    while (curdate < date) {
        //Build the filename and add to the array
        var curYear = curdate.getFullYear();
        var curMonth = ("0" + (curdate.getMonth() + 1)).slice(-2); //increment month by 1, add leading zero if month 1-9
        var curDay = ("0" + curdate.getDate()).slice(-2); //add leading zero if  day 1-9

        //Build path to fbo file for FTP and gitFile for filtering
        var dateString = curYear + curMonth + curDay;
        pathArray.push({
            'fboFile': 'ftp://ftp.fbo.gov/FBOFeed' + dateString,
            'gitFile': 'https://raw.githubusercontent.com/mhspaloss/fbo-parse/master/Input%20Files/FBOFeed' + dateString
        });

        //Calculate tomorrow's date
        curdate.setDate(curdate.getDate() + 1);

    };

        //Save current date to environment variable as ISO Standard date string
        //process.env.FBO_DATE = curYear + '-' + curMonth + '-' + curDay;

    return pathArray;
  }
};


function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}