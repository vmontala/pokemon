const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

// Formats a list of strings to a user-friendly string (`['a', 'b', 'c']` -> `a, b, and c`)
const conjunction = (list) => formatter.format(list)

export default conjunction
