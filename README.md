# goit-node-rest-api

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```
   PORT=3000
   DATABASE_DIALECT=postgres
   DATABASE_USER=your_user
   DATABASE_PASSWORD=your_password
   DATABASE_HOST=localhost
   DATABASE_NAME=your_db
   DATABASE_PORT=5432
   ```
3. Start the server:
   ```bash
   npm start
   # or for auto-reload:
   npm run dev
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Project Structure
- `app.js` — Express app configuration, exported for tests.
- `server.js` — server startup (`app.listen`).
- `db/` — database connection, Sequelize models.
- `routes/` — API routers.
- `controllers/` — request handlers.
- `services/` — business logic.
- `schemas/` — Joi validation schemas.
- `test/` — automated tests (Jest + supertest).

## Key Points
- For tests, export `default app` from `app.js`.
- The server is started via `server.js`.
- All environment variables are in `.env`.
- PostgreSQL is required for database operations.

Contacts APP