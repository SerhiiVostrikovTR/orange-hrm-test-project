const faker = require("faker");
faker.locale = "en";

const fakeFullName = () => {
  // Create unique username
  return `test_${faker.name.findName()}_${Date.now()}`;
};

const fakePassword = () => {
  // Create unique password
  return `1Aa!${faker.internet.password()}`;
};

module.exports = { fakeFullName, fakePassword };
