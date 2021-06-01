const loginForm = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth/"
  : "https://node-rest-api-jela.herokuapp.com/api/auth/";

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {};
  for (let el of loginForm.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then(({ msg, token }) => {
      if (msg) return console.error(msg);
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => {
      console.log(err);
    });
});

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  const token_to_send = { id_token };

  fetch(url + "google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(token_to_send),
  })
    .then((resp) => resp.json())
    .then(({ token }) => {
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch(console.log);
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
