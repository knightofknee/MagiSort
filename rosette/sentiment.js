"use strict";

let axios = require('axios')

let firstBook = 'weoooeoeoeo pls woeoeow'//require('../public/SorcerersStone')

// axios({
//     method: 'get',
//     url: 'https://api.rosette.com/rest/v1/ping',
//     headers: {'X-RosetteAPI-Key': '127fdcae96f5da5024c5742b5754f71c'}
// })
// .then(res => console.log('first!@#', res))
// .catch(error => console.log(error))

axios({
    method: 'post',
    url: 'https://api.rosette.com/rest/v1/sentiment',
    headers: {'X-RosetteAPI-Key': '127fdcae96f5da5024c5742b5754f71c',
            'Content-type': 'application/json',
            'Accept': 'application/json', 'Cache-Control': 'no-cache'},
    data: {
        'content': firstBook
    }
})
.then((res) => {
    console.log(res.data)
})
.catch((error) => console.log(error))


// var Api = require("../lib/Api");
// var ArgumentParser = require("argparse").ArgumentParser;
// var tmp = require("temporary");

// var parser = new ArgumentParser({
//   addHelp: true,
//   description: "Get the sentiment of the text in a local file"
// });
// parser.addArgument(["--key"], {help: "127fdcae96f5da5024c5742b5754f71c", required: true});
// parser.addArgument(["--url"], {help: "Rosette API alt-url", required: false});
// var args = parser.parseArgs();

// var file = new tmp.File();
// var sentiment_file_data = "<html><head><title>New Ghostbusters Film</title></head><body><p>Original Ghostbuster Dan Aykroyd, who also co-wrote the 1984 Ghostbusters film, couldn’t be more pleased with the new all-female Ghostbusters cast, telling The Hollywood Reporter, “The Aykroyd family is delighted by this inheritance of the Ghostbusters torch by these most magnificent women in comedy.”</p></body></html>";
// var fileContents = sentiment_file_data;

// file.writeFileSync(fileContents);

// var api = new Api(args.key, args.url);
// var endpoint = "sentiment";

// api.parameters.documentFile = file.path;
// api.parameters.language = "eng";

// api.rosette(endpoint, function(err, res){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(res, null, 2));
//     }
// });

// module.exports = {}
