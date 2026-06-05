const axios = require("axios");
const optimizeVehicles = require("../algorithms/knapsack");

const BASE_URL = process.env.BASE_URL;

async function scheduleDepot(depotId, token) {

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const depotsResponse = await axios.get(
        `${BASE_URL}/depots`,
        {
            headers
        }
    );

    const vehiclesResponse = await axios.get(
        `${BASE_URL}/vehicles`,
        {
            headers
        }
    );

    console.log("========== DEPOTS RESPONSE ==========");
    console.log(depotsResponse.data);
    console.log("=====================================");

    const depot = depotsResponse.data.depots.find(
        d => d.ID === Number(depotId)
    );

    if (!depot) {
        throw new Error("Depot not found");
    }

    const vehicles = vehiclesResponse.data.vehicles;

    console.log("========== VEHICLES STATS ==========");

    console.log({
        vehicleCount: vehicles.length,

        allHours: vehicles.reduce(
            (sum, vehicle) => {
                return sum + vehicle.Duration;
            },
            0
        ),

        allImpact: vehicles.reduce(
            (sum, vehicle) => {
                return sum + vehicle.Impact;
            },
            0
        )
    });

    console.log("====================================");

    const result = optimizeVehicles(
        vehicles,
        depot.MechanicHours
    );

    console.log("========== OPTIMIZATION RESULT ==========");

    console.log(
        "Capacity:",
        depot.MechanicHours
    );

    console.log(
        "Selected Hours:",
        result.totalHours
    );

    console.log(
        "Selected Impact:",
        result.maxImpact
    );

    console.log(
        "Selected Vehicle Count:",
        result.selectedTasks.length
    );

    console.log("=========================================");

    return {
        depotId: depot.ID,
        mechanicHours: depot.MechanicHours,
        maxImpact: result.maxImpact,
        totalHours: result.totalHours,
        selectedTasks: result.selectedTasks
    };
}

module.exports = {
    scheduleDepot
};