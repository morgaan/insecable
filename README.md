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


