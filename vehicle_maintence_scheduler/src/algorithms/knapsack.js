function optimizeVehicles(vehicles, capacity) {
    const n = vehicles.length;

    const dp = Array.from(
        { length: n + 1 },
        () => Array(capacity + 1).fill(0)
    );

    for (let i = 1; i <= n; i++) {
        const duration = vehicles[i - 1].Duration;
        const impact = vehicles[i - 1].Impact;

        for (let h = 0; h <= capacity; h++) {
            if (duration <= h) {
                dp[i][h] = Math.max(
                    dp[i - 1][h],
                    impact + dp[i - 1][h - duration]
                );
            } else {
                dp[i][h] = dp[i - 1][h];
            }
        }
    }

    const selectedTasks = [];
    let h = capacity;

    for (let i = n; i > 0; i--) {
        if (dp[i][h] !== dp[i - 1][h]) {
            selectedTasks.push(vehicles[i - 1]);
            h -= vehicles[i - 1].Duration;
        }
    }

    const totalHours = selectedTasks.reduce(
        (sum, task) => sum + task.Duration,
        0
    );
    const actualImpact = selectedTasks.reduce(
    (sum, task) => sum + task.Impact,
    0
);

console.log("Capacity:", capacity);
console.log("Selected Hours:", totalHours);
console.log("Selected Impact:", actualImpact);
console.log("DP Impact:", dp[n][capacity]);

    return {
        maxImpact: dp[n][capacity],
        totalHours,
        selectedTasks: selectedTasks.reverse()
    };
}

module.exports = optimizeVehicles;