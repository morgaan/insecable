/**
 * Finds and replaces non-breaking space with the appropriate HTML entities in
 * a given HTML input.
 *
 * @param {string} html - HTML input that needs patching.
 * @param {RuleSet[]} rulesSet - Rules set use as a reference for patching.
 * @returns {string} - The patched  HTML.
 *
 */
function insecable(html, rulesSet) {
  let patchedHtml = html;

  if (
    html &&
    typeof html == "string" &&
    rulesSet &&
    Object.keys(rulesSet).length > 0
  ) {
    Object.keys(rulesSet).forEach(function processReplacement(
      replacementString
    ) {
      const { leading, trailing, nested } = rulesSet[replacementString];

      if (leading && Array.isArray(leading)) {
        leading.forEach(function processTerm(term) {
          if (typeof term == "string") {
            patchedHtml = patchedHtml.replace(
              new RegExp(`\\s${espaceStringRegex(term)}`, "g"),
              function replacer(match) {
                return `${replacementString}${match.trim()}`;
              }
            );
          }
        });
      }

      if (trailing && Array.isArray(trailing)) {
        trailing.forEach(function processTerm(term) {
          if (typeof term == "string") {
            patchedHtml = patchedHtml.replace(
              new RegExp(`${espaceStringRegex(term)}\\s`, "g"),
              function replacer(match) {
                return `${match.trim()}${replacementString}`;
              }
            );
          }
        });
      }

      if (nested && Array.isArray(nested)) {
        nested.forEach(function processTerm(term) {
          if (typeof term == "string") {
            const espacedTerm = espaceStringRegex(term);
            patchedHtml = patchedHtml.replace(
              new RegExp(
                `${espacedTerm}(\\s[^${espacedTerm}]*\\s)${espacedTerm}`,
                "g"
              ),
              function replacer(match, group1) {
                return `${term}${replacementString}${group1.trim()}${replacementString}${term}`;
              }
            );
          }
        });
      }
    });
  }

  return patchedHtml;
}

/**
 * Espaces any character from a string that has a meaning in a regular expression.
 *
 * @param {string} string - String with potential subject(s) for escape (e.g. ?, $...).
 * @returns {string} - Escaped string.
 */
function espaceStringRegex(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

module.exports = { insecable };
