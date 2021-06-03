const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth/"
  : "https://node-rest-api-jela.herokuapp.com/api/auth/";

const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const ulMessages = document.querySelector("#ulMessages");
const ulUsers = document.querySelector("#ulUsers");
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
  socket.on("receive-messages", showMessages);
  socket.on("active-users", showUsers);
  socket.on("private-message", (payload) => {
    console.log(payload);
  });
};

const showUsers = (users = []) => {
  let htmlUsers = "";
  users.forEach(({ name, uid }) => {
    htmlUsers += ` 
		<li>
		  <p>
		    <h5 class='text-success'>${name}</h5>
		    <span class="fs-6 text-muted">${uid}</span>
		  </p>
		</li>`;
  });
  ulUsers.innerHTML = htmlUsers;
};
const showMessages = (messages = []) => {
  console.log(messages);
  let htmlMessages = "";
  messages.forEach(({ name, message }) => {
    htmlMessages += ` 
		<li>
		  <p>
		    <span class='text-primary'>${name}</span>
		    <span >${message}</span>
		  </p>
		</li>`;
  });
  ulMessages.innerHTML = htmlMessages;
};

txtMessage.addEventListener("keyup", ({ keyCode }) => {
  const message = txtMessage.value;
  const uid = txtUid.value;
  if (keyCode !== 13) return;
  if (message.length === 0) return;
  socket.emit("send-message", { message, uid });
  txtMessage.value = "";
});
const main = async () => {
  await validateJWT();
};
main();
