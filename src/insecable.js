/**
 * Finds and replaces non-breaking space with the appropriate HTML entities in
 * a given HTML input.
 *
 * @param {string} html - HTML input that needs patching.
 * @param {(object|object[])} ruleset - Ruleset(s) used as a reference for patching.
 * @returns {string} - The patched  HTML.
 *
 */
function insecable(html, ruleset) {
	let patchedHtml = html;
	let rulesets;

	if (Array.isArray(ruleset)) {
		rulesets = [...ruleset];
	} else {
		rulesets = [ruleset];
	}

	rulesets.forEach(function applyRulesets(ruleset) {
		if (
			typeof html == 'string' &&
			typeof ruleset == 'object' &&
			ruleset &&
			Object.keys(ruleset).length > 0
		) {
			Object.keys(ruleset).forEach(function replace(replacementString) {
				patchedHtml = processReplacement(patchedHtml, ruleset, replacementString);
			});
		}
	});


	return patchedHtml;
}

/**
 * Processes replacements on the given html.
 *
 * @param {string} html - HTML text input.
 * @param {object} ruleset - Ruleset use as a reference for patching.
 * @param {string} replacementString - String used to patch search term.
 * @returns {string} - The patched HTML.
 */
function processReplacement(html, ruleset, replacementString) {
	let patchedHtml = html;
	const { leading, trailing, nested } = ruleset[replacementString];

	if (leading && Array.isArray(leading)) {
		leading.forEach(function processTerm(term) {
		if (typeof term == 'string') {
			patchedHtml = patchedHtml.replace(
			new RegExp(`\\s{1}${espaceStringRegex(term)}`, 'g'),
			function replacer(match) {
				return `${replacementString}${match.trim()}`;
			}
			);
		}
		});
	}

	if (trailing && Array.isArray(trailing)) {
		trailing.forEach(function processTerm(term) {
		if (typeof term == 'string') {
			patchedHtml = patchedHtml.replace(
			new RegExp(`${espaceStringRegex(term)}\\s{1}`, 'g'),
			function replacer(match) {
				return `${match.trim()}${replacementString}`;
			}
			);
		}
		});
	}

	if (nested && Array.isArray(nested)) {
		nested.forEach(function processTerm(term) {
		if (typeof term == 'string') {
			const espacedTerm = espaceStringRegex(term);
			patchedHtml = patchedHtml.replace(
			new RegExp(
				`${espacedTerm}(\\s{1}[^${espacedTerm}]*\\s{1})${espacedTerm}`,
				'g'
			),
			function replacer(match, group1) {
				return `${term}${replacementString}${group1.trim()}${replacementString}${term}`;
			}
			);
		}
		});
	}

	return patchedHtml;
}


/**
 * Escapes any character from a string that has a meaning in a regular expression.
 *
 * @param {string} string - String with potential subject(s) for escape (e.g. ?, $...).
 * @returns {string} - Escaped string.
 */
function espaceStringRegex(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

module.exports = { insecable };
