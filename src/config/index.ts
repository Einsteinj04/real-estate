import APP_ROUTES from './app.routes';
import * as ASSETS from './assets';

const SITE_DATA: {
    NAME: string;
    OFFICIAL_NAME: string;
    TWITTER_HANDLE: string;
} = {
    NAME: 'RealEstate',
    OFFICIAL_NAME: '',
    TWITTER_HANDLE: '',
};

const SUBDOMAINS: {
    ROOT: string;
    ADMIN: string;
    // ACCOUNTS: string;
} = {
    ROOT: APP_ROUTES.HOST,
    ADMIN: APP_ROUTES.ADMIN,
    // ACCOUNTS: APP_ROUTES.ACCOUNTS,
};

export {
    ASSETS,
    APP_ROUTES,
    SITE_DATA,
    SUBDOMAINS
};
