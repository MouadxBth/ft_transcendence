import { UserDataType } from "./userContext";

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
	},
	{
		user: "dylan",
		data: []
	},
	{
		user: "troy",
		data: []
	},
	{
		user: "abed",
		data: []
	},
	{
		user: "syl",
		data: []
	},
	{
		user: "sonya",
		data: []
	},
	{
		user: "ben",
		data: []
	},
	{
		user: "sofia",
		data: []
	}],
	channels: [
		{
			user: "random", 
			data: [
				{ user: "matt", message: "holi" },
				{ user: "sean", message: "hoy!" },
				{ user: "sean", message: "soy sadoi sdfoksa asdoisdf asdlonasd fasdofiasd f" }
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
