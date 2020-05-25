const inquirer = require('inquirer');

const { PROMPT_1 } = require('./utils/questions');

const { WHOIS_API_BASE } = require('./utils/apiBaseUrls');

inquirer.prompt([
PROMPT_1
]).then(answers => console.log(answers));
// const express = require('express');

// const app = express();

// const PORT = 3001;

// app.listen(PORT, (err) => {

//     if (err) {
//         return console.log(err);
//     }
//     console.log(`App listening on port ${PORT}`)
// })