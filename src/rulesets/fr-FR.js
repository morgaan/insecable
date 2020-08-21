const punctuation = {
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
// Source: http://unicode.org/udhr/n/notes_fra.html

module.exports = {punctuation};
