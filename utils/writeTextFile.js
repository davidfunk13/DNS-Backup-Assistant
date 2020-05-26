const os = require('os');

const fs = require('fs');

const getTimeStamp = require('./getTimeStamp');

function writeTextFile(url, data) {
    const dir = os.homedir() + '/Desktop';

    const timeStamp = getTimeStamp();

    let textContent = '';

    for (let key in data) {
        textContent += `---${key}---` + '\n \n' + data[key] + '\n \n \n';
    }

    fs.writeFileSync(`${dir}/DNS_BACKUP_${url}_${timeStamp}.txt`, textContent, { flag: 'w' }, function (err) {
        if (err) {
            console.log('Error writing file.');
            return console.error(err);
        }
    });

}

module.exports = writeTextFile;