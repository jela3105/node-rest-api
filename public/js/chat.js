//const socket = io();

let user = null;
let socket = null;

const validateJWT = async () => {
  const token = localStorage.getItem("token") || "";
  if (token.length <= 10) {
    window.location = "index.html";
    throw new Error("No token found");
  }
};
const main = async () => {
  await validateJWT();
};
main();
