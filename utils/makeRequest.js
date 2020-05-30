require('dotenv').config();

const axios = require('axios');

const { WHOIS_API_BASE, VIEWDNS_API_BASE, MX_TOOLBOX_API_BASE, SECURITY_TRAILS_API_BASE, SECURITY_TRAILS_API_SUBDOMAINS } = require('./apiBaseUrls');

async function makeRequests (url) {
    if (!url) {
        return console.log('no url passed');
    }

    //api key for securityTrails DONT USE A LOT I GET NO REQUESTS AT ALL.
    // SECURITY TRAILS IS ASSHOLE AND WILL NOT ALLOW SCRAPING I TRIED SO MANY THINGS...
    const config = { 'apikey': process.env.apiKey };

    //this is a fake set of subdomains because we have no requests to play with. toggle this off in production, toggle below on.
    const subdomains = ['www'];

    //Get all subdomains for this domain from securityTrails Api
    // const subdomains = await axios.get(SECURITY_TRAILS_API_BASE + url + SECURITY_TRAILS_API_SUBDOMAINS, { headers: config }).then(data => data.data.subdomains);

    //requests we will always make are already in the array.
    let requests = [
        axios.get(WHOIS_API_BASE + url),
        axios.get(VIEWDNS_API_BASE + url),
        axios.get(MX_TOOLBOX_API_BASE + url),
    ];

    //here we generate the rest based off the subdomains we have and push them into the requests array
    if (subdomains.length) {
        subdomains.map(subdomain => requests.push(axios.get(VIEWDNS_API_BASE + subdomain + "." + url)));
    }

    // make all requests
    return axios.all(requests).then(data => {
        return data;
    });
}

module.exports = makeRequests;