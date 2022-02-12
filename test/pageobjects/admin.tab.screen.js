const Page = require('./page');
const DeleteUserModal = require('./modals/delete.user.modal.js');
const customActions = require('../../utils/custom.actions.js');

class AdminTabScreen extends Page {

    static checkboxById = '#ohrmList_chkSelectRecord_';
    static resultTableLocator = '#resultTable';

    get btnAdd() { return $('#btnAdd'); }
    get btnSearch() { return $('#searchBtn'); }
    get btnReset() { return $('#resetBtn'); }
    get btnDelete() { return $('#btnDelete'); }
    get searchUsername() { return $('#searchSystemUser_userName'); }
    get table() { return $$(`${AdminTabScreen.resultTableLocator} tbody tr td.left`); }
    get resultTable() { return $(`${AdminTabScreen.resultTableLocator}`); }
    get usrLinkTable() { return $(`${AdminTabScreen.resultTableLocator} tbody tr td.left a`); }
    get userCheckbox() { return $(`${AdminTabScreen.resultTableLocator} tbody td input`); }
    get noRecordsInTable() {return $(`${AdminTabScreen.resultTableLocator} tbody tr td[colspan='5']`)}

    async addUserBtnClick() {  await customActions.waitForBtnAndClick(this.btnAdd); }

    async deleteUserBtnClick() { await customActions.waitForBtnAndClick(this.btnDelete); }

    async resetSearchUserBtnClick() { await customActions.waitForBtnAndClick(this.btnReset); }

    async enterUsernameSearch(usName) { await customActions.enterTextIntoTextField(this.searchUsername, usName); }

    async searchUserBtnClick() { await customActions.waitForBtnAndClick(this.btnSearch); }

    async searchByUsername(usName, isDeleted=false) {
        await this.enterUsernameSearch(usName);
        await this.searchUserBtnClick();
        if (!isDeleted){
            await this.usrLinkTable.waitForExist({timeout: 4000});
            await browser.waitUntil(
                async () => (await this.usrLinkTable.getText()) === usName,
                {
                    timeout: 4000,
                    timeoutMsg: `username ${usName} wasn't showed after 4s`
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
        const checkbox = await $(`${AdminTabScreen.checkboxById}${id}`);
        await checkbox.scrollIntoView();
        await checkbox.click();
    }

    async deleteUserFlow(id) {
        await this.selectCheckboxByUserId(id);
        await this.deleteUserBtnClick();
        await DeleteUserModal.deleteBtn.waitForDisplayed({ timeout: 2000 });
        await DeleteUserModal.confirmDelete();
    }

    async checkThatUserWasDeleted(usrName) {
        await this.searchByUsername(usrName, true);
        const table = await this.resultTable;
        await table.scrollIntoView();
        const isDeleted = await this.noRecordsInTable.waitForDisplayed({ timeout: 4000 });
        return isDeleted;
    }
}

module.exports = new AdminTabScreen();
