import rawData from '../res/emoji-sentiment-data.stable.json';
import { deriveSentimentData } from './derive';

module.exports = deriveSentimentData(rawData);
