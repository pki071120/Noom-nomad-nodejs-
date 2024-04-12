import http from "http";
import WebSocket from "ws";
import express from "express";
import { Socket } from "net";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"))
app.get(`/*`, (req, res) => res.redirect("/"))

const handleListen = () => console.log("listening on port http://localhost:3000")

const server =  http.createServer(app)
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("connected to client");
  socket.on("close", () => console.log("disconnected from client"))
  socket.on("message", (message) => {
    console.log(message.toString());
  });
  socket.send("hello!");
})

server.listen(3000, handleListen);