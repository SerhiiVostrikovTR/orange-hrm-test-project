const { config } = require('./wdio.shared.conf.js');

config.services = (config.services ? config.services : []).concat([
  [
    'appium',
    {
      command: 'appium',
      logPath: '../logs/appium_logs',
      args: {
        relaxedSecurity: true,
      },
    },
  ],
]);
config.port = 4723;

exports.config = config;
