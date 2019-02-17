//Test code to see if I can load in an FBO file and create JSON

//Read JSON file and create dailyOpps object.
    //var dateString = 'https://raw.githubusercontent.com/mhspaloss/fbo-parse/master/Output%20Files/Matt_PRESOL.json';
    //var dateString = 'https://raw.githubusercontent.com/mhspaloss/fbo-parse/master/Output%20Files/Matt_SRCSGT.json';
    //var dateString = 'https://raw.githubusercontent.com/mhspaloss/fbo-parse/master/Output%20Files/Matt_COMBINE.json';
    console.log(dateString);

    var dailyOpps = [];
request(dateString, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var dailyOpps = JSON.parse(body);
    var writeRecord = dailyOpps[1];
    console.log('Number of JSON records in the input file: ', dailyOpps.length);
    //console.log('writeRecord[0]["PRESOL"]: ', writeRecord[0]["PRESOL"]);
    //console.log('dailyOpps[0][0]["PRESOL"]: ', dailyOpps[0][0]["PRESOL"]);
    //console.log('dailyOpps[0][0]["PRESOL"]: ', dailyOpps[0][0]["PRESOL"]);
    //Write dailyOpps to mongoDB
    dailyOpps.forEach(function(element) {
      //console.log('element ', element);
    //new Presol(element[0]["PRESOL"])
      //new Srcsgt(element[0]["SRCSGT"])
      //new Combine(element[0]["COMBINE"])
      .save()
    });
 
  }
});

//Test code to see if I can load in an FBO file and create JSON - it is not called from any part of this program

//Read JSON file and create dailyOpps object.
    //var dateString = 'https://raw.githubusercontent.com/mhspaloss/fbo-parse/master/Output%20Files/Matt_PRESOL.json';
    //var dateString = 'https://raw.githubusercontent.com/mhspaloss/fbo-parse/master/Output%20Files/Matt_SRCSGT.json';
    //var dateString = 'https://raw.githubusercontent.com/mhspaloss/fbo-parse/master/Output%20Files/Matt_COMBINE.json';
    console.log(dateString);

    var dailyOpps = [];
request(dateString, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var dailyOpps = JSON.parse(body);
    console.log('Number of JSON records in the input file: ', dailyOpps.length);
 
    //Write dailyOpps to mongoDB
    dailyOpps.forEach(function(element) {
      //console.log('element ', element);
    //new Presol(element[0]["PRESOL"])
      //new Srcsgt(element[0]["SRCSGT"])
      //new Combine(element[0]["COMBINE"])
      .save()
    });
 
  }
});

