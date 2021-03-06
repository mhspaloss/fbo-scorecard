//MongoDB requirements
require('../../models/Opportunity.js');
const mongoose = require('mongoose');
const Combinequeue = mongoose.model('combinequeue');
const Srcsgtqueue = mongoose.model('srcsgtqueue');

//18F code requirements
const fs = require("fs");
const parser = require("../../index");

//Read JSON from GitHub repo
const request = require('request');

module.exports = {
  
  filePaths: function () {
    //capture yesterday's date as an endpoint
    var endDate = new Date(); 
    endDate.setDate(endDate.getDate() - 1);
    
    var curdate = parseDate(process.env.FBO_DATE); 
    console.log('curdate ', curdate, '\nendDate ', endDate);
    var pathArray = [];
    // While processing files from last processed to today (assumes I have every day in the date range), build filename array
    while (curdate < endDate) {
      //Build the filename and add to the array
      var curYear = curdate.getFullYear();
      var curMonth = ("0" + (curdate.getMonth() + 1)).slice(-2); //increment month by 1, add leading zero if month 1-9
      var curDay = ("0" + curdate.getDate()).slice(-2); //add leading zero if  day 1-9

      //Build path to fbo file for FTP and gitFile for filtering
      var dateString = curYear + curMonth + curDay;
      pathArray.push({ 'fboDate': dateString });
      
      //Calculate tomorrow's date
      curdate.setDate(curdate.getDate() + 1);

    };
    console.log('pathArray ', pathArray);
    return pathArray;
  },

  filterFile: function (fboDate) {
    var dailyOpps = []; //JSON records from daily file
    var result = []; //JSON records after filtering


    //Read JSON file and create dailyOpps object.
    console.log(fboDate);
    
    request('https://raw.githubusercontent.com/mhspaloss/fbo-parse/master/Input%20Files/FBOFeed' + fboDate, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var dailyOpps = parser.parse(body);
        console.log('Number of JSON records in the input file: ', dailyOpps.length);

        //Filter dailyOpps to remove poorly formed or uninteresting opportunities
        var result = dailyOpps.filter(isInteresting);
        console.log('Number of JSON records through the filter: ', result.length);
        
        //Write dailyOpps to mongoDB
        
        result.forEach(function(element) {
          element[0][Object.keys(element[0])[0]].fboType = Object.keys(element[0])[0];
          if (Object.keys(element[0])[0] == 'COMBINE') {
             new Combinequeue(element[0][Object.keys(element[0])[0]])
            .save()          
          } else {
             new Srcsgtqueue(element[0][Object.keys(element[0])[0]])
            .save()          
          }
        });
      }
    });

    //Save current date to environment variable as ISO Standard date string
    //process.env.FBO_DATE = curYear + '-' + curMonth + '-' + curDay;

    return { 'numRecords': dailyOpps.length , 'numFiltered': result.length };

}
};

//filter out badly formed or uninteresting opportunities
function isInteresting(element) {

    //set myDealType string object to identify the record types I care about
    const myDealType = process.env.MY_DEAL_TYPE;

    //set myNaicsStr string object to identify the NAICS Codes I care about
    const myNaicsStr = process.env.MY_NAICS_STR;

    //set myClassCode string object to identify the classification codes I care about
    const myClassStr = process.env.MY_CLASS_STR;

    //set regular expression to find 'sole.source' and 'set.aside' in the description
    const soleSource = RegExp('sole.source', 'i');
    const setAside = RegExp('set.aside', 'i');

    // if it's an opportunity type I don't care about, omit record and return
    if (myDealType.match(Object.keys(element[0])[0]) == null) {
        return false;
    };

    //if subject or description keys don't exist, omit record and return
    if (!("DESC" in element[0][Object.keys(element[0])[0]]) ||
        !("SUBJECT" in element[0][Object.keys(element[0])[0]])) {
        return false;
    };

    //Test if NAICS key exists, filter on it.  Return if not interesting result
    if ("NAICS" in element[0][Object.keys(element[0])[0]]) { //if NAICS key exists
        if (myNaicsStr.match(element[0][Object.keys(element[0])[0]]['NAICS']) == null) {
            return false; //NAICS exists but not interesting, omit record
        };
    };

    //Test if CLASSCOD key exists, filter on it.  Omit if not services deal
    if ("CLASSCOD" in element[0][Object.keys(element[0])[0]]) { //if CLASSCOD key exists
        if (myClassStr.match(element[0][Object.keys(element[0])[0]]['CLASSCOD']) == null) {
            return false; //CLASSCOD exists but not interesting, omit record
        };
    };

    //Test if SETASIDE key exists, filter on it.  Omit if SETASIDE deal
    if ("SETASIDE" in element[0][Object.keys(element[0])[0]]) { //if SETASIDE key exists
        if ((element[0][Object.keys(element[0])[0]]['SETASIDE']) != 'N/A') {
            return false; //SETASIDE exists and has a set aside type, omit record
        };
    };

    //Also check whether the description calls this opportunity sole source
    if (soleSource.test(element[0][Object.keys(element[0])[0]]['DESC'])) {
        return false; //sole source, omit record
    };

    //Also check whether the description calls this opportunity sole source
    if (setAside.test(element[0][Object.keys(element[0])[0]]['DESC'])) {
        return false; //set aside, omit record
    };

    //Passed all tests, keep the record
    return true;
};

function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
};

