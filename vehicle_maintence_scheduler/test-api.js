require("dotenv").config();
const axios = require("axios");
const { getAccessToken } = require("./src/services/authService");

(async () => {
  try {
    const token = await getAccessToken();

    console.log("Token obtained");

    const depots = await axios.get(
      "http://4.224.186.213/evaluation-service/depots",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("DEPOTS:");
    console.log(JSON.stringify(depots.data, null, 2));

    const vehicles = await axios.get(
      "http://4.224.186.213/evaluation-service/vehicles",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("VEHICLES:");
    console.log(JSON.stringify(vehicles.data, null, 2));

  } catch (err) {
    console.error(
      err.response?.status,
      err.response?.data || err.message
    );
  }
})();