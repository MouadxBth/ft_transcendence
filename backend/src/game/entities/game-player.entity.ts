export class GamePlayer {
	user: {
		username: string;

		nickname: string | null;

		firstName: string | null;

		lastName: string | null;

		avatar: string | null;

		level: number;

		experience: number;

		eloRating: number;
	};

	winner: boolean;
	draw: boolean;
	score: number;
}
