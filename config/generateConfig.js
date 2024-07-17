import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.APP_ENV || 'local';

const config = {
    local: {
        username: process.env.DBUSER || 'root',
        password: process.env.DBPASSWORD || null,
        database: process.env.DBDATABASE || 'makertplace-api',
        host: process.env.DBHOST || '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: process.env.DBUSER || 'root',
        password: process.env.DBPASSWORD || null,
        database: process.env.DBDATABASE || 'database_test',
        host: process.env.DBHOST || '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: process.env.DBUSER || 'root',
        password: process.env.DBPASSWORD || null,
        database: process.env.DBDATABASE || 'database_production',
        host: process.env.DBHOST || '127.0.0.1',
        dialect: 'mysql'
    }
};

fs.writeFileSync('config/config.json', JSON.stringify(config[env], null, 2));
console.log(`config.json has been generated based on .env values for ${env} environment`);
