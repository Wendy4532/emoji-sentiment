/* eslint-disable no-mixed-operators */

import fs from 'fs';
import punycode from 'punycode';
import round from 'lodash.round';
import sentimentData from '.';
import presetStable from './preset-stable';

process.on('uncaughtException', (err) => { throw err; });
process.on('unhandledRejection', (err) => { throw err; });

const buildForPreset = (preset) => {
	const tableRows = sentimentData.map((datum, index) => {
		const output = punycode.ucs2.encode(datum.sequence.split(' ').map(cp => parseInt(cp, 16)));
		const negativePercent = datum.pNegative * 100;
		const neutralPercent = datum.pNeutral * 100;
		const positivePercent = datum.pPositive * 100;
		// NOTE: score and half of the confidence interval
		//       need to be scaled down by 0.5 to match
		//       the coordinate system of the visualization:
		//       100% of the sentiment bar space spans across 2
		//       (0% = -1 to 100% = 1)
		const scorePercent = datum.score * 100 * 0.5;
		const halfConfIntvPercent = 1.96 * datum.sem * 100 * 0.5;
		return `
			<tr>
				<td><pre>${index + 1}</pre></td>
				<td><pre>${datum.sequence}</pre></td>
				<td><pre>${output}</pre></td>
				<td><pre>${datum.occurrences}</pre></td>
				<td><pre>${datum.negative}</pre></td>
				<td><pre>${datum.neutral}</pre></td>
				<td><pre>${datum.positive}</pre></td>
				<td><pre>${round(datum.pNegative, 3)}</pre></td>
				<td><pre>${round(datum.pNeutral, 3)}</pre></td>
				<td><pre>${round(datum.pPositive, 3)}</pre></td>
				<td><pre>${round(datum.score, 3)}</pre></td>
				<td><pre>${round(datum.sem, 3)}</pre></td>
				<td><pre>${round(datum.score, 3)}±${round(1.96 * datum.sem, 3)}</pre></td>
				<td>
					<div class="diagram">
						<div
							class="distribution negative"
							title="negative: ${round(datum.pNegative, 3)}"
							style="left: 0; width: ${negativePercent}%;"
						/></div>
						<div
							class="distribution neutral"
							title="neutral: ${round(datum.pNeutral, 3)}"
							style="left: ${negativePercent}%; width: ${neutralPercent}%;"
						/></div>
						<div
							class="distribution positive"
							title="positive: ${round(datum.pPositive, 3)}"
							style="right: 0; width: ${positivePercent}%;"
						/></div>
						<div
							class="score"
							title="score: ${round(datum.score, 3)}±${round(1.96 * datum.sem, 3)}"
							style="left: ${50 + scorePercent - halfConfIntvPercent}%; width: ${2 * halfConfIntvPercent}%"
						/></div>
					</div>
				</td>
			</tr>`;
	}).join('');

	const html = `
		<!DOCTYPE html>
		<html>
			<head>
			<meta charset="utf-8">
			<title>emoji sentiment data v${preset.sentimentVersion} (${preset.tag})</title>
			<style>
				table {
					width: 100%;
					border-collapse: collapse;
				}
				th, td {
					position: relative;
					vertical-align: top;
					text-align: left;
					white-space: nowrap;
					border: 1px solid black;
				}
				.diagram {
					position: absolute;
					top: 10px;
					right: 10px;
					bottom: 10px;
					left: 10px;
					overflow: hidden;
				}
				.distribution {
					position: absolute;
					height: 100%;
				}
				.negative {
					background-color: rgb(255, 60, 0);
				}
				.neutral {
					background-color: yellow;
				}
				.positive {
					background-color: rgb(0, 198, 1);
				}
				.score {
					position: absolute;
					background-color: black;
					opacity: 0.5;
					top: 10%;
					bottom: 10%;
				}
			</style>
			<body>
				<table>
					<thead>
						<th>#</th>
						<th>Sequence</th>
						<th>Output<br />(derived)</th>
						<th>Occurrences</th>
						<th>Negative</th>
						<th>Neutral</th>
						<th>Positive</th>
						<th>Negativity<br />(derived)<br />[0...1]</th>
						<th>Neutrality<br />(derived)<br />[0...1]</th>
						<th>Positivity<br />(derived)<br />[0...1]</th>
						<th>Score<br />(derived)<br />[-1...+1]</th>
						<th>SEM<br />(derived)</th>
						<th>Confidence Interval<br />(derived)<br />c.i. 95%</th>
						<th style="width: 25%;">Visualization<br />(derived)<br />c.i. 95%</th>
					</thead>
					<tbody>
						${tableRows}
					</tbody>
				</table>
			</body>
		</html>
	`;

	fs.writeFileSync(`docs/emoji-sentiment.${preset.tag}.html`, html);
};

buildForPreset(presetStable); // for now we only care about the stable data
