# orange-hrm-test-project
## JS automation tests using WDIO

This repository was created to functional test automation of [orange hrm project](https://opensource-demo.orangehrmlive.com/).

Tecnologies used:
- [WebDriver.io](https://webdriver.io)

## Setup
1. Clone this repository
2. Install the dependencies of this project with `npm install`.
3. Rename example.env file to .env and configure environment variables

## Environment variables
`TEST_ENVIRONMENT` - env on which tests will be executed (possible options: dev, test, prod)


## Running test suite

To run our test suite:
1. Open terminal.
2. Navigate to the path the project was cloned in.
3. Run `npm run wdio`
