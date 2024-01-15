function expectedOutcome(rating1: number, rating2: number) {
	return (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (rating1 - rating2)) / 400));
}

function eloGain(rating: number, expected: number, k: number, status: number) {
	return Math.round(rating + k * (status - expected));
}

interface Props {
	r1: number;
	r2: number;
}

function eloRating(
	r1: { rating: number; winner: boolean },
	r2: { rating: number; winner: boolean },
	draw: boolean
): Props {
	return {
		r1: eloGain(
			r1.rating,
			expectedOutcome(r2.rating, r1.rating),
			30,
			draw ? 0.5 : r1.winner ? 1 : 0
		),
		r2: eloGain(
			r2.rating,
			expectedOutcome(r1.rating, r2.rating),
			30,
			draw ? 0.5 : r2.winner ? 1 : 0
		),
	};
}

const ratings = eloRating({ rating: 1200, winner: false }, { rating: 1000, winner: true }, false);

// console.log("r1: " + ratings.r1 + " r2: " + ratings.r2);
console.log(ratings);
