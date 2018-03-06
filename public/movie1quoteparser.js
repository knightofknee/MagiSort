const importText = require('./sorcerersStoneScript.js')

//gives array of lines
let textLines = importText.split(/\r?\n/)

//takes out extra lines
let characterQuotesDirty = textLines.filter((line) => line.includes(':'))

//takes out stage directions
let characterQuotes = characterQuotesDirty.map((line) => {
  let cleanString = ''
  let isStageDirection = false
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '{') {
      isStageDirection = true}
    if (!isStageDirection) {
      cleanString = cleanString + line[i]}
    if (line[i] === '}') isStageDirection = false
  }
  return cleanString
})

let quoteObj = {}
let currentLine = []

for (let i = 0; i < characterQuotes.length; i++) {
  currentLine = characterQuotes[i].split(':')
  if (quoteObj[currentLine[0]]) quoteObj[currentLine[0]].push(currentLine[1])
    else quoteObj[currentLine[0]] = [currentLine[1]]
}

// for (let key in quoteObj) {
//   cons.log(key, quoteObj[key].length)
// }

//cons.log('parser:dddd', quoteObj)

// for (let i = 0; i < importText.length; i++) {

// }

module.exports = quoteObj
