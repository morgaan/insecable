# Insecable

[![Build Status](https://travis-ci.com/morgaan/insecable.svg?branch=master)](https://travis-ci.com/morgaan/insecable)

Insecable is a module that aims at adding non-breaking spaces where relevant in
an HTML string.

Its name comes from the french name "Espace insécable" that means non-breaking
space.

## Installation

To add insecable to your project run

```bash
npm install --save insecable
```

## Usage

### Ruleset

The patching operation is driven by one or more set of rules.
There are so far 3 types of possible replacements:

- `leading` that aims at replacing a leading space (e.g `<space>!`, `<space>»` )
- `trailing` that aims at replacing a trailing space (e.g `,<space>` `«<space>`)
- `nested` that aims at replacing the space after the opening symbol and the space before the closing symbol (e.g `–<space>some text<space>–`)

### Example ruleset: French punctuation marks

```javascript
const {insecable} = require('insecable');

// French punctuation marks ruleset Cherry picked from
// https://github.com/morgaan/insecable/blob/master/src/rulesets/fr-FR.js.
const ruleset = {
	'&#8239;': {
		leading: [
			'!', ';', '?'
		]
	},
	'&#160;': {
		leading: [
			'»', ':'
		],
		trailing: [
			'«'
		],
		nested: [
			'–'
		]
	}
};

const input = `
		Ça alors !
		Je ne l'avais jamais vu ; ces espaces me semblent bizarres.
		Exemple : le deux-points qui se dit parfois double point.
		« Bonjour ! »
		Il ne faut pas confondre le tiret d'incise et le trait d'union – qui est nettement plus court – même si l'erreur est fréquente.
	`;

const patchedInput = insecable(input, ruleset);

// patchedInput should now be equal to:
//
// Ça alors&#8239;!
// Je ne l'avais jamais vu&#8239;; ces espaces me semblent bizarres.
// Exemple&#160;: le deux-points qui se dit parfois double point.
// «&#160;Bonjour&#8239;!&#160;»
// Il ne faut pas confondre le tiret d'incise et le trait d'union –&#160;qui est nettement plus court&#160;– même si l'erreur est fréquente.
```

## Contributing to insecable

Contributions are always welcome. Before contributing please [search the issue
tracker](https://github.com/morgaan/insecable/issues); your issue may have
already been discussed or fixed in `master`. To contribute,
[clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github)
, commit your changes, & [send a pull
request](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github).

### Contribute rulesets

This module is architectured in a way that
[rulesets](https://github.com/morgaan/insecable/tree/master/src/rulesets) can be
extended and/or contributed.

Please make sure to always:
- Check the `./src/rulesets/fr-FR.js`, `./src/rulesets/fr-FR.test.js` and
  `./src/rulesets/index.js` to get a grip on how this all work together.
- Give your source as comment in the ruleset's file.
- Provide test file with 100 percent code coverage.

So far this repository only contains rules for the French language, and more
precisely for the french punctuation marks.
There is much more that can be added, at least for the french language according
to the book: [Lexique des règles typographiques en usage à l'Imprimerie
nationale, 5th edition, Paris, 2002. ISBN
2-7433-0482-0.](https://fr.wikipedia.org/wiki/Lexique_des_r%C3%A8gles_typographiques_en_usage_%C3%A0_l%27Imprimerie_nationale),
for instance for dates, measure/military units... This may come in future
releases, but feel free to contribute this may then be quicker ;).

### Coding Guidelines

In addition to the following guidelines, please follow the conventions already
established in the code.

- **Spacing**:<br>
  Use one tab for indentation. No spaces.

- **Naming**:<br>
  Keep variable & method names concise & descriptive.<br>
  Variable names `index`, `array`, & `error` are preferable to
  `i`, `arr`, & `e`.

- **Quotes**:<br>
  Single-quoted strings are preferred to double-quoted strings; however,
  please use a double-quoted string if the value contains a single-quote
  character to avoid unnecessary escaping.

- **Comments**:<br>
  Please use concise comments to annotate significant additions, &
  [JSDoc-style](https://jsdoc.app/index.html) comments for functions.
