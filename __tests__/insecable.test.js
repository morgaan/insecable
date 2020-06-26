const {insecable} = require('../src/insecable');

describe('Taken a single valid ruleset', () => {
	describe('containing one or more symbols to be preceeded by a non-breaking space', () => {
		let ruleset, input, expected;

		it('should leave the input untouched if no match (i.e. no replacements needed)', () => {
			ruleset = {'&#8239;': {leading: ['!']}};
			input = '! '; // here the space is trailing
			expect(insecable(input, ruleset)).toBe(input);
		});

		it('should replace each leading space, by the given replacement', () => {
			ruleset = {'&#8239;': {leading: ['!']}};
			input = ' !';
			expected = '&#8239;!';
			expect(insecable(input, ruleset)).toBe(expected);

			ruleset = {'&#8239;': {leading: ['!', ';']}};
			input = ' ! ;';
			expected = '&#8239;!&#8239;;';
			expect(insecable(input, ruleset)).toBe(expected);
		});
	});

	describe('containing one or more symbols to be followed by a non-breaking space', () => {
		let ruleset, input, expected;

		it('should leave the input untouched if no match (i.e. no replacements needed)', () => {
			ruleset = {'&#160;': {trailing: ['!']}};
			input = ' !'; // here the space is leading
			expect(insecable(input, ruleset)).toBe(input);
		});

		it('should replace each trailing space, by the given replacement', () => {
			ruleset = {'&#160;': {trailing: ['!']}};
			input = '! ';
			expected = '!&#160;';
			expect(insecable(input, ruleset)).toBe(expected);

			ruleset = {'&#160;': {trailing: ['!', ';']}};
			input = '! ; ';
			expected = '!&#160;;&#160;';
			expect(insecable(input, ruleset)).toBe(expected);
		});
	});

	describe('containing one or more symbol pairs that nest 2 non-breaking spaces', () => {
		let ruleset, input, expected;

		it('should leave the input untouched if no match (i.e. no replacements needed)', () => {
			ruleset = {'&#160;': {nested: ['–']}};
			input = ' !'; // here the space is leading
			expect(insecable(input, ruleset)).toBe(input);
		});

		it('should replace each nested space, by the given replacement', () => {
			ruleset = {'&#160;': {nested: ['–']}};
			input = '– Ceci est un test –';
			expected = '–&#160;Ceci est un test&#160;–';
			expect(insecable(input, ruleset)).toBe(expected);

			ruleset = {'&#160;': {nested: ['–', '/']}};
			input = '– Ceci est un test –/ Ceci est encore un test /';
			expected =
				'–&#160;Ceci est un test&#160;–/&#160;Ceci est encore un test&#160;/';
			expect(insecable(input, ruleset)).toBe(expected);
		});
	});
});

describe('Error-safe tests', () => {
	describe('called with wrong types', () => {
		let ruleset, input, expected;

		it('should returns input if input is not a string', () => {
			ruleset = {'&#160;': {nested: ['–']}};
			input = undefined;
			expect(insecable(input, ruleset)).toBe(input);
			input = null;
			expect(insecable(input, ruleset)).toBe(input);
			input = 42;
			expect(insecable(input, ruleset)).toBe(input);
			input = [];
			expect(insecable(input, ruleset)).toBe(input);
			input = {};
			expect(insecable(input, ruleset)).toBe(input);
			input = function() { true };
			expect(insecable(input, ruleset)).toBe(input);
		});

		it('should returns input if ruleset is not an object and falsy  value', () => {
			ruleset = undefined;
			input = 'test';
			expect(insecable(input, ruleset)).toBe(input);
			ruleset = null;
			input = 'test';
			expect(insecable(input, ruleset)).toBe(input);
			ruleset = 0;
			input = 'test';
			expect(insecable(input, ruleset)).toBe(input);
			ruleset = false;
			input = 'test';
			expect(insecable(input, ruleset)).toBe(input);
		});

		it('should returns input if ruleset has no rules', () => {
			ruleset = {};
			input = 'test';
			expect(insecable(input, ruleset)).toBe(input);
		});

		it('should returns input if rule\'s term is not a string', () => {
			input = 'test';
			ruleset = {'&#160;': {leading: [42]}};
			expect(insecable(input, ruleset)).toBe(input);
			ruleset = {'&#160;': {trailing: [42]}};
			expect(insecable(input, ruleset)).toBe(input);
			ruleset = {'&#160;': {nested: [42]}};
			expect(insecable(input, ruleset)).toBe(input);
		});

		it('should returns input if rule is not an array', () => {
			input = 'test';
			ruleset = {'&#160;': {nested: '–'}};
			expect(insecable(input, ruleset)).toBe(input);
		});
	});
});

describe('Taken multiple valid rulesets', () => {
	test('output should have applied replacements ruled by the multiple rulesets', () => {
			const rulesets = [
				{'&#8239;': {leading: ['!', '?']}},
				{'&#160;': {trailing: [',']}},
				{'&#160;': {nested: ['–']}}
			];

			const input = ' ! , ? blah blah – Ceci est un test –';
			const expected = '&#8239;! ,&#8239;? blah blah –&#160;Ceci est un test&#160;–';
			expect(insecable(input, rulesets)).toBe(expected);
	});
});
