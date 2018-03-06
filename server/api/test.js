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

let scoreArray = [HarryScore, HagridScore, HermioneScore, RonScore]
let nameArray = [['Harry, you are a real son-of-a-bitch, stop brooding. Voldy is supposed to be the dark one', 'https://i.kinja-img.com/gawker-media/image/upload/s--hHy9Nxd0--/c_scale,fl_progressive,q_80,w_800/gabc4ap495lgveng4gag.jpg'], ['Hagrid, you are our rock. Or more like, a boulder of positivity', 'https://s-media-cache-ak0.pinimg.com/originals/eb/af/ec/ebafecac73151e5c53694808c9a14ce0.jpg'], ['Your eloquent writing most resembles that of the great scholar Hermione. This means you are a tad negative, but not as bad as brooding Harry. Some call it being realistic.', 'https://s-media-cache-ak0.pinimg.com/564x/f9/29/e1/f929e11325ff4c8f666ad4e089102fcc.jpg'], [`You scored a RON! You have a healthy diet of optimism and syrup sandwiches. You aren't quite as positive as Hagrid, but few are.`, 'https://qph.ec.quoracdn.net/main-qimg-1944b955a553b9124666349100d0a8aa-c']]

//for adding more rosette results from evaluating the book or movie
//let quoteObj = require('../../public/movie1quoteparser')
//let HagridQuotes = quoteObj['Hagrid'].join(' ')

router.post('/', (req, res, next) => {
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
    if (results.document.label === 'neu') return ['It appears you are a muggle, or a master of Occlumency. The question goes, are you a good witch or a bad witch? No room for neutrality there.', 'https://vignette2.wikia.nocookie.net/harrypotter/images/8/87/DursleyFamily.jpg/revision/latest?cb=20170310050024']
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
  .catch(next)

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
// .catch((error) => cons.log(error))
// })

// Promise.all([p1])
// .then((lines) => {
//   //let aggregate = Object.assign({}, lines[0].data, lines[1].data, lines[2].data)
//   res.send(lines[0].data)
// })
// .catch((err) => cons.log(err))

//   res.json(movie1Results.HarryResults)


// })
// wholeBook[2].data


//get rid of old calls, make sure only parser loads
