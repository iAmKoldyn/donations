const fs = require('fs');
const path = require('path');

function loadStub(fileName) {
    const filePath = path.join(__dirname, fileName);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

const authorSuccessResponse = loadStub('authors/success.json');
const authorFailureResponse = loadStub('authors/failure.json');
const subscriberSuccessResponse = loadStub('subscriber/success.json');
const subscriberFailureResponse = loadStub('subscriber/failure.json');

module.exports = {
    authorSuccessResponse,
    authorFailureResponse,
    subscriberSuccessResponse,
    subscriberFailureResponse
};
