const io = require("socket.io")(4000, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:9000",
      "http://localhost:3050",
      "http://localhost:3000",
      // "http://192.168.0.106:5173",
      // "http://192.168.0.106:9000",
      // "http://192.168.0.106:3050",
      // "http://26.137.251.157:5173",
      // "http://26.137.251.157:9000",
      // "http://26.137.251.157:3050",
      // "http://152.57.240.24:5173",
      // "http://152.57.240.24:9000",
      // "http://152.57.240.24:3050",
      "*",
    ],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("next", (id, cb) => {
    socket.to(id).emit("next-trigger");
    cb();
  });
  // socket.on("send-message", (message, room) => {
  //     if (room === "") {
  //         socket.broadcast.emit("receive-message", message);
  //     } else {
  //         socket.to(room).emit("receive-message", message);
  //     }
  //     console.log(message);
  // });
});
