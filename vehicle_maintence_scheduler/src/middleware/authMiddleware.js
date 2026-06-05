const { getAccessToken } = require("../services/authService");

module.exports = async (req, res, next) => {
    try {
        req.accessToken = await getAccessToken();
        next();
    } catch (err) {
        res.status(500).json({
            error: "Authentication failed"
        });
    }
};