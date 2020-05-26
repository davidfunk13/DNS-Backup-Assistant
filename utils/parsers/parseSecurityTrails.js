const jsdom = require('jsdom');
const axios = require('axios');
const { SECURITY_TRAILS_API_SUBDOMAINS } = require('../apiBaseUrls');

function parseSecurityTrails(input) {
    let securityTrailsTextContent = '';

    console.log('assholes')

    const { JSDOM } = jsdom;

    const { document } = new JSDOM(input).window;

    const table = document.querySelectorAll('table tbody')[1];

    console.log(table);

    const rows = table.querySelectorAll('tr');
    
    const urls = [];

    rows.forEach(item => {
        const url = item.querySelectorAll('td')[1].textContent;
        urls.push(url);
    });




    return table.textContent;
}

module.exports = parseSecurityTrails;