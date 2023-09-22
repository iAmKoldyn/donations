const fs = require('fs');
const path = require('path');

function loadStub(fileName) {
    const filePath = path.join(__dirname, fileName);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

const authorResponse = loadStub('authors/success.json');
const subscriberResponse = loadStub('subscriber/success.json');

module.exports = {
    authorResponse,
    subscriberResponse
};
