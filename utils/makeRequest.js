const axios = require('axios');

const { parseViewDNS, parseSecurityTrails, parseMxToolbox, parseWhoIs } = require('./parsers');

const { WHOIS_API_BASE, VIEWDNS_API_BASE, MX_TOOLBOX_API_BASE, SECURITY_TRAILS_API_BASE } = require('./apiBaseUrls');

function makeRequests(url) {

    if (!url) {
        return console.log('no url passed');
    }

    return axios.all([
        axios.get(WHOIS_API_BASE + url),
        axios.get(VIEWDNS_API_BASE + url),
        axios.get(MX_TOOLBOX_API_BASE + url),
        axios.get(SECURITY_TRAILS_API_BASE + url)
    ])
        .then(axios.spread((whoIs, viewDNS, mxToolbox, securityTrails) => {
            const whoIsBackup = parseWhoIs(whoIs.data);
            const viewDNSBackup = parseViewDNS(viewDNS.data);
            // parseMxToolbox(mxToolbox.data);
            // parseSecurityTrails(securityTrails.data);
            return { whoIsBackup, viewDNSBackup };
        }));
}

module.exports = makeRequests;