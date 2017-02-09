import 'isomorphic-fetch';
import csvToJson from 'csvtojson';
import leftPad from 'left-pad';

// Emoji_Sentiment_Data_v1.0.csv provides emoji sentiment data.
const defaultUrl = 'https://www.clarin.si/repository/xmlui/bitstream/handle/11356/1048/Emoji_Sentiment_Data_v1.0.csv?sequence=8&isAllowed=y';

const transformSentimentData = data =>
	data.map((datum) => {
		// Using Laplace estimate (rule of succession):
		const pNegative = (datum.Negative + 1) / (datum.Occurrences + 3);
		const pNeutral = (datum.Neutral + 1) / (datum.Occurrences + 3);
		const pPositive = (datum.Positive + 1) / (datum.Occurrences + 3);
		const mean = (pNegative * -1) + (pNeutral * 0) + (pPositive * 1);
		const dNegative = pNegative * ((-1 - mean) ** 2);
		const dNeutral = pNeutral * ((0 - mean) ** 2);
		const dPositive = pPositive * ((1 - mean) ** 2);
		const sd = Math.sqrt(dNegative + dNeutral + dPositive); // standard deviation
		const sem = sd / Math.sqrt(datum.Occurrences); // standard error mean
		return {
			sequence: leftPad(parseInt(datum['Unicode codepoint'], 16).toString(16), 4, 0).toUpperCase(),
			negative: pNegative, // |
			neutral: pNeutral,   // |-> the sum of these is 1
			positive: pPositive, // |
			score: mean, // "we define the sentiment score as the mean of the discrete probability distribution"
			sem, // e.g. 95% confidence interval: [score − 1.96 * sem, score + 1.96 * sem]
		};
	});

export const internals = {
	defaultUrl,
	transformSentimentData,
};

export default function* SentimentData({ url = defaultUrl }) {
	const content = yield fetch(url).then(res => res.text());
	const csvParsed = new Promise((resolve) => {
		csvToJson({ noheader: false }).fromString(content)
		.on('end_parsed', csvData => resolve(csvData));
	});
	const data = yield csvParsed;
	const transformedData = transformSentimentData(data);
	return { // API
		data: transformedData,
	};
}
