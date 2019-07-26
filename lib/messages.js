const messages = [];
const limit = 40;

function updateMessages(msg) {
    if (limit === messages.length) {
        messages.shift();
    }
    messages.push(msg);
}

function getMessages() {
    return messages;
}

module.exports = {
    updateMessages,
    getMessages
}