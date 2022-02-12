const { config } = require('./wdio.shared.conf.js');

config.capabilities = [
    {
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true
    },
];
config.services = (config.services ? config.services : []).concat([
    ['chromedriver'],
]);
config.beforeTest = async function (test, context) {
    await browser.setWindowSize(1920, 1080);
};

exports.config = config;
