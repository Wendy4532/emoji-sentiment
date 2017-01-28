# Emoji Sentiment

> Emoji sentiment data

- lightweight, easy to use JSON data with a minimalistic API
- based on the work of Kralj Novak, Petra; Smailović, Jasmina; Sluban, Borut and Mozetič, Igor, 2015, *Emoji Sentiment Ranking 1.0*, Slovenian language resource repository CLARIN.SI, [http://hdl.handle.net/11356/1048](http://hdl.handle.net/11356/1048).
- they engaged 83 human annotators to label over 1.6 million tweets in 13 european languages by sentiment polarity (negative, neutral or positive) while about 4% of the annotated tweets contained emoji
- this repository provides [transformed and derived JSON data](https://github.com/dematerializer/emoji-sentiment/blob/master/res/emoji-sentiment-data.stable.json) based on the [original CSV data](https://www.clarin.si/repository/xmlui/bitstream/handle/11356/1048/Emoji_Sentiment_Data_v1.0.csv?sequence=8&isAllowed=y)

## API

Requiring/importing `emoji-sentiment` gives you the following API to work with:

- `data`

### `data`

```javascript
[..., { /* emoji sentiment datum */ }, ...]
```

Array of emoji sentiment data.

Example of an emoji sentiment datum:

```javascript
[
  ...
  {
    "sequence": "1F602",
    "negative": 0.24716181096977158,
    "neutral": 0.28470797428532346,
    "positive": 0.46813021474490496,
    "score": 0.22096840377513335
  },
  ...
]
```

Properties of an emoji sentiment datum explained:

- `sequence`

  normalized code point sequence (sequence without any variation selector or modifier applied) e.g. `261D`; use it for mapping the sentiment datum to a specific (emoji) unicode character or connecting it with further meta data (e.g. [unicode-emoji-data](https://www.npmjs.com/package/unicode-emoji-data), [unicode-emoji-annotations](https://www.npmjs.com/package/unicode-emoji-annotations) or [emoji-datasource](https://www.npmjs.com/package/emoji-datasource))

- `negative`

  negativity component of the sentiment distribution for those tweets associated with the (emoji) unicode character, ranging from `0` to `1`

- `neutral`

  neutrality component of the sentiment distribution for those tweets associated with the (emoji) unicode character, ranging from `0` to `1`

- `positive`

  positivity component of the sentiment distribution for those tweets associated with the (emoji) unicode character, ranging from `0` to `1`

- `score`

  resulting sentiment score of the (emoji) unicode character, ranging from `-1` to `+1`, calculated as the mean of the sentiment distribution of `negative` (`-1`), `neutral` (`0`) and `positive` (`+1`)

## Usage

### CommonJS

```javascript
const emojiSentiment = require('emoji-sentiment');
const emojiSentimentData = emojiSentiment.data;
```

### ES6/babel

```javascript
import { data } from 'emoji-sentiment';
```

## Install

`npm install emoji-sentiment`

## License

[MIT](https://github.com/dematerializer/emoji-sentiment/blob/master/LICENSE)

## Development

### Status

[![Travis](https://img.shields.io/travis/dematerializer/emoji-sentiment.svg?style=flat-square)](https://travis-ci.org/dematerializer/emoji-sentiment)
[![Codecov](https://img.shields.io/codecov/c/github/dematerializer/emoji-sentiment.svg?style=flat-square)](https://codecov.io/gh/dematerializer/emoji-sentiment)
