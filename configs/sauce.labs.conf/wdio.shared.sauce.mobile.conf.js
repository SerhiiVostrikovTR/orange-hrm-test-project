const { config } = require("../wdio.shared.conf.js");

config.services = config.services.concat([["sauce"]]);

config.user = "oauth-serhii.vostrikov-33130";
config.key = "fa7c731c-cb94-4295-8cda-2a6735fb0ad1";
config.region = process.env.REGION || "us";

config.appiumVersion = process.env.npm_config_appium_version || "default";

// Retry a spec once if it fails, this could be a WebdriverIO or Driver error
// config.specFileRetries = 1;

exports.config = config;
