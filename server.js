const io = require("socket.io")(3001, {
  cors: { origin: "*" },
});


let players = {};
let ball =  {x : 0, y : 0}

io.on("connect", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const playerID = Object.keys(players).length + 1;
  players[socket.id] = { playerID, y: 250 };
  socket.emit("playerID", playerID);
  io.emit("updatePlayers", players);

  // socket.on("getBallCords", (newBallCords) => {
  //   if (hasChanged(ball, newBallCords)) {
  //     ball.x = newBallCords.x;
  //     ball.y = newBallCords.y;
  //     io.emit("updateBall", newBallCords);
  //   }
  // });

  socket.on("ball-cord", (ballobj) =>{
    console.log(ballobj.x + " " + ballobj.y);
  });
  
//   function hasChanged(obj1, obj2) {
//   const tolerance = 0.1; 
//   return (
//     Math.abs(obj1.x - obj2.x) > tolerance ||
//     Math.abs(obj1.y - obj2.y) > tolerance
//   );
// }
  socket.on("press", (direction) => {
    players[socket.id].y += direction === "up" ? -10 : 10;
    io.emit("updatePlayers", players);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });
});


