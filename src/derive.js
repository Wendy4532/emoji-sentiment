export const deriveSentimentDatum = (datum) => { // expects a raw datum
	// Using Laplace estimate (rule of succession):
	const pNegative = (datum.negative + 1) / (datum.occurrences + 3);
	const pNeutral = (datum.neutral + 1) / (datum.occurrences + 3);
	const pPositive = (datum.positive + 1) / (datum.occurrences + 3);
	const mean = (pNegative * -1) + (pNeutral * 0) + (pPositive * 1);
	const dNegative = pNegative * ((-1 - mean) ** 2);
	const dNeutral = pNeutral * ((0 - mean) ** 2);
	const dPositive = pPositive * ((1 - mean) ** 2);
	const sd = Math.sqrt(dNegative + dNeutral + dPositive); // standard deviation
	const sem = sd / Math.sqrt(datum.occurrences); // standard error mean
	return {
		...datum,
		pNegative, // |
		pNeutral,  // |-> the sum of these is 1
		pPositive, // |
		score: mean, // "we define the sentiment score as the mean of the discrete probability distribution"
		sem, // e.g. 95% confidence interval: [score − 1.96 * sem, score + 1.96 * sem]
	};
};

export const deriveSentimentData = data => data.map(deriveSentimentDatum);
