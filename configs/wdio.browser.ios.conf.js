const { config } = require('./wdio.shared.appium.conf.js');

config.capabilities = [
    {
        browserName: 'safari',
        platformName: 'iOS',
        maxInstances: 1,
        'appium:deviceName': 'iPhone 12',
        'appium:platformVersion': '14.4',
        'appium:orientation': 'PORTRAIT',
        'appium:automationName': 'XCUITest',
        'appium:newCommandTimeout': 240,
    },
];

exports.config = config;
