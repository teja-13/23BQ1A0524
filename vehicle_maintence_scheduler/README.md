# Vehicle Maintenance Scheduler

A Node.js REST API that optimizes vehicle maintenance scheduling for transport depots using the **0/1 Knapsack Dynamic Programming Algorithm**.

The system retrieves depot and vehicle data from an external evaluation service, determines the optimal set of vehicles that can be serviced within the available mechanic hours, and maximizes the total impact score.

---

# Features

- Fetches depot information from external API
- Fetches vehicle maintenance tasks from external API
- Uses Dynamic Programming (0/1 Knapsack)
- Maximizes maintenance impact
- Ensures selected vehicle durations do not exceed mechanic hours
- REST API endpoint for scheduling
- Detailed logging for debugging and evaluation

---

# Project Structure

```text
vehicle_maintence_scheduler/
│
├── src/
│   │
│   ├── algorithms/
│   │   └── knapsack.js
│   │
│   ├── controllers/
│   │   └── scheduleController.js
│   │
│   ├── routes/
│   │   └── scheduleRoutes.js
│   │
│   ├── services/
│   │   └── vehicleService.js
│   │
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# Algorithm Used

## 0/1 Knapsack Problem

Each vehicle is treated as an item:

| Vehicle Property | Knapsack Meaning |
|-----------------|------------------|
| Duration | Weight |
| Impact | Value |
| MechanicHours | Capacity |

Goal:

```text
Maximize Total Impact
Subject To:

Sum(Duration) <= MechanicHours
```

Dynamic Programming Complexity:

```text
Time Complexity:
O(N × Capacity)

Space Complexity:
O(N × Capacity)
```

Where:

```text
N = Number of Vehicles
Capacity = Mechanic Hours
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd vehicle_maintence_scheduler
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=3000

BASE_URL=http://4.224.186.213/evaluation-service

TOKEN=your_token_here
```

---

# Running the Project

Start the server:

```bash
node src/server.js
```

Expected output:

```bash
Server running on port 3000
```

---

# API Endpoint

## Generate Maintenance Schedule

### Request

```http
GET /api/schedule/:depotId
```

Example:

```bash
curl http://localhost:3000/api/schedule/5
```

---

# Sample Response

```json
{
  "success": true,
  "data": {
    "depotId": 5,
    "mechanicHours": 164,
    "maxImpact": 199,
    "totalHours": 164,
    "selectedTasks": [
      {
        "TaskID": "7251163b-a7df-4d9e-a3d4-c3c03c42f4b6",
        "Duration": 8,
        "Impact": 4
      }
    ]
  }
}
```

---

# Logging

The application includes detailed logs for debugging and verification.

## Depot Data

```bash
========== DEPOTS RESPONSE ==========
{
  depots: [
    { ID: 2, MechanicHours: 135 },
    { ID: 3, MechanicHours: 188 },
    { ID: 4, MechanicHours: 97 },
    { ID: 5, MechanicHours: 164 }
  ]
}
=====================================
```

---

## Vehicle Statistics

```bash
========== VEHICLES STATS ==========
{
  vehicleCount: 38,
  allHours: 169,
  allImpact: 200
}
====================================
```

---

## Optimization Results

```bash
========== OPTIMIZATION RESULT ==========
Capacity: 164

Selected Hours: 164

Selected Impact: 199

Selected Vehicle Count: 37
=========================================
```

---

# Error Handling

## Invalid Depot

Request:

```bash
curl http://localhost:3000/api/schedule/10
```

Response:

```json
{
  "success": false,
  "message": "Depot not found"
}
```

---

# Example Knapsack Logic

```javascript
if (duration <= h) {
    dp[i][h] = Math.max(
        dp[i - 1][h],
        impact + dp[i - 1][h - duration]
    );
}
```

This determines whether including a vehicle yields a higher impact than excluding it.

---

# Technologies Used

- Node.js
- Express.js
- Axios
- JavaScript
- Dynamic Programming
- REST API

---

# Author

Teja

---

# Output Validation

The following conditions are verified:

```text
Selected Hours <= Mechanic Hours

Selected Impact = DP Optimal Value

All Selected Tasks are Unique

Maximum Impact Achieved
```

Example:

```bash
Capacity: 164

Selected Hours: 164

Selected Impact: 199

DP Impact: 199
```

This confirms the optimal solution was successfully generated.
