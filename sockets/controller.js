const socketController = (socket) => {
  console.log("client connected", socket.id);
};

module.exports = {
  socketController,
};
