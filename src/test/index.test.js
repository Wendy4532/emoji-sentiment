import sentimentData from '../';

describe('emoji-sentiment', () => {
	it('should offer a conservative node API', () => {
		const emojiSentimentRequire = require('../'); // eslint-disable-line global-require
		expect(emojiSentimentRequire).to.be.instanceof(Array);
	});

	it('should export sentiment data', () => {
		expect(sentimentData).to.be.instanceof(Array);
		sentimentData.forEach((datum) => {
			expect(datum).to.have.all.keys(
				'sequence',
				'occurrences',
				'negative',
				'neutral',
				'positive',
				'pNegative',
				'pNeutral',
				'pPositive',
				'score',
				'sem',
			);
		});
	});
});
