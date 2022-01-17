const Page = require('./page');
const DeleteUserModal = require('../pageobjects/modals/delete.user.modal.js');
const customActions = require('../../utils/custom_actions.js');

class AdminTabScreen extends Page {

    get btnAdd() { return $('#btnAdd'); }
    get btnSearch() { return $('#searchBtn'); }
    get btnReset() { return $('#resetBtn'); }
    get btnDelete() { return $('#btnDelete'); }
    get searchUsername() { return $('#searchSystemUser_userName'); }
    get table() { return $$('#resultTable tbody tr td.left'); }
    get usrLinkTable() { return $('#resultTable tbody tr td.left a'); }
    get userCheckbox() { return $('#resultTable tbody td input'); }
    get noRecordsInTable() {return $("#resultTable tbody tr td[colspan='5']")}

    async addUserBtnClick() {  await customActions.waitForBtnAndClick(this.btnAdd); }

    async deleteUserBtnClick() { await customActions.waitForBtnAndClick(this.btnDelete); }

    async resetSearchUserBtnClick() { await customActions.waitForBtnAndClick(this.btnReset); }

    async enterUsernameSearch(usName) { await customActions.enterTextIntoTextField(this.searchUsername, usName); }

    async searchUserBtnClick() { await customActions.waitForBtnAndClick(this.btnSearch); }

    async searchByUsername(usName, isDeleted=false) {
        await this.enterUsernameSearch(usName);
        await this.searchUserBtnClick();
        if (!isDeleted){
            await this.usrLinkTable.waitForExist({timeout: 2000});
            await browser.waitUntil(
                async () => (await this.usrLinkTable.getText()) === usName,
                {
                    timeout: 2000,
                    timeoutMsg: `username ${usName} wasn't showed after 5s`
                }
            );
        }
    }

    async getRowData() {
        const rows = await this.table;
        const tableData = rows.map((elem) => elem.getText());
        const promRes = await Promise.allSettled(tableData);
        return promRes.map(elem => elem.value);
    }

    async getUserId() {
        const userId = await this.userCheckbox.getAttribute('value');
        return userId;
    }

    async selectCheckboxByUserId(id) {
        const checkbox = await $(`#ohrmList_chkSelectRecord_${id}`);
        await checkbox.scrollIntoView();
        await checkbox.click();
    }

    async deleteUserFlow(id) {
        await this.selectCheckboxByUserId(id);
        await this.deleteUserBtnClick();
        await DeleteUserModal.confirmDelete();
    }

    async checkThatUserWasDeleted(usrName) {
        await this.searchByUsername(usrName, true);
        const isDeleted = await this.noRecordsInTable.isDisplayed();
        return isDeleted;
    }
}

module.exports = new AdminTabScreen();
