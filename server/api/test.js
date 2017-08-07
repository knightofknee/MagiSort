const router = require('express').Router()
module.exports = router

const {HarryResults, RonResults, HermioneResults, HagridResults} = require('../../public/RosetteResultsMovieOne')
let axios = require('axios')
let HarryScore = HarryResults.document.confidence
if (HarryResults.document.label === "neg") HarryScore = -HarryScore

let HagridScore = HagridResults.document.confidence
if (HagridResults.document.label === "neg") HagridScore = -HagridScore

let HermioneScore = HermioneResults.document.confidence
if (HermioneResults.document.label === "neg") HermioneScore = -HermioneScore
let RonScore = RonResults.document.confidence
if (RonResults.document.label === "neg") RonScore = -RonScore

let scoreArray=[HarryScore, HagridScore, HermioneScore, RonScore]
let nameArray= ['Harry', 'Hagrid', 'Hermione', 'Ron']

//for adding more rosette results from evaluating the book or movie
//let quoteObj = require('../../public/movie1quoteparser')
//let HagridQuotes = quoteObj['Hagrid'].join(' ')

router.post('/', (req, res, next) => {
  console.log('body yo', req.body.textSent)
  axios({
    method: 'post',
    url: 'https://api.rosette.com/rest/v1/sentiment',
    headers: {'X-RosetteAPI-Key': process.env.ROSETTE_KEY,
            'Content-type': 'application/json',
            'Accept': 'application/json', 'Cache-Control': 'no-cache'},
    data: {
        'content': req.body.textSent
    }
})
  .then(resp => resp.data)
  .then(results => {
    //compare logic here, return array of values
    if (results.document.label === 'neu') return 'muggle'
    let score = results.document.confidence
    if (results.document.label === "neg") score = -score

      let diffArray = scoreArray.map((wizardScore) => {
        return Math.abs(score - wizardScore)
      })
      let bestScoreIndex = 0
    for (let i = 0; i < diffArray.length; i++) {
      if (diffArray[i] < diffArray[bestScoreIndex]) bestScoreIndex = i
    }
      return nameArray[bestScoreIndex]
  })
  .then(match => res.send(match))
  .catch(err => console.log(err))

})
//   let p2 = axios({
//     method: 'post',
//     url: 'https://api.rosette.com/rest/v1/sentiment',
//     headers: {'X-RosetteAPI-Key': '127fdcae96f5da5024c5742b5754f71c',
//             'Content-type': 'application/json',
//             'Accept': 'application/json', 'Cache-Control': 'no-cache'},
//     data: {
//         'content': firstBook[1]
//     }
// })
//   let p3 = axios({
//     method: 'post',
//     url: 'https://api.rosette.com/rest/v1/sentiment',
//     headers: {'X-RosetteAPI-Key': '127fdcae96f5da5024c5742b5754f71c',
//             'Content-type': 'application/json',
//             'Accept': 'application/json', 'Cache-Control': 'no-cache'},
//     data: {
//         'content': firstBook[2]
//     }
// })
// .then((response) => {
//     res.json(response.data)
// })
// .catch((error) => console.log(error))
// })

// Promise.all([p1])
// .then((lines) => {
//   //let aggregate = Object.assign({}, lines[0].data, lines[1].data, lines[2].data)
//   res.send(lines[0].data)
// })
// .catch((err) => console.log(err))

//   res.json(movie1Results.HarryResults)


// })
// wholeBook[2].data


//get rid of old calls, make sure only parser loads
