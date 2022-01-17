require('dotenv').config({path: '.env'});
ENV_URLS = {dev: '',
            test: 'https://opensource-demo.orangehrmlive.com/',
            prod: ''};

function getUrl(env) {
    if (!Object.keys(this.ENV_URLS).includes(env))
    {
        throw `Incorrect name of the env: ${env}, try to use the following ${Object.keys(this.ENV_URLS)}`;
    }
    return this.ENV_URLS[env];
}

module.exports = { ENV_URLS, getUrl };

