const inquirer = require('inquirer');

const Question = require('./utils/questions');

const makeRequests = require('./utils/makeRequest');

const askForUrl = new Question('input', 'requestUrl', 'Please enter url for DNS record retreival:');

console.log('Welcome to my DNS Backup assistant');

const startPrompt = inquirer.prompt([askForUrl]);

startPrompt.then(answer => {
    const { requestUrl } = answer;
    
    makeRequests(requestUrl);
});