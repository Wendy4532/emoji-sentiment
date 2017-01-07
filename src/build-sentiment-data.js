import co from 'co';
import fs from 'fs';
import logUpdate from 'log-update';

import buildSentimentData from './sentiment-data';
import presetStable from './preset-stable';

process.on('uncaughtException', (err) => { throw err; });
process.on('unhandledRejection', (err) => { throw err; });

function* buildForPreset(preset) {
	logUpdate(`using emoji sentiment ranking v${preset.sentimentVersion} (${preset.tag})`);
	logUpdate.done();

	logUpdate('⇣ sentiment-data');
	const sentimentData = yield buildSentimentData({
		url: preset.sentimentDataUrl,
	});
	logUpdate('✓ sentiment-data');
	logUpdate.done();

	// Render emoji sentiment data file as JSON:

	logUpdate('⇣ write sentiment data file');

	fs.writeFileSync(`res/emoji-sentiment-data-v${preset.sentimentVersion}.${preset.tag}.json`, JSON.stringify(sentimentData.data, null, 2));

	logUpdate('✓ write data file');
	logUpdate.done();
}

co(function* main() {
	yield buildForPreset(presetStable);
});
