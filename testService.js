var restify = require('restify');

var testCases = [{
    "testCaseId": "1",
    "testCategory": "cat1",
    "includeInExecution": true,
    "description": "",
    "basic": {
        "browser": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
        "url": "http://www.google.com",
    },
    "steps": {
        "testQuery": "github",
    }
}, {
    "testCaseId": "2",
    "testCategory": "cat1",
    "includeInExecution": true,
    "description": "",
    "basic": {
        "browser": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
        "url": "http://www.google.com",
    },
    "steps": {
        "testQuery": "Param Testing",
    }
}, {
    "testCaseId": "3",
    "testCategory": "cat2",
    "includeInExecution": false,
    "description": "",
    "basic": {
        "browser": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
        "url": "http://www.google.com",
    },
    "steps": {
        "testQuery": "one more time",
    }
}, {
    "testCaseId": "4",
    "testCategory": "cat3",
    "includeInExecution": true,
    "description": "",
    "basic": {
        "browser": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
        "url": "http://www.google.com",
    },
    "steps": {
        "testQuery": "one last time",
    }
}];


function getTestCaseData(req, res, next) {
    res.charSet('utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.params.testCaseId == 'all') {
        res.send(testCases);
    } else {
        var testCaseData = testCases.filter(function(t) {
            return t.testCaseId == req.params.testCaseId;
        });
        res.send(testCaseData);
    }
    next();
}

var server = restify.createServer({
    name: 'MyTestService'
});
server.get('/data/:testCaseId', getTestCaseData);
server.head('/data/:testCaseId', getTestCaseData);

//server.pre(restify.pre.userAgentConnection());

server.listen(1111, function() {
    console.log('%s listening at %s', server.name, server.url);
});
