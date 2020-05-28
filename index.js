const inquirer = require('inquirer');

const Question = require('./utils/questions');

const makeRequests = require('./utils/makeRequest');

const writeTextFile = require('./utils/writeTextFile');

const askForUrl = new Question('input', 'requestUrl', 'Please enter url for DNS record retreival:');

console.log('Welcome to my DNS Backup assistant');

inquirer.prompt([askForUrl])
    .then(answer => {
        const { requestUrl } = answer;

        console.log('fuckshit')
        makeRequests(requestUrl).then(data => {

            writeTextFile(requestUrl, data);
        });

    });