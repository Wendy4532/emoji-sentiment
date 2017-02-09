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
		negative: 0.24717948717948718,
		neutral: 0.2847179487179487,
		positive: 0.4681025641025641,
		score: 0.22092307692307694,
		sem: 0.006751317877016391,
	},
	{
		sequence: '2764',
		negative: 0.04420712777846765,
		neutral: 0.1657767291692537,
		positive: 0.7900161430522786,
		score: 0.7458090152738109,
		sem: 0.005876494746464442,
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
