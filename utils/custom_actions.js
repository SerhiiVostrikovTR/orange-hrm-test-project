const waitForBtnAndClick = async (button) => {
    await button.waitForClickable();
    await button.click(); 
}

const enterTextIntoTextField = async (inputField, text) => {
    await inputField.waitForClickable();
    await inputField.click();
    await inputField.setValue(text);
}

module.exports = { waitForBtnAndClick, enterTextIntoTextField }