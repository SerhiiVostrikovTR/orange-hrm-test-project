const { config } = require('../../wdio.conf');
const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/homepage');
const AdminTabScreen = require('../pageobjects/admin.tab.screen.js');
const AddUserScreen = require('../pageobjects/add.user.screen.js');
const { UserRoleTypes, UserStatusTypes } = require('../constants/add.user.props.js');
const fakeData = require('../../utils/fake.data.js');
const expect = require('expect');

afterAll(async () => {
    await browser.deleteSession();
  });

describe('Create/delete user e2e test', () => {
    it('should login with valid credentials, add and remove user', async () => {
        await LoginPage.open();
        expect(await browser.getUrl()).toEqual(`${config.testEnvUrl}login`);

        console.log('Get credentials from the page');
        const creds = await LoginPage.getCredentialsFromScreen();
        
        console.log('Login to the page using credentials');
        await LoginPage.login(creds.username, creds.pwd);

        expect(await HomePage.adminTab.isDisplayed()).toBeTruthy();

        const addUserProps = {
            userRole: UserRoleTypes.ESS,
            userName: fakeData.fakeFullName(),
            status: UserStatusTypes.ENABLED,
            password: fakeData.fakePassword()
        }
        
        addUserProps.employeeName = await HomePage.getCurrentUserName();
        
        console.log('Opening admin tab');
        await HomePage.openAdminTab();

        console.log('Click Add button');
        await AdminTabScreen.addUserBtnClick();

        console.log(`Addining user with username: ${addUserProps.userName}, employee name: ${addUserProps.employeeName}, and password ${addUserProps.password}`);
        const savedUser = await AddUserScreen.setUserPropsAndSave(
            addUserProps.userRole,
            addUserProps.employeeName, 
            addUserProps.userName, 
            addUserProps.status, 
            addUserProps.password
            );

        addUserProps.employeeName = savedUser.fullEmployeeName;
        
        console.log(`Seach user with username ${addUserProps.userName}`);
        await AdminTabScreen.searchByUsername(addUserProps.userName);

        console.log('Check userdata from grid');
        const tableData = await AdminTabScreen.getRowData();
        
        expect([...tableData]).toEqual([addUserProps.userName, addUserProps.userRole, addUserProps.employeeName, addUserProps.status]);

        const userId = await AdminTabScreen.getUserId();

        await AdminTabScreen.resetSearchUserBtnClick();

        await AdminTabScreen.deleteUserFlow(userId);

        const isDeletedUser = await AdminTabScreen.checkThatUserWasDeleted(addUserProps.userName);
        expect(isDeletedUser).toBeTruthy();
    });
});
