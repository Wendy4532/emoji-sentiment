import fetchMock from 'fetch-mock';
import buildRawData, { internals } from '../raw-data';

const {
	defaultUrl,
	cherryPickOriginalDataProps,
} = internals;

const originalCsvDataContentMock = `Emoji,Unicode codepoint,Occurrences,Position,Negative,Neutral,Positive,Unicode name,Unicode block
😂,0x1f602,14622,0.805100583,3614,4163,6845,FACE WITH TEARS OF JOY,Emoticons
❤,0x2764,8050,0.746943086,355,1334,6361,HEAVY BLACK HEART,Dingbats`;

const expectedRawData = [
	{
		sequence: '1F602',
		occurrences: 14622,
		negative: 3614,
		neutral: 4163,
		positive: 6845,
	},
	{
		sequence: '2764',
		occurrences: 8050,
		negative: 355,
		neutral: 1334,
		positive: 6361,
	},
];

describe('raw-data', () => {
	it('should use a reasonable default url', () => {
		expect(defaultUrl).to.equal('https://www.clarin.si/repository/xmlui/bitstream/handle/11356/1048/Emoji_Sentiment_Data_v1.0.csv?sequence=8&isAllowed=y');
	});

	it('should cherry pick original data props', () => {
		const originalData = [
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
		expect(cherryPickOriginalDataProps(originalData)).to.deep.equal(expectedRawData);
	});

	it('should generate an API', (done) => {
		fetchMock.get('*', originalCsvDataContentMock);
		const step = buildRawData({});
		step.next().value
		.then(content => step.next(content).value)
		.then((data) => {
			const api = step.next(data).value;
			expect(api).to.have.all.keys('data');
			expect(api.data).to.deep.equal(expectedRawData);
			done();
		});
	});
});
