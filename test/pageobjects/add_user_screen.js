const Page = require('./page');
const customActions = require('../../utils/custom_actions.js');
const { PasswordStatuses } = require('../constants/password.status');

class AddUserScreen extends Page {
    get userRoleDropdown() { return $('#systemUser_userType');}
    get employeeName() { return $('#systemUser_employeeName_empName'); }
    get employeeNameDropdownResults() { return $('div.ac_results > ul > li.ac_over'); }
    get userName() { return $('#systemUser_userName'); }
    get userStatusDropdown() { return $('#systemUser_status'); }
    get password() { return $('#systemUser_password'); }
    get confirmPassword() { return $('#systemUser_confirmPassword'); }
    get saveBtn() { return $('#btnSave'); }
    get passwordStrongChecker() { return $('#systemUser_password_strength_meter'); }

    async setUserRole(usrRole) { await this.userRoleDropdown.selectByAttribute('value', usrRole === 'ESS' ? 2 : 1); }

    async enterEmployeeName(empName) {
        await customActions.enterTextIntoTextField(this.employeeName, empName);
        await this.employeeNameDropdownResults.click();
    }

    async getEmployeeName(){ 
        const empName = await this.employeeName.getValue(); 
        return empName;
    }

    async enterUsername(usName) { await customActions.enterTextIntoTextField(this.userName, usName); }

    async setUserStatus(status) {
        await this.userStatusDropdown.selectByAttribute('value', status === 'Enabled' ? 1 : 0);
    }

    async enterPassword(pwd) { 
        await customActions.enterTextIntoTextField(this.password, pwd); 
        await this.waitUntilPwdStatus(PasswordStatuses.STRONGEST);
    }

    async enterConfirmPassword(pwd) { await customActions.enterTextIntoTextField(this.confirmPassword, pwd); }

    async saveBtnClick() { await customActions.waitForBtnAndClick(this.saveBtn); }

    async setUserPropsAndSave(usrRole, empName, usrName, usrStatus, pwd){
        await this.setUserRole(usrRole);
        await this.enterEmployeeName(empName);
        const fullEmployeeName = await this.getEmployeeName();
        await this.enterUsername(usrName);
        await this.setUserStatus(usrStatus);
        await this.enterPassword(pwd);
        await this.enterConfirmPassword(pwd);
        await this.saveBtnClick();
        return {fullEmployeeName, usrName, pwd};
    }

    async waitUntilPwdStatus(pwdStatus) {
        await browser.waitUntil(
            async () => (await this.passwordStrongChecker.getText()) === pwdStatus,
            {
                timeout: 5000,
                timeoutMsg: 'expected password status Strongest to be different after 5s'
            }
        );
    }
}

module.exports = new AddUserScreen();
