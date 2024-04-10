const {
  uniqueNamesGenerator,
  animals,
  colors,
} = require("unique-names-generator");

const io = require("socket.io")(4000, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://slidesyncmobile.web.app"
    ],
  },
});

const controlTypes = ["next", "previous", "first-slide", "last-slide"];

io.on("connection", (socket) => {
  // Logging new connections
  console.log("NEW CONNECTION: ", socket.id);

  // Called after mobile connects to web socket
  socket.on("mobile-connect", (code, cb) => {
    // Checking if passed code exists in socket
    console.log("MOBILE");
    if (io.sockets.adapter.rooms.has(code) === true) {
      console.log("Connection found: ", code);
      let name = uniqueNamesGenerator({
        dictionaries: [colors, animals],
        length: 2,
        separator: " ",
        style: "capital",
      });
      socket.join(code);
      cb(name);
      socket.to(code).emit("add-device", { name, id: socket.id });
    } else {
      console.log("Not found: ", code);
      cb("NOT FOUND");
    }
  });

  // Trigger for app functions
  // socket.on("trigger", (controlType, code, cb) => {
  //   console.log("RECEIVED TRIGGER: ", `${controlType} for ${code}`);
  //   if (controlTypes.includes(controlType)) {
  //     socket.to(code).emit("function-request", controlType, (res) => {
  //       console.log("RESP: ", res);
  //       if (res === "Accepted") {
  //         cb("Accept");
  //       } else {
  //         cb("Rejected");
  //       }
  //     });
  //   } else {
  //     console.log("Invalid function specified");
  //     cb("Invalid function");
  //   }
  // });

  socket.on("trigger", (controlType, code, origin) => {
    console.log(
      "RECEIVED TRIGGER: ",
      `${controlType} for ${code} from ${origin}`
    );
    // socket.emit("invalid");
    if (controlTypes.includes(controlType)) {
      socket.to(code).emit("function-request", controlType, origin);
    } else {
      console.log("Invalid function specified");
      socket.to(origin).emit("invalid");
    }
  });

  socket.on("valid-fn", (origin) => {
    io.to(origin).emit("valid");
    console.log("SENT valid to ", origin);
  });

  socket.on("invalid-fn", (origin) => {
    io.to(origin).emit("invalid");
    console.log("SENT iNvAliD to ", origin);
  });

  // Emitting device-disconnect event to each device in room
  socket.on("disconnecting", (reason) => {
    console.log("DISCONNECTING: ", socket.id);
    // socket.rooms.forEach((id) => socket.emit("device-disconnect", socket.id));
    //io.sockets.in(id).emit("device-disconnect", socket.id);
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("device-disconnect", socket.id);
      }
    }
  });

  // Logging disconnected clients
  socket.on("disconnect", (reason) => {
    console.log("DISCONNECTED: ", reason);
  });
});

// socket.on("next", (id, cb) => {
//   socket.to(id).emit("next-trigger");
//   cb();
// });
