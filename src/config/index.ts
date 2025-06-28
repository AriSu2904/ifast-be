import { config } from "dotenv";

config();

const ENV = {
    GOOGLE: {
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        SECRET: process.env.GOOGLE_CLIENT_SECRET,
        CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
    },
    JWT: {
        SECRET: process.env.JWT_SECRET,
        ISSUER: process.env.JWT_ISSUER
    },
    DB: {
        NAME: process.env.MONGODB_NAME,
        URI: process.env.MONGODB_URI
    }
}

export default ENV;