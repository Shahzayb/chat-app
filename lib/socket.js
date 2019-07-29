const { updateMessages } = require("./messages")

module.exports = function (io) {
    io.on("connection", socket => {

        socket.on("message", (msg) => {
            updateMessages(msg);
            io.sockets.emit("message", {message: msg.message, username: msg.username});
        });

    });
};