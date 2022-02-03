const Page = require('./page');
const customActions = require('../../utils/custom.actions.js')

class LoginPage extends Page {
    get inputUsername() { return $('#txtUsername'); }
    get inputPassword() { return $('#txtPassword'); }
    get btnLogin() { return $('#btnLogin'); }
    get credentials() { return $('#content > div > span'); }

    async login (username, password) {
        await customActions.enterTextIntoTextField(this.inputUsername, username);
        await customActions.enterTextIntoTextField(this.inputPassword, password);
        await customActions.waitForBtnAndClick(this.btnLogin);
        // await browser.waitUntil(
        //     async () => (await this.btnLogin.isDisplayed()) === false,
        //     {
        //         timeout: 10000,
        //         timeoutMsg: `Homepage wasn't loaded after 10s`
        //     }
        // );
        await this.btnLogin.waitForDisplayed({ timeout: 5000, reverse: true });
    }

    async getCredentialsFromScreen() {
        const credentialsStr = await this.credentials.getText();
        const credentialsPattern = /^\( Username : (\w+) \| Password : (\w+) \)$/;
        const[all, username, pwd] = credentialsStr.match(credentialsPattern);
        if (!username || !pwd){
            throw 'Credentials was not provided';
        }
        return {username, pwd};
    }

    open() {
        return super.open('login');
    }
}

module.exports = new LoginPage();
