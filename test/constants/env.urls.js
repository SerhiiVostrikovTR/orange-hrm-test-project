require('dotenv').config({path: '.env'});
BASE_URL = 'https://opensource-demo.orangehrmlive.com/'
ENV_URLS = {dev: BASE_URL,
            test: BASE_URL,
            prod: BASE_URL};

function getUrl(env) {
    if (!Object.keys(this.ENV_URLS).includes(env))
    {
        throw `Incorrect name of the env: ${env}, try to use the following ${Object.keys(this.ENV_URLS)}`;
    }
    return this.ENV_URLS[env];
}

module.exports = { ENV_URLS, getUrl };

