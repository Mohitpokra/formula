import devConfig from './dev';
import prodConfig from './prod';

let env = process.env.NODE_ENV || 'development';
let basiConfig = {

}

let envConfig = {};

switch (env) {
    case 'dev':
    case 'development':
        envConfig = devConfig;
        break;
    case 'prod':
    case 'production':
        envConfig = prodConfig;
        break;
    default:
        envConfig = devConfig;
}

const frontConfig = {
    ...basiConfig,
    ...envConfig
}

export default frontConfig;
