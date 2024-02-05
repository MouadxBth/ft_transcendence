const io = require("socket.io")(3001, {
	cors: { origin: "*" },
});

interface PlayersInter {
	PID: number;
	y: number;
}

let playersData: { [key: string]: PlayersInter } = {};
let playersCount = 0;

io.on("connect", (socket: any) => {
	playersCount++;
	playersData[socket.id] = { PID: playersCount, y: 0 }; // Assuming 'y' should be initialized to some value
    socket.emit("PID", playersCount);
    io.emit("updatePlayers", playersData);

    socket.on("press", (direction : string) => {
        playersData[socket.id].y += direction === "up" ? -10 : 10;
        io.emit("updatePlayers", playersData);
      });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        delete playersData[socket.id];
        io.emit("updatePlayers", playersData);
      });
});
