const punctuaction = {
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

module.exports = {punctuaction};
