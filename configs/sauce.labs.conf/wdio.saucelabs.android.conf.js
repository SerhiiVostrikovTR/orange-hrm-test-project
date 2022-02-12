const { config } = require("./wdio.shared.sauce.mobile.conf.js");
const build = `Orange HRM Test Project Android Chrome'${
  config.appiumVersion
}' build-${new Date().getTime()}`;

config.capabilities = ["11.0"].map((androidVersion) => ({
  browserName: "Chrome",
  deviceName: "Android GoogleAPI Emulator",
  platformName: "Android",
  platformVersion: androidVersion,
  build: build,

  appiumVersion: "1.20.2",
}));

if (config.appiumVersion !== undefined && config.appiumVersion !== "default") {
  config.capabilities.forEach((capability) => {
    capability.appiumVersion = config.appiumVersion;
  });
}

exports.config = config;
