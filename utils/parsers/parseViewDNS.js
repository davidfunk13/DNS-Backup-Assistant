const jsdom = require('jsdom');

function parseViewDNS(input) {
    let viewDNSTextContent = '';

    const { JSDOM } = jsdom;

    const { document } = new JSDOM(input).window;

    const table = document.querySelector('table tbody td table');

    let rows = table.querySelectorAll('tbody tr');

    let heading = document.querySelectorAll('table tbody td font')[2]
        .textContent.split('Name')[0]
        .split('=', 1)[0];

    heading = heading + '\n' + '=============' + '\n \n';

    viewDNSTextContent += heading;

    rows.forEach(item => {
        let cellString = '';

        const cells = item.querySelectorAll('td');

        cells.forEach(cell => {
            cellString += cell.textContent + '    '
        })

        viewDNSTextContent += cellString + '\n';
    });

    return viewDNSTextContent;
}

module.exports = parseViewDNS;