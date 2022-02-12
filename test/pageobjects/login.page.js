const Page = require('./page');
const customActions = require('../../utils/custom.actions.js');
const { CREDENTIALS } = require('../constants/credentials.template.js');

class LoginPage extends Page {
  get inputUsername() {
    return $('#txtUsername');
  }
  get inputPassword() {
    return $('#txtPassword');
  }
  get btnLogin() {
    return $('#btnLogin');
  }
  get credentials() {
    return $('#content > div > span');
  }

  async login(username, password) {
    await customActions.enterTextIntoTextField(this.inputUsername, username);
    await customActions.enterTextIntoTextField(this.inputPassword, password);
    await customActions.waitForBtnAndClick(this.btnLogin);
  }

  getCredentialsFromScreen = async () => {
    const credentialsStr = await this.credentials.getText();
    const [all, username, pwd] = credentialsStr.match(CREDENTIALS);
    if (!username || !pwd) {
      throw 'Credentials was not provided';
    }
    return { username, pwd };
  };

  open() {
    return super.open('login');
  }
}

module.exports = new LoginPage();
