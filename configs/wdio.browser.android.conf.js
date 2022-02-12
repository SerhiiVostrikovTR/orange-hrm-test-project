const { config } = require("./wdio.shared.appium.conf.js");

config.capabilities = [
  {
    browserName: "chrome",
    platformName: "Android",
    maxInstances: 1,
    "appium:deviceName": "Pixel_XL",
    "appium:platformVersion": "12.0",
    "appium:orientation": "PORTRAIT",
    "appium:newCommandTimeout": 240,
  },
];

exports.config = config;
