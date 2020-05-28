require('dotenv').config();

const axios = require('axios');

const { parseViewDNS, parseSecurityTrails, parseMxToolbox, parseWhoIs } = require('./parsers');

const { WHOIS_API_BASE, VIEWDNS_API_BASE, MX_TOOLBOX_API_BASE, SECURITY_TRAILS_API_BASE, SECURITY_TRAILS_API_SUBDOMAINS } = require('./apiBaseUrls');

async function makeRequests(url) {
    if (!url) {
        return console.log('no url passed');
    }

    //api key for securityTrails DONT USE A LOT I GET NO REQUESTS AT ALL.
    // SECURITY TRAILS IS ASSHOLE AND WILL NOT ALLOW SCRAPING I TRIED SO MANY THINGS...

    const config = { 'apikey': process.env.apiKey };

    //Get all subdomains for this domain from securityTrails Api
    const subdomains = await axios.get(SECURITY_TRAILS_API_BASE + url + SECURITY_TRAILS_API_SUBDOMAINS, { headers: config }).then(data => data.data.subdomains);

    //requests we will always make are already in the array.
    let requests = [
        axios.get(WHOIS_API_BASE + url),
        axios.get(VIEWDNS_API_BASE + url),
        // axios.get(MX_TOOLBOX_API_BASE + url),
    ];
    
    //here we generate the rest based off the subdomains we have and push them into the requests array
    if(subdomains.length){
         subdomains.map(subdomain => requests.push(axios.get(VIEWDNS_API_BASE + subdomain + "." + url)));
    }

    console.log(requests.length)
    // make all requests
    return axios.all(requests).then(data => {

        //array of all results
        let results = data.map(item => item);

        //send the ones we always make to their restpective parsers, since we know their location in the array.
        const whoIsBackup = parseWhoIs(results[0].data);
        const viewDNSBackup = parseViewDNS(results[1].data);
        // const mxToolboxResults = parseMxToolbox(results[2].data);
        
        //IF > num needs to change when mxToolBox gets added to + 1
        if(results.length > 2){
            //array of the subdomain request results. we make 3 requests every single time
            //and know their locations in the array, so we take every request > index 2.
            let subDomainResults = results.filter((item, i) => i > 2);
            
            //now we send them off to the viewDNS parser
//MAYBE EVEN FORMAT THESE AS IF WE GOT THEM FROM SECURITY TRAILS SO YOU DONT HAVE ANXIETY ATTACKS WHEN THE FILE PRINTS.

            subDomainResults = subDomainResults.map(subdomain => parseViewDNS(subdomain.data));
            
            //set results equal to all that results already has, and the content inside the subDomain results spread;
            results = [...results, ...subDomainResults];
        }

        
        return {
            whoIsBackup,
            viewDNSBackup,
            ...results,
        };
    });
}

module.exports = makeRequests;