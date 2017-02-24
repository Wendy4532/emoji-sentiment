# Emoji Sentiment

> Emoji sentiment data

- lightweight, easy to use JSON data with a minimalistic API
- based on the work of Kralj Novak, Petra; Smailović, Jasmina; Sluban, Borut and Mozetič, Igor, 2015, *Emoji Sentiment Ranking 1.0*, Slovenian language resource repository CLARIN.SI, [http://hdl.handle.net/11356/1048](http://hdl.handle.net/11356/1048).
- they engaged 83 human annotators to label over 1.6 million tweets in 13 european languages by sentiment polarity (negative, neutral or positive) while about 4% of the annotated tweets contained emoji
- this repository provides [derived JSON data](https://github.com/dematerializer/emoji-sentiment/blob/master/res/emoji-sentiment-data.stable.json) based on the [original CSV data](https://www.clarin.si/repository/xmlui/bitstream/handle/11356/1048/Emoji_Sentiment_Data_v1.0.csv?sequence=8&isAllowed=y)

Have a look at [this table to see an example](https://dematerializer.github.io/emoji-sentiment/emoji-sentiment.stable.html) of what data this library provides.

## API

Requiring/importing `emoji-sentiment` gives you the following data structure to work with:

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
    "occurrences": 14622,
    "negative": 3614,
    "neutral": 4163,
    "positive": 6845,
    "pNegative": 0.24717948717948718,
    "pNeutral": 0.2847179487179487,
    "pPositive": 0.4681025641025641,
    "score": 0.22092307692307694,
    "sem": 0.006751317877016391
  },
  ...
]
```

Properties of an emoji sentiment datum explained:

- `sequence`

  normalized code point sequence (sequence without any variation selector or modifier applied) e.g. `1F602`; use it for mapping the sentiment datum to a specific (emoji) unicode character or connecting it with further meta data (e.g. [unicode-emoji-data](https://www.npmjs.com/package/unicode-emoji-data), [unicode-emoji-annotations](https://www.npmjs.com/package/unicode-emoji-annotations) or [emoji-datasource](https://www.npmjs.com/package/emoji-datasource))

- `occurrences`

  absolute number of occurrences of the (emoji) unicode character in tweets

- `negative`

  absolute number of occurrences of the (emoji) unicode character in tweets labeled negative

- `neutral`

  absolute number of occurrences of the (emoji) unicode character in tweets labeled neutral

- `positive`

  absolute number of occurrences of the (emoji) unicode character in tweets labeled positive

- `pNegative`

  relative negativity component of the sentiment distribution for those tweets associated with the (emoji) unicode character, ranging from `0` to `1`

- `pNeutral`

  relative neutrality component of the sentiment distribution for those tweets associated with the (emoji) unicode character, ranging from `0` to `1`

- `pPositive`

  relative positivity component of the sentiment distribution for those tweets associated with the (emoji) unicode character, ranging from `0` to `1`

- `score`

  resulting sentiment score of the (emoji) unicode character, ranging from `-1` to `+1`, calculated as the mean of the discrete sentiment distribution of `negative` (`-1`), `neutral` (`0`) and `positive` (`+1`)

- `sem`

  precalculated Standard Error Mean for further deriving the confidence interval, e.g. for 95%:
  `[score − 1.96 * sem, score + 1.96 * sem]`

The sum of `negative`, `neutral` and `positive` is `occurrences`.
The sum of `pNegative`, `pNeutral` and `pPositive` is 1.

## Usage

### CommonJS

```javascript
const emojiSentiment = require('emoji-sentiment');
```

### ES6/babel

```javascript
import emojiSentiment from 'emoji-sentiment';
```

## Install

`npm install emoji-sentiment`

## License

[MIT](https://github.com/dematerializer/emoji-sentiment/blob/master/LICENSE)

## Development

### Status

[![Travis](https://img.shields.io/travis/dematerializer/emoji-sentiment.svg?style=flat-square)](https://travis-ci.org/dematerializer/emoji-sentiment)
[![Codecov](https://img.shields.io/codecov/c/github/dematerializer/emoji-sentiment.svg?style=flat-square)](https://codecov.io/gh/dematerializer/emoji-sentiment)
