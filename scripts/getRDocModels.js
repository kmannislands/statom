/* jshint esversion: 6 */
const fs = require('fs');

const curl = require('curlrequest'); // our curl wrapper
const jsonfile = require('jsonfile');
const cheerio = require("cheerio"); // here’s the core jquery API implementation
const _ = require("lodash");

const cachePath = "./cache/";

var dta = {
	"packages": {}
};

let totalPckgs = 0;
let pckgsLoaded = 0;
let totalFs = 0;
let totalFsLoaded = 0;

let functionsPArr = [];


function packageDef(id, contents) {
	this[id] = contents;
}

function loadF(spiderUrl, pckgName) {
		// define the structure of info to read off page using cheerio selectors
		let descSelector = "section:first-of-type p";
		let argsSelector = ".topic--arguments";

		let curlOps = {
			'url': spiderUrl
		};

		return new Promise(function(resolve, reject){
			curl.request(curlOps, function(err, stdout, meta) {
					// uncomment the next line to log curl request
					// console.log('%s %s', meta.cmd, meta.args.join(' '));
					if (err) resolve({});
					// load page html with cheerio
					var $ = cheerio.load(stdout);


					// collect the arguments for the function
					var args = [
					];

					$('.topic--arguments').find('dl').find('dt').each(function (index, elem) {
						let theseArgs = {
							name: $(this).html().trim(),
							description: $(this).next('dd').html().trim()
						};
						if(theseArgs) args.push(theseArgs);
					});

					if ($('.topic-header h1').html() !== null) {
						// console.log(args);
						resolve({
							name: $('.topic-header h1').html(),
							args: args
						});
					} else {
						resolve({});
					}
			});

		});

}

function loadPackage( spiderUrl, pckgName) {
		// define the structure of info to read off page using cheerio selectors
		let fSelector = "#filterableItems tr a";



		console.log(spiderUrl);



		return new Promise(function(resolve, reject){
			let depFunctions = [];
			let pckgs = {};

			let curlOps = {
	      'url': spiderUrl
	    };

			curl.request({ url: spiderUrl }, function(err, stdout, meta) {
				let version = JSON.parse(stdout).versions.slice(-1)[0].uri;
				console.log(version);
				curlOps.url = "https://www.rdocumentation.org" + version;

				curl.request(curlOps, function(err, stdout, meta) {
						// uncomment the next line to log curl request
						// console.log('%s %s', meta.cmd, meta.args.join(' '));
						if (err) reject(err);
						// load page html with cheerio
						var $ = cheerio.load(stdout);

						if($(fSelector).length){
							$(fSelector).each(function (i, elem) {
								let nextLink = $(elem).attr('href').split('//').join('/');

								nextLink = "https://www.rdocumentation.org" + nextLink;

								depFunctions.push(loadF(nextLink, pckgName));

							});
						}

						Promise.all(depFunctions).then(function(data) {
							// array of function objects?
							resolve(new packageDef(pckgName, { functions: data}));
						}).catch((reason)=>{
							console.log('unable to assemble functions');
						});

				});

			});


			});

}

function scrapeRDocsRecursive(spiderUrl) {
    // define the structure of info to read off page using cheerio selectors
    let packageSelector = ".maintained-package h4 a";

    let curlOps = {
      'url': spiderUrl
    };

		return new Promise(function(resolve, reject){
			curl.request(curlOps, function(err, stdout, meta) {
					// uncomment the next line to log curl request
					// console.log('%s %s', meta.cmd, meta.args.join(' '));

					if (err) resolve({});
					// load page html with cheerio
					var $ = cheerio.load(stdout);
					let pckgURIs = [];

					$(packageSelector).each(function (i, elem) {
						let nextLink = $(elem).attr('href');
						let pckgName = nextLink.split('/').slice(-1)[0];
						dta.packages = _.assign(dta.packages, new packageDef(pckgName, {functions:[]}));

						// TODO add api call to actually determine version appended here
						nextLink = "https://www.rdocumentation.org" + nextLink;

						// depPckg.push(loadPackage( nextLink, pckgName));
						pckgURIs.push({ name: pckgName, uri: nextLink });

						totalPckgs++;
					});

					resolve(pckgURIs);


			});
		});
}

// scrape the r stat package docs from the website, recursively
let rDocPromise = scrapeRDocsRecursive('https://www.rdocumentation.org/collaborators/name/R-core%20R-core@R-project.org');

rDocPromise.then(function (pckgs) {
	let packagePromises = [];
	pckgs.map((item) => {
		packagePromises.push(loadPackage( item.uri, item.name));
	});

	Promise.all(packagePromises).then((data) => {
		console.log(data);

		let fileOut = cachePath + "r_doc_model.json";
	  // write a jsonCache
	  jsonfile.writeFile(fileOut, data, function (err) {
	    if (!err) console.log("wrote file");
	  });
	});
}).catch((reason) => {
	console.log('rejected one');
});
