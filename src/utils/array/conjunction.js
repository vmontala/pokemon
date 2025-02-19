const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

const conjunction = (list) => formatter.format(list)

export default conjunction
