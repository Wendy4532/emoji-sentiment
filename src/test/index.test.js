import { data } from '../';

describe('emoji-sentiment', () => {
	it('should offer a conservative node API', () => {
		const emojiSentimentRequire = require('../'); // eslint-disable-line global-require
		expect(emojiSentimentRequire).to.have.all.keys('data');
		expect(emojiSentimentRequire.data).to.be.instanceof(Array);
	});

	it('should export sentiment data', () => {
		expect(data).to.be.instanceof(Array);
		data.forEach((datum) => {
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
