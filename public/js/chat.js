//const socket = io();

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth/"
  : "https://node-rest-api-jela.herokuapp.com/api/auth/";

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
};
const main = async () => {
  await validateJWT();
};
main();
