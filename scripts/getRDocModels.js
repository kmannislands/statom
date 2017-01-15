/* jshint esversion: 6 */
const fs = require('fs');

const curl = require('curlrequest'); // our curl wrapper
const jsonfile = require('jsonfile');
const cheerio = require("cheerio"); // here’s the core jquery API implementation

const cachePath = "./models/r_package_full.json";

var dta = {
	"packages": []
};

let totalPckgs = 0;
let pckgsLoaded = 0;
let totalFs = 0;
let totalFsLoaded = 0;

function reCheck(check, interval, cb) {
	setTimeout(function(){
		if(!check()) reCheck(check, interval, cb);
	}, interval);
}

function loadF(instance, spiderUrl, pckgName) {
    // define the structure of info to read off page using cheerio selectors
    let descSelector = "section:first-of-type p";
		let argsSelector = ".topic--arguments dl";

    let curlOps = {
      'url': spiderUrl
    };

		// console.log('firing fn '+ spiderUrl);

    instance.request(curlOps, function(err, stdout, meta) {
        // uncomment the next line to log curl request
        // console.log('%s %s', meta.cmd, meta.args.join(' '));

        // load page html with cheerio
        var $ = cheerio.load(stdout);


				// collect the arguments for the function
				var args = [
				];

				$(argsSelector).find('dt').each(function (index, elem) {
					let theseArgs = {
						name: $(this).html().trim(),
						description: $(this).next('dd').html().trim()
					};
					if(theseArgs) args.push(theseArgs);
				});

				console.log($('.topic--title').next('p'));

				// check if all packages are loaded until done
				reCheck(
					// test if done
					function(){
						return (totalsFsLoaded = totalFs);
					},
					// interval to recheck
					60,
					// callback
					function(){
						pckgsLoaded = totalPckgs;
					}
				);


    });
}

function loadPackage(instance, spiderUrl, pckgName) {
    // define the structure of info to read off page using cheerio selectors
    let fSelector = "#filterableItems tr a";

		console.log(spiderUrl);

    let curlOps = {
      'url': spiderUrl
    };

    instance.request(curlOps, function(err, stdout, meta) {
        // uncomment the next line to log curl request
        // console.log('%s %s', meta.cmd, meta.args.join(' '));

        // load page html with cheerio
        var $ = cheerio.load(stdout);

				if($(fSelector).length){
					$(fSelector).each(function (i, elem) {
	          let nextLink = $(elem).attr('href').split('//').join('/');

						nextLink = "https://www.rdocumentation.org" + nextLink;

	          loadF(instance, nextLink, pckgName);

	        });
				}



				// check if all packages are loaded until done
				reCheck(
					// test if done
					function(){
						return (totalsFsLoaded = totalFs);
					},
					// interval to recheck
					60,
					// callback
					function(){
						pckgsLoaded = totalPckgs;
					}
				);


    });
}

function scrapeRDocsRecursive(instance, spiderUrl, cb) {
    // define the structure of info to read off page using cheerio selectors
    let packageSelector = ".maintained-package h4 a";

    let curlOps = {
      'url': spiderUrl
    };

    instance.request(curlOps, function(err, stdout, meta) {
        // uncomment the next line to log curl request
        // console.log('%s %s', meta.cmd, meta.args.join(' '));

        // totalRequests++;

        // load page html with cheerio
        var $ = cheerio.load(stdout);

				$(packageSelector).each(function (i, elem) {
          let nextLink = $(elem).attr('href');
					let pckgName = nextLink.split('/').slice(-1)[0];

					dta.packages.push({
						pckgName: {}
					});

					nextLink = "https://www.rdocumentation.org" + nextLink + "/versions/3.3.2/";

          loadPackage(instance, nextLink, pckgName);

					totalPckgs++;
        });

				// check if all packages are loaded until done
				reCheck(
					// test if done
					function(){
						return (pckgsLoaded = totalPckgs);
					},
					// interval to recheck
					100,
					// callback
					function(cb){
						cb(dta);
					}
				);


    });
}

// scrape the r stat package docs from the website, recursively
scrapeRDocsRecursive(curl, 'https://www.rdocumentation.org/collaborators/name/R-core%20R-core@R-project.org', function (dta) {
  console.log(dta);

  // write a jsonCache
  jsonfile.writeFile(cachePath, dta, function (err) {
    if (!err) console.log("wrote file");
  });
});
