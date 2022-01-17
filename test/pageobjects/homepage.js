const Page = require('./page');
const customActions = require('../../utils/custom.actions.js');

class HomePage extends Page {
    get adminTab() { return $('#menu_admin_viewAdminModule'); }
    get btnAdd() { return $('#btnAdd'); }
    get currentUserName() { return $('#welcome'); }

    async openAdminTab() { await customActions.waitForBtnAndClick(this.adminTab); }

    async addUserBtnClick() { await customActions.waitForBtnAndClick(this.btnAdd);}

    async getCurrentUserName() {
        const welcomeText = await this.currentUserName.getText();
        const username = welcomeText.split(' ');
        return username.pop();
    } 
}

module.exports = new HomePage();
