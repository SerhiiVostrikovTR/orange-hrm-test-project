const baseConfig = require('../../wdio.conf')
module.exports = class Page {
    open(path) {
        return browser.url(`${baseConfig.config.testEnvUrl}${path}`)
    }
}
