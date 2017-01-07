# Emoji Sentiment

> Emoji sentiment data

- lightweight, easy to process JSON data
- based on the work of Kralj Novak, Petra; Smailović, Jasmina; Sluban, Borut and Mozetič, Igor, 2015, Emoji Sentiment Ranking 1.0, Slovenian language resource repository CLARIN.SI, [http://hdl.handle.net/11356/1048](http://hdl.handle.net/11356/1048).
- transformed the original CSV data to JSON, stripped out obsolete fields/rows and made accessible via a simple API

## API

Requiring/importing `emoji-sentiment` gives you the following API to work with:

- `emojiSentiment` (default)

### `emojiSentiment` (default)

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
    "position": 0.805100583,
    "negative": 3614,
    "neutral": 4163,
    "positive": 6845
  },
  ...
]
```

Properties of an emoji sentiment datum explained:

- `sequence`

  xxx

- `occurrences`

  xxx

- `position`

  xxx

- `negative`

  xxx

- `neutral`

  xxx

- `positive`

  xxx

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

### Contributing

TODO
