const express = require("express");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.json({ msg: "get request" });
    });
    this.app.put("/", (req, res) => {
      res.json({ msg: "put request" });
    });
    this.app.post("/", (req, res) => {
      res.json({ msg: "post request" });
    });

    this.app.delete("/", (req, res) => {
      res.json({ msg: "delete request" });
    });

    this.app.patch("/", (req, res) => {
      res.json({ msg: "patch request" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server running in port", this.port);
    });
  }
}

module.exports = Server;
