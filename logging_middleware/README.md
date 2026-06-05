# Logging Middleware Service

A small Express app that demonstrates a reusable logging function and a request logging middleware.

## Features

- Reusable `Log(stack, level, packageName, message)` helper
- Input validation for stack, level, and backend package values
- Graceful handling of logging API failures
- Request logging middleware for method, URL, IP, and timestamp
- Sample routes: `GET /success` and `GET /error`

## Project Structure

```
logging_middleware/
├── package.json
├── .env
├── src/
│ ├── config/
│ │ └── constants.js
│ ├── middleware/
│ │ └── logger.js
│ ├── services/
│ │ └── logService.js
│ ├── routes/
│ │ └── test.routes.js
│ ├── app.js
│ └── server.js
└── README.md
```

## Setup

1. Initialize npm:

```
npm init -y
```

2. Install dependencies:

```
npm install express axios dotenv
```

3. Start the server:

```
npm start
```

## Notes

- Set `LOG_API_URL` in `.env` to your logging API endpoint.
- Use allowed stack values: backend, frontend
- Use allowed level values: debug, info, warn, error, fatal
- Use allowed backend package values: cache, controller, cron_job, db, domain, handler, repository, route, service
