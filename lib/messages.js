const fs = require("fs");
const path = require("path");
const limit = 40;

const dataPath = path.join(__dirname, "data.json");

function updateMessages(msg) {
    const messages = JSON.parse(fs.readFileSync(dataPath).toString());
    if (limit === messages.length) {
        messages.shift();
    }
    messages.push(msg);
    fs.writeFileSync(dataPath, JSON.stringify(messages));
}

function getMessages() {
    return JSON.parse(fs.readFileSync(dataPath).toString());
}

module.exports = {
    updateMessages,
    getMessages
}