const jsdom = require('jsdom');

function parseWhoIs (input) {
    const { JSDOM } = jsdom;

    const { document } = new JSDOM(input).window;

    const rawWhoisInfo = document.querySelector('.df-block-raw .df-raw').textContent.split('For more')[0];

    return rawWhoisInfo;
}

module.exports = parseWhoIs;