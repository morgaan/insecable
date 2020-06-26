const {insecable} = require('../src/insecable');

// const html = `
// 	Ça alors !
// 	Je ne l'avais jamais vu ; ces espaces me semblent bizarres.
// 	Exemple : le deux-points qui se dit parfois double point.
// 	« Bonjour ! »
// 	Il ne faut pas confondre le tiret d'incise et le trait d'union – qui est nettement plus court – même si l'erreur est fréquente.
// `;

// const expectedHtml = `
// 	Ça alors&#8239;!
// 	Je ne l'avais jamais vu&#8239;; ces espaces me semblent bizarres.
// 	Exemple&#160;: le deux-points qui se dit parfois double point.
// 	«&#160;Bonjour&#8239;!&#160;»
// 	Il ne faut pas confondre le tiret d'incise et le trait d'union –&#160;qui est nettement plus court&#160;– même si l'erreur est fréquente.
// `;

// const rulesSet = {
// 	'&#8239;': {
// 		leading: [
// 			'!', ';', '?'
// 		]
// 	},
// 	'&#160;': {
// 		leading: [
// 			'»', ':'
// 		],
// 		trailing: [
// 			'«'
// 		],
// 		nested: [
// 			'–'
// 		]
// 	}
// };

describe('Taken a valid rules set', () => {
	describe('containing one or more symbols to be preceeded by a non-breaking space', () => {
		let rulesSet, input, expected;

		it('should leave the input untouched if no match (i.e. no replacements needed)', () => {
			rulesSet = {'&#8239;': {leading: ['!']}};
			input = '! '; // here the space is trailing
			expect(insecable(input, rulesSet)).toBe(input);
		});

		it('should replace each leading space, by the given replacement', () => {
			rulesSet = {'&#8239;': {leading: ['!']}};
			input = ' !';
			expected = '&#8239;!';
			expect(insecable(input, rulesSet)).toBe(expected);

			rulesSet = {'&#8239;': {leading: ['!', ';']}};
			input = ' ! ;';
			expected = '&#8239;!&#8239;;';
			expect(insecable(input, rulesSet)).toBe(expected);
		});
	});

	describe('containing one or more symbols to be followed by a non-breaking space', () => {
		let rulesSet, input, expected;

		it('should leave the input untouched if no match (i.e. no replacements needed)', () => {
			rulesSet = {'&#160;': {trailing: ['!']}};
			input = ' !'; // here the space is leading
			expect(insecable(input, rulesSet)).toBe(input);
		});

		it('should replace each trailing space, by the given replacement', () => {
			rulesSet = {'&#160;': {trailing: ['!']}};
			input = '! ';
			expected = '!&#160;';
			expect(insecable(input, rulesSet)).toBe(expected);

			rulesSet = {'&#160;': {trailing: ['!', ';']}};
			input = '! ; ';
			expected = '!&#160;;&#160;';
			expect(insecable(input, rulesSet)).toBe(expected);
		});
	});

	describe('containing one or more symbol pairs that nest 2 non-breaking spaces', () => {
		let rulesSet, input, expected;

		it('should leave the input untouched if no match (i.e. no replacements needed)', () => {
			rulesSet = {'&#160;': {nested: ['–']}};
			input = ' !'; // here the space is leading
			expect(insecable(input, rulesSet)).toBe(input);
		});

		it('should replace each nested space, by the given replacement', () => {
			rulesSet = {'&#160;': {nested: ['–']}};
			input = '– Ceci est un test –';
			expected = '–&#160;Ceci est un test&#160;–';
			expect(insecable(input, rulesSet)).toBe(expected);

			rulesSet = {'&#160;': {nested: ['–', '/']}};
			input = '– Ceci est un test –/ Ceci est encore un test /';
			expected =
				'–&#160;Ceci est un test&#160;–/&#160;Ceci est encore un test&#160;/';
			expect(insecable(input, rulesSet)).toBe(expected);
		});
	});
});
