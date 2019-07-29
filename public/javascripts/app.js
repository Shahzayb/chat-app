const socket = io.connect();

window.addEventListener("load", function () {
    const sendingMessage = document.getElementById("sending-message");
    const messageForm = document.getElementById("message-form");
    const messagesContainer = document.getElementById("messages-container");
    const usernameContainer = document.getElementById("username-container");
    const chatContainer = document.getElementById("chat-container");
    const usernameForm = document.getElementById("username-form");
    const usernameField = document.getElementById("username-field");
    let username;

    chatContainer.hidden = true;
    usernameContainer.hidden = false;
    usernameField.focus();

    usernameForm.addEventListener("submit", function(e) {
        e.preventDefault();
        username = usernameField.value;
        if (username && username.trim()) {
            username = username.trim();
            socket.username = username;

            usernameContainer.hidden = true;
            chatContainer.hidden = false;
            sendingMessage.focus();
        }
    });

    socket.on("message", (msg) => {
        const name = document.createElement("span");
        name.className = "name";
        name.append(msg.username);

        const message = document.createElement("span");
        message.className = "message";
        message.append(msg.message);

        const messageContainer = document.createElement("div");
        messageContainer.className = "message-container";
        messageContainer.append(name);
        messageContainer.append(message);

        if (username === msg.username || atBottom(messagesContainer)) {
            messagesContainer.append(messageContainer);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
            messagesContainer.append(messageContainer);
        }
    });

    messageForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (sendingMessage.value && sendingMessage.value.trim()) {
            socket.emit("message", {
                message: sendingMessage.value.trim(),
                username: socket.username
            });
            sendingMessage.value = "";
            sendingMessage.focus();
        }
    });
});

function atBottom(elem) {
    return (elem.scrollHeight - elem.scrollTop - elem.clientHeight) === 0;
}