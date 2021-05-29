var url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth/google"
  : "https://node-rest-api-jela.herokuapp.com/api/auth/google";

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  const token_to_send = { id_token };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(token_to_send),
  })
    .then((resp) => resp.json())
    .then(({ token }) => {
      localStorage.setItem("token", token);
    })
    .catch(console.log);
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
