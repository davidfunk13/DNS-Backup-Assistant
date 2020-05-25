const axios = require('axios');

const { parseViewDNS, parseSecurityTrails, parseMxToolbox, parseWhoIs } = require('./parsers');

const { WHOIS_API_BASE, VIEWDNS_API_BASE, MX_TOOLBOX_API_BASE, SECURITY_TRAILS_API_BASE } = require('./apiBaseUrls');

function makeRequests(url) {

    if (!url) {
        return console.log('no url passed');
    }

    axios.all([
        axios.get(WHOIS_API_BASE + url),
        axios.get(VIEWDNS_API_BASE + url),
        axios.get(MX_TOOLBOX_API_BASE + url),
        axios.get(SECURITY_TRAILS_API_BASE + url)
    ]).then((whoIs, viewDNS, mxToolbox, securityTrails) => {
        parseWhoIs(whoIs);
        parseViewDNS(viewDNS);
        parseMxToolbox(mxToolbox);
        parseSecurityTrails(securityTrails);
    })
}

module.exports = makeRequests;