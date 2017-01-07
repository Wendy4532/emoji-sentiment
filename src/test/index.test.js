import emojiSentiment from '../';

describe('emoji-sentiment', () => {
	it('should offer a conservative node API', () => {
		const emojiSentimentRequire = require('../'); // eslint-disable-line global-require
		expect(emojiSentimentRequire).to.have.all.keys('default');
		expect(emojiSentimentRequire.default).to.be.instanceof(Array);
	});

	it('should export sentiment data', () => {
		expect(emojiSentiment).to.be.instanceof(Array);
		emojiSentiment.forEach((datum) => {
			expect(datum).to.have.all.keys(
				'sequence',
				'occurrences',
				'position',
				'negative',
				'neutral',
				'positive',
			);
		});
	});
});
