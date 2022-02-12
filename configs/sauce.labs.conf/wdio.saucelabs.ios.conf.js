const { config } = require("./wdio.shared.sauce.mobile.conf");
const build = `Orange HRM Test Project iOS Safari '${
  config.appiumVersion
}' build-${new Date().getTime()}`;

config.capabilities = ["14.4"].map((iOSVersion) => ({
  build: build,
  browserName: "safari",
  platformName: "iOS",
  platformVersion: iOSVersion,
  deviceName: "iPhone Simulator",
}));

if (config.appiumVersion !== undefined && config.appiumVersion !== "default") {
  config.capabilities.forEach((capability) => {
    capability.appiumVersion = config.appiumVersion;
  });
}

exports.config = config;
