const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const IdeaSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  details:{
    type: String, 
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create FBO filename schema
const FBOFileSchema = new Schema({
  fboFile:{
    type: String,
    required: true
  },
  gitFile:{
    type: String, 
    required: true
  }
});

//Create FBO-Opportunity Schema
const FBOPresolSchema = new Schema(
  {DATE: String,
		YEAR: String,
		AGENCY: String,
		OFFICE: String,
		LOCATION: String,
		ZIP: String,
		CLASSCOD: String,
    NAICS: String,
    OFFADD: String,
    SUBJECT: String,
    SOLNBR: String,
    RESPDATE: String,
    CONTACT: String,
    DESC: String,
    LINK: String,
    URL: String,
    DESC2: String,
    SETASIDE: String,
    POPCOUNTRY: String,
    POPZIP: String,
    POPADDRESS: String,
    isInteresting: String,}
);

//Create FBO-Opportunity Schema
const FBOSrcsgtSchema = new Schema(
  {DATE: String,
    YEAR: String,
    AGENCY: String,
    OFFICE: String,
    LOCATION: String,
    ZIP: String,
    CLASSCOD: String,
    NAICS: String,
    OFFADD: String,
    SUBJECT: String,
    SOLNBR: String,
    RESPDATE: String,
    CONTACT: String,
    DESC: String,
    LINK: String,
    URL: String,
    DESC2: String,
    SETASIDE: String,
    POPCOUNTRY: String,
    POPZIP: String,
    POPADDRESS: String,
    isInteresting: String,}
  
);

//Create FBO-Opportunity Schema
const FBOCombineSchema = new Schema(
  {DATE: String,
    YEAR: String,
    AGENCY: String,
    OFFICE: String,
    LOCATION: String,
    ZIP: String,
    CLASSCOD: String,
    NAICS: String,
    OFFADD: String,
    SUBJECT: String,
    SOLNBR: String,
    RESPDATE: String,
    CONTACT: String,
    DESC: String,
    LINK: String,
    URL: String,
    DESC2: String,
    SETASIDE: String,
    POPCOUNTRY: String,
    POPZIP: String,
    POPADDRESS: String,
    isInteresting: String,}
  
);

mongoose.model('ideas', IdeaSchema);
mongoose.model('presol', FBOPresolSchema);
mongoose.model('srcsgt', FBOSrcsgtSchema);
mongoose.model('combine', FBOCombineSchema);
mongoose.model('fbofilename', FBOFileSchema);