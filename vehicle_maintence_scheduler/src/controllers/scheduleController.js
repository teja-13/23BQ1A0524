const vehicleService =
    require("../services/vehicleService");

async function getSchedule(req, res) {
    try {
        const result =
            await vehicleService.scheduleDepot(
                req.params.depotId,
                req.accessToken
            );
        
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getSchedule
};