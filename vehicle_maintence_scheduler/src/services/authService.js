const axios = require("axios");

let cachedToken = null;
let expiryTime = 0;

async function getAccessToken() {
    const now = Date.now();

    if (cachedToken && now < expiryTime) {
        return cachedToken;
    }

    const response = await axios.post(
        process.env.AUTH_API_URL,
        {
            email: process.env.EMAIL,
            name: process.env.NAME,
            rollNo: process.env.ROLL_NO,
            accessCode: process.env.ACCESS_CODE,
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        }
    );

    cachedToken = response.data.access_token;

    expiryTime =
        now + (response.data.expires_in || 3600) * 1000;

    return cachedToken;
}

module.exports = {
    getAccessToken
};