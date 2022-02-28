/**
 * strip the prefix character ch
 * @param {String} s the string want to be striped
 * @param {String} ch one character want to be removed from s
 */
function trimPrefix(s, ch) {
  if (ch.length !== 1) throw 'ch must be a character';
  let i = 0;
  while (s[i] === ch) i++;
  return s.slice(i);
}

export { trimPrefix };
