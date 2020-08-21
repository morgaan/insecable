const {insecable} = require('../insecable');

describe('Taken the french ruleset', () => {
	test('The punctuation ruleset should rules as expected and render text with appropriate replacements', () => {
		const {punctuation: ruleset} = require('./fr-FR');
		const input = `
			Ça alors !
			Je ne l'avais jamais vu ; ces espaces me semblent bizarres.
			Exemple : le deux-points qui se dit parfois double point.
			« Bonjour ! »
			Il ne faut pas confondre le tiret d'incise et le trait d'union – qui est nettement plus court – même si l'erreur est fréquente.
		`;

		const expected = `
			Ça alors&#8239;!
			Je ne l'avais jamais vu&#8239;; ces espaces me semblent bizarres.
			Exemple&#160;: le deux-points qui se dit parfois double point.
			«&#160;Bonjour&#8239;!&#160;»
			Il ne faut pas confondre le tiret d'incise et le trait d'union –&#160;qui est nettement plus court&#160;– même si l'erreur est fréquente.
		`;

		expect(insecable(input, ruleset)).toBe(expected);
	});
});

