const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const promptUser = () =>
    inquirer.prompt([
        { type: 'input',
          name: 'githubname',
          message: 'What is your gitHub name?'
        },
        { type: 'input',
          name: 'email',
          message: 'What is your email address?'
        },
        { type: 'input',
          name: 'project',
          message: 'What is your project\'s name?'
        },
        { type: 'input',
          name: 'description',
          message: 'Please write a short description of your project'
        },
        { type: 'input',
          name: 'license',
          message: 'What kind of license should your project have?'
        },
        { type: 'input',
          name: 'dependencies',
          message: 'What command should be run to install dependencies?'
        },
        { type: 'input',
          name: 'tests',
          message: 'What command should be used to run tests?'
        },
        { type: 'input',
          name: 'usage',
          message: 'What does the user need to know about using the repo?'
        },
        { type: 'input',
          name: 'contributing',
          message: 'What does the user need to know about contributing to the repo?'
        },
    ]);
// description to be used in answering question in console - This application will generate a README file which can be used to add or replace in one of your projects.
const generateHTML = (answers) =>
    `
# ${answers.project}

## Background

We are to develop a console node application using inquirer to take input from the user and generate a README.md file which can be used in a project.

## User Story

\`\`\`text
AS A developer
I WANT a README generator
SO THAT I can quickly create a professional README for a new project
\`\`\`

## Acceptance Criteria

    Create a command-line application that accepts user input.
    When a user is prompted for information about the application repository, a high-quality, professional README.md is generated with:
        The title of my project
        
        Sections entitled:
        Description
        Table of Contents
        Installation
        Usage
        License
        Contributing
        Tests
        Questions

    When a user enters the project title, it's displayed as the title of the README.
    When a user enters a description, installation instructions, usage information, contribution guidelines, and test instructions, this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests.
    When a user chooses a license for their application from a list of options, a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under.
    When a user enters their GitHub username, it's added to the section of the README entitled Questions, with a link to their GitHub profile.
    When a user enters their email address, it's added to the section of the README entitled Questions, with instructions on how to reach them with additional questions.
    When a user clicks on the links in the Table of Contents, they are taken to the corresponding section of the README.

## Table of Contents

*[Description](#description)

*[Installation](#installation)

*[Usage](#Usage)

*[License](#license)

*[Contributing](#contributing)

*[Tests](#installation)

*[Questions](#questions)

## Description

 ${answers.description}

## Installation

To install necessary dependencies, run the following command:

\`\`\`
${answers.dependencies}
\`\`\`

## Usage

${answers.usage}

## License

This project is licensed under the ${answers.license} licence.

## Contributing

${answers.contributing}

## Tests

To run the test suite use:

\`\`\`
${answers.tests}
\`\`\`

## Questions

Any questions or feedback please contact me at : ${answers.email}
    `;

promptUser()
.then((answers) => writeFileAsync('README.md', generateHTML(answers)))
.then(() => console.log('Successfully wrote to README.md'))
.catch((err) => console.error(err));