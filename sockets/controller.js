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

  socket.on("disconnect", () => {
    chatMessages.disconnectUser(user.id);
    io.emit("active-users", chatMessages.usersArray);
  });
};

module.exports = {
  socketController,
};
