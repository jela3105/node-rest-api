const { checkJWT } = require("../helpers");
const socketController = async (socket) => {
  const user = await checkJWT(socket.handshake.headers["x-token"]);
  if (!user) {
    return socket.disconnect();
  }
  console.log("Connected", user.name);
};

module.exports = {
  socketController,
};
