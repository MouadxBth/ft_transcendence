const io = require("socket.io")(4001, {
	cors: { origin: "*" },
});	
//FUCK YO MOMMA TYPESCRIPT

// export interface PlayersInter {
// 	PID: number;
// 	y: number;
// }

// let playersData: { [key: string]: PlayersInter } = {};
// let playersCount = 0;


console.log("????")
let players = {};
io.on("connect", (socket) => {
	console.log("User connected");
	console.log("|");
	const PID = Object.keys(players).length + 1;
	players[socket.id] = { PID, y: 250 };
	socket.emit("PID", PID);
	io.emit("updatePlayers", players);
	
	
	socket.on("disconnect", () => {
	  console.log(`User disconnected: ${socket.id}`);
	  delete players[socket.id];
	  io.emit("updatePlayers", players);
	});

	//**********************TYPESCRIPT CODE**************** */
	// playersCount++;
	// playersData[socket.id] = { PID: playersCount, y: 0 };
	// socket.emit("PID", playersCount);
	// io.emit("updatePlayers", playersData);

	// socket.on("press", (direction: string) => {
	// 	playersData[socket.id].y += direction === "up" ? -10 : 10;
	// 	io.emit("updatePlayers", playersData);
	// });

	// socket.on("disconnect", () => {
	// 	console.log(`User disconnected: ${socket.id}`);
	// 	playersCount--;
	// 	delete playersData[socket.id];
	// 	io.emit("updatePlayers", playersData);
	// });
});
