const express = require("express");
const socketio = require("socket.io")
const http = require("http");
const PORT = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static("public"));

let count = 0;
io.on("connection", socket => {
  console.log('user connected')
  socket.broadcast.emit('message', { message: "new user joined" })

  socket.on('message', ({ message }, callback) => {
    io.emit('message', { message })
    callback()
  })

  socket.on('sendLocation', ({ position }, callback) => {
    io.emit('sendLocation', { position })
    callback('location shared sucessfully')
  })

  socket.on("disconnect", (socket) => {
    console.log('disconnected')
  })
});


app.get("/", (req, res) => {
  res.render("index.html");
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
