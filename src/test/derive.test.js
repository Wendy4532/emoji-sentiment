import {
	deriveSentimentDatum,
	deriveSentimentData,
} from '../derive';

const expectedDerivedData = [
	{
		sequence: '1F602',
		occurrences: 14622,
		negative: 3614,
		neutral: 4163,
		positive: 6845,
		pNegative: 0.24717948717948718,
		pNeutral: 0.2847179487179487,
		pPositive: 0.4681025641025641,
		score: 0.22092307692307694,
		sem: 0.006751317877016391,
	},
	{
		sequence: '2764',
		occurrences: 8050,
		negative: 355,
		neutral: 1334,
		positive: 6361,
		pNegative: 0.04420712777846765,
		pNeutral: 0.1657767291692537,
		pPositive: 0.7900161430522786,
		score: 0.7458090152738109,
		sem: 0.005876494746464442,
	},
];

describe('derive', () => {
	it('should derive additional sentiment data', () => {
		const rawData = [
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
		expect(deriveSentimentDatum(rawData[0])).to.deep.equal(expectedDerivedData[0]);
		expect(deriveSentimentDatum(rawData[1])).to.deep.equal(expectedDerivedData[1]);
		expect(deriveSentimentData(rawData)).to.deep.equal(expectedDerivedData);
	});
});
