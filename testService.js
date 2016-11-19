var restify = require('restify');
//var sampleData = require('./sampleData.js');

//console.log(sampleData.testCases);
//console.log(JSON.stringify(sampleData.testCases));

//var testCases = sampleData.testCases;

function getTestCaseData(req, res, next) {
    res.charSet('utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Data from DB
    var testData = '';
    GetTestDataFromDB(function(result){
        testData = result;
        res.send(testData);
        next();
    });

    //For Hard-coded data uncomment the following
    // var sampleTestCases = require('./sampleData.js');
    // sampleTestCases.testCaseId = testCaseId;
    // var testCaseDetails = sampleTestCases.testCaseDetails2(3);
    // res.send(testCaseDetails);
    // next();


    // if (req.params.testCaseId == 'all') {
    //     res.send(testCases);
    // } else {

    // var testCaseData = testCaseDetails.filter(function(t) {
    //     return t.testCaseId == req.params.testCaseId;
    // });

    // }
}

function getTestCases(req, res, next) {
    res.charSet('utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Data from DB
    var testCases = '';
    GetTestCasesFromDB(function(result){
        testCases = result;
        res.send(testCases);
        next();
    });

    //For Hard-coded data uncomment the following
    // var sampleTestCases = require('./sampleTestCases.js');
    // res.send(sampleTestCases.testCases);
    // next();
}

// function GetDataFromDB(testQuery) {
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/autoDB');
// }

function GetTestCasesFromDB(callback) {
var MongoClient = require('mongodb').MongoClient
// return MongoClient.connect('mongodb://localhost:27017/autoDB', function (err, db) {
return MongoClient.connect('mongodb://192.169.179.82:27017/autoDB', function (err, db) {
  if (err) throw err

  // db.collection('testCases').find().toArray(function (err, result) {
  db.collection('testCases').find({},{"_id":1,"testCaseId":1, "testCategory":1, "description": 1}).limit(10).sort({"_id":-1}).toArray(function (err, result) {
    if (err) throw err

    //console.log(result);
    callback(result);
  })
})
}

function GetTestDataFromDB(callback) {
var MongoClient = require('mongodb').MongoClient
return MongoClient.connect('mongodb://localhost:27017/autoDB', function (err, db) {
  if (err) throw err

  // db.collection('testCases').find().toArray(function (err, result) {
  db.collection('testCases').find({},{"_id":1,"testCaseId":1, "testCategory":1, "browser": 1, "testSteps": 1}).limit(10).sort({"_id":-1}).toArray(function (err, result) {
    if (err) throw err

    //console.log(result);
    callback(result);
  })
})
}

var server = restify.createServer({
    name: 'MyTestService'
});
server.get('/data/:testCaseId', getTestCaseData);
server.head('/data/:testCaseId', getTestCaseData);

server.get('/tests', getTestCases);
server.head('/tests', getTestCases);


//server.pre(restify.pre.userAgentConnection());

server.listen(1111, function() {
    console.log('%s listening at %s', server.name, server.url);
});
