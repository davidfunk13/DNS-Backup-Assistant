const inquirer = require('inquirer');

const Question = require('./utils/questions');

const { parseWhoIs, parseMxToolbox, parseViewDNS } = require('./utils/parsers');

const makeRequests = require('./utils/makeRequest');

const writeTextFile = require('./utils/writeTextFile');

const askForUrl = new Question('input', 'requestUrl', 'Please enter url for DNS record retreival:');

console.log('Welcome to my DNS Backup assistant');

inquirer.prompt([askForUrl])
    .then(answer => {
        const { requestUrl } = answer;
        makeRequests(requestUrl).then(data => {
            let results = [];
            //shows all incoming urls that need to be parsed.
            data.map(item => console.log(item.config.url));

            const whoIs = parseWhoIs(data[0].data);
            const viewDNS = parseViewDNS(data[1].data);
            const mxToolbox = parseMxToolbox(data[2].data);
            
            //the rest of the items past index 2 will always be subdomains. These get passed to the viewDNS parser since 
            // SECURITY TRAIL IS ASSHOLE AND WONT LET ME SCRAPE without a headless browser.

            let subdomains = data.filter((item, i) => i > 2 );     
            
            subdomains = subdomains.map(subdomain => parseViewDNS(subdomain.data));

             results = [whoIs, viewDNS, mxToolbox, ...subdomains];
            writeTextFile(requestUrl, results);
        });

    });