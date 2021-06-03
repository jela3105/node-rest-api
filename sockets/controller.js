const { checkJWT } = require("../helpers");
const { ChatMessages } = require("../models");
const chatMessages = new ChatMessages();
const socketController = async (socket, io) => {
  const user = await checkJWT(socket.handshake.headers["x-token"]);
  if (!user) {
    return socket.disconnect();
  }
  chatMessages.connectUser(user);
  io.emit("active-users", chatMessages.usersArray);
  socket.emit("receive-messages", chatMessages.last10);

  socket.on("disconnect", () => {
    chatMessages.disconnectUser(user.id);
    io.emit("active-users", chatMessages.usersArray);
  });

  socket.on("send-message", ({ uid, message }) => {
    chatMessages.sendMessage(user.id, user.name, message);
    io.emit("receive-messages", chatMessages.last10);
  });
};

module.exports = {
  socketController,
};
