function getTestCaseDetails(testCaseId){
  console.log('Test Case ID request2 - ' + testCaseId);
//Replace with Ajax Call
  var testData = {
      "testCaseId": "1",
      "browser": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
      "steps": {
          "navigate": "http://www.google.com",
          "testQuery": "github"
      }
  };

  return testData;
}
var testCaseId = -1;
exports.testCaseId = testCaseId;
exports.testCaseDetails = getTestCaseDetails(testCaseId);

exports.testCaseDetails2(testCaseId2) = new function() {
  getTestCaseDetails(testCaseId2);
}
