const baseConfig = require('../../configs/wdio.shared.conf.js');
module.exports = class Page {
    open(path) {
        return browser.url(`${baseConfig.config.testEnvUrl}${path}`)
    }
}
