var restify = require('restify');
//var sampleData = require('./sampleData.js');

//console.log(sampleData.testCases);
//console.log(JSON.stringify(sampleData.testCases));

//var testCases = sampleData.testCases;

function getTestCaseData(req, res, next) {

    res.charSet('utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var testCaseDetails = fetchTestCaseDetails(req.params.testCaseId);
    res.send(testCaseDetails);

    // if (req.params.testCaseId == 'all') {
    //     res.send(testCases);
    // } else {

    // var testCaseData = testCaseDetails.filter(function(t) {
    //     return t.testCaseId == req.params.testCaseId;
    // });

    // }
    next();
}

function getTestCases(req, res, next) {
    res.charSet('utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var testCases = fetchTestCases();
    res.send(testCases);
    next();
}

function fetchTestCases() {
    // Replace with Ajax Call
    var sampleTestCases = require('./sampleTestCases.js');
    return sampleTestCases.testCases;
}

function fetchTestCaseDetails(testCaseId) {
    // Replace with Ajax Call
    var sampleTestCases = require('./sampleData.js');
    sampleTestCases.testCaseId = testCaseId;
    return sampleTestCases.testCaseDetails2(3);
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
