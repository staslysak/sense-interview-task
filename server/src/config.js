require('dotenv').config();

const { PORT = 8080, DB_NAME, DB_PW } = process.env;

module.exports = {
    PORT,
    DB_URI: `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0.3qsgw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    ACCESS_TOKEN: {
        secret: 'tokensecret',
        options: {
            expiresIn: '15m',
        },
    },
    REFRESH_TOKEN: {
        secret: 'refreshtokensecret',
        options: {
            expiresIn: '30d',
        },
    },
};
