require("dotenv").config();

const { getAccessToken } = require("./src/services/authService");

(async () => {
  try {
    const result = await getAccessToken();

    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
})();