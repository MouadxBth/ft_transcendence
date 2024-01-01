export const loggedUser = {
	name: "abed",
	conversations: [{
		user: "madsquirrel",
		data: [
			{ content: "yo", senderId: 0 },
			{ content: "whazap", senderId: 1 }
		]
	}, 
	{
		user: "Dummy",
		data: [
			{ content: "hi", senderId: 0 },
			{ content: "yo, homie?", senderId: 1 },
			{ content: "what ya doing bro", senderId: 0 }
		]
	}],
	channels: [
		{
			user: "random", 
			data: [
				{ user: "matt", message: "holi" },
				{ user: "sean", message: "hoy!" }
			]
		},
		{
			user: "frontend", 
			data: [
				{ user: "matt", message: "kafka" },
				{ user: "sean", message: "..." },
				{ user: "double", message: "elab !" }
			]
		},
	]
}
