import fetchMock from 'fetch-mock';
import buildSentimentData, { internals } from '../sentiment-data';

const {
	defaultUrl,
	transformSentimentData,
} = internals;

const csvContentMock = `Emoji,Unicode codepoint,Occurrences,Position,Negative,Neutral,Positive,Unicode name,Unicode block
😂,0x1f602,14622,0.805100583,3614,4163,6845,FACE WITH TEARS OF JOY,Emoticons
❤,0x2764,8050,0.746943086,355,1334,6361,HEAVY BLACK HEART,Dingbats`;

const expectedSentimentData = [
	{
		sequence: '1F602',
		negative: 0.24716181096977158,
		neutral: 0.28470797428532346,
		positive: 0.46813021474490496,
		score: 0.22096840377513335,
	},
	{
		sequence: '2764',
		negative: 0.044099378881987575,
		neutral: 0.1657142857142857,
		positive: 0.7901863354037267,
		score: 0.7460869565217392,
	},
];

describe('sentiment-data', () => {
	it('should use a reasonable default url', () => {
		expect(defaultUrl).to.equal('https://www.clarin.si/repository/xmlui/bitstream/handle/11356/1048/Emoji_Sentiment_Data_v1.0.csv?sequence=8&isAllowed=y');
	});

	it('should transform sentiment data', () => {
		const data = [
			{
				Emoji: '😂',
				'Unicode codepoint': '0x1f602',
				Occurrences: 14622,
				Position: 0.805100583,
				Negative: 3614,
				Neutral: 4163,
				Positive: 6845,
				'Unicode name': 'FACE WITH TEARS OF JOY',
				'Unicode block': 'Emoticons',
			},
			{
				Emoji: '❤',
				'Unicode codepoint': '0x2764',
				Occurrences: 8050,
				Position: 0.746943086,
				Negative: 355,
				Neutral: 1334,
				Positive: 6361,
				'Unicode name': 'HEAVY BLACK HEART',
				'Unicode block': 'Dingbats',
			},
		];
		expect(transformSentimentData(data)).to.deep.equal(expectedSentimentData);
	});

	it('should generate an API', (done) => {
		fetchMock.get('*', csvContentMock);
		const step = buildSentimentData({});
		step.next().value
		.then(content => step.next(content).value)
		.then((data) => {
			const api = step.next(data).value;
			expect(api).to.have.all.keys('data');
			expect(api.data).to.deep.equal(expectedSentimentData);
			done();
		});
	});
});
