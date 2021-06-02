const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth/"
  : "https://node-rest-api-jela.herokuapp.com/api/auth/";

const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const ulMessages = document.querySelector("#ulMessages");
const btnOut = document.querySelector("#btnOut");

let user = null;
let socket = null;

const validateJWT = async () => {
  const token = localStorage.getItem("token") || "";
  if (token.length <= 10) {
    window.location = "index.html";
    throw new Error("No token found");
  }
  const resp = await fetch(url, {
    headers: { "x-token": token },
  });
  const { user: userDB, token: tokenDB } = await resp.json();
  localStorage.setItem("token", tokenDB);
  user = userDB;
  document.title = user.name;
  await connectSocket();
};
const connectSocket = async () => {
  socket = io({
    extraHeaders: { "x-token": localStorage.getItem("token") },
  });

  socket.on("connect", () => {
    console.log("online");
  });
  socket.on("disconnect", () => {
    console.log("offline");
  });
  socket.on("receive-messages", () => {});
  socket.on("active-users", (payload) => {
    console.log(payload);
  });
  socket.on("private-message", () => {});
};
const main = async () => {
  await validateJWT();
};
main();
