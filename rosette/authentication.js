"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Send ping to check for reachability of Rosette API"
});
parser.addArgument(["127fdcae96f5da5024c5742b5754f71c"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Rosette API alt-url", required: false});
var args = parser.parseArgs();

var api = new Api(args.key, args.url);
var endpoint = "ping";

api.rosette(endpoint, function(err, res){
    if(err){
        console.log(err)
    } else {
        console.log(JSON.stringify(res, null, 2));
    }
});
