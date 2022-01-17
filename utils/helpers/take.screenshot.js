const { access, constants } = require('fs');

const takeScreenshot = async (path, image) => {

  access(path, constants.F_OK, (err) => {
    if (err) {
      console.info(`File path ${path} doesn't exists ... Let's create!`);
      fs.mkdir(path, {recursive: true}, err => {});
    }
  });
  await browser.saveScreenshot(`${path}${image}`);
}

module.exports = { takeScreenshot };