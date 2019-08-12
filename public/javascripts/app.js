const socket = io.connect();

window.addEventListener("load", function () {
    const sendingMessage = document.getElementById("sending-message");
    const messageForm = document.getElementById("message-form");
    const messagesContainer = document.querySelector(".messages-container");
    const usernameContainer = document.getElementById("username-form-container");
    const usernameForm = document.getElementById("username-form");
    const sendingUsername = document.getElementById("sending-username");
    let username;

    sendingUsername.focus();

    usernameForm.addEventListener("submit", function(e) {
        e.preventDefault();
        username = sendingUsername.value;
        if (username && username.trim()) {
            username = username.trim();
            socket.username = username;

            usernameContainer.style.display = "none";
            usernameForm.style.display = "none";
            messageForm.style.display = "";
            messagesContainer.style.display = "";
            sendingMessage.focus();
        }
    });

    socket.on("message", (msg) => {
        const name = document.createElement("span");
        name.className = "username";
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