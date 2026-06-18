# URL Shortener Backend

Express + MongoDB API for the URL Shortener app. It creates short URL records, lists saved URLs, redirects short URLs to their original links, tracks click counts, and deletes URL records.

- Frontend: <a href="https://github.com/I-k-a-r-o-s/url-shortener-frontend" target="_blank" >Visit</a>

## Tech Stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- nanoid
- dotenv
- cors
- nodemon

## Project Structure

```text
src/
  config/
    mongodb.js                MongoDB connection helper
  controlers/
    shortUrlControllers.js    Create, list, redirect, and delete handlers
  helpers/
    response.js               Shared error response helper
  models/
    shortUrlModel.js          Mongoose short URL schema
  routes/
    shortUrlRoutes.js         API route definitions
  server.js                   Express app setup and server bootstrap
```

## Environment Variables

Create `backend/.env` with:

```env
PORT=
MONGO_URI=
ORIGIN_URL=
```

Variable meanings:

- `PORT`: Port used by the Express server.
- `MONGO_URI`: MongoDB connection string.
- `ORIGIN_URL`: Frontend origin allowed by CORS.

## Getting Started

Install dependencies:

```bash
npm install
```

Run in development mode with nodemon:

```bash
npm run dev
```

Run in production mode:

```bash
npm start
```

On Windows PowerShell, if script execution policy blocks `npm`, use `npm.cmd` instead:

```bash
npm.cmd run dev
```

## API Routes

Base path:

```text
/api
```

### Create a short URL

```http
POST /api/shorturl
Content-Type: application/json
```

Request body:

```json
{
  "fullUrl": "https://example.com/a/very/long/link"
}
```

Success response:

```json
{
  "success": true,
  "message": "Successfully created the URL!",
  "shortUrl": {
    "_id": "...",
    "fullUrl": "https://example.com/a/very/long/link",
    "shortUrl": "abc123...",
    "clicks": 0
  }
}
```

If the same `fullUrl` already exists, the API returns `409`.

### List all short URLs

```http
GET /api/shorturl
```

Returns URLs sorted by newest first.

### Redirect to the full URL

```http
GET /api/shorturl/:id
```

Here `:id` is the generated `shortUrl` value, not the MongoDB `_id`. The route increments `clicks` and redirects to the saved `fullUrl`.

### Delete a short URL

```http
DELETE /api/shorturl/:id
```

Here `:id` is the MongoDB document `_id`.

## Data Model

Each short URL stores:

- `fullUrl`: Original URL.
- `shortUrl`: Generated 10-character short code.
- `clicks`: Number of redirects through the short URL.
- `createdAt` and `updatedAt`: Added by Mongoose timestamps.

## Notes

- The server must connect to MongoDB before it starts listening.
- CORS is restricted to `ORIGIN_URL`.
- The redirect endpoint uses the generated short code, while the delete endpoint uses the database `_id`.
