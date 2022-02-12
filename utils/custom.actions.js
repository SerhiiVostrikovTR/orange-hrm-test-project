const waitForBtnAndClick = async (button) => {
  await button.click();
};

const enterTextIntoTextField = async (inputField, text) => {
  await inputField.click();
  await inputField.setValue(text);
};

module.exports = { waitForBtnAndClick, enterTextIntoTextField };
