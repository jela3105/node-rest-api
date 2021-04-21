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
    this.app.get("/api", (req, res) => {
      res.json({ msg: "get request" });
    });

    this.app.put("/api", (req, res) => {
      res.status(400).json({ msg: "put request" });
    });

    this.app.post("/api", (req, res) => {
      res.status(201).json({ msg: "post request" });
    });

    this.app.delete("/api", (req, res) => {
      res.json({ msg: "delete request" });
    });

    this.app.patch("/api", (req, res) => {
      res.status(200).json({ msg: "patch request" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server running in port", this.port);
    });
  }
}

module.exports = Server;
