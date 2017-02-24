import 'isomorphic-fetch';
import csvToJson from 'csvtojson';
import leftPad from 'left-pad';

// Emoji_Sentiment_Data_v1.0.csv provides emoji sentiment data.
const defaultUrl = 'https://www.clarin.si/repository/xmlui/bitstream/handle/11356/1048/Emoji_Sentiment_Data_v1.0.csv?sequence=8&isAllowed=y';

const cherryPickOriginalDataProps = data => data.map(datum => ({
	sequence: leftPad(parseInt(datum['Unicode codepoint'], 16).toString(16), 4, 0).toUpperCase(),
	occurrences: +datum.Occurrences,
	negative: +datum.Negative,
	neutral: +datum.Neutral,
	positive: +datum.Positive,
}));

export const internals = {
	defaultUrl,
	cherryPickOriginalDataProps,
};

export default function* RawData({ url = defaultUrl }) {
	const content = yield fetch(url).then(res => res.text());
	const originalData = yield new Promise((resolve) => {
		csvToJson({ noheader: false }).fromString(content)
		.on('end_parsed', csvData => resolve(csvData));
	});
	const rawData = cherryPickOriginalDataProps(originalData);
	return { // API
		data: rawData,
	};
}
