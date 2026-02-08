
# Backend API Testing Guide

This guide helps you verify that the backend is running correctly and serving data.

## Prerequisites

1.  **MongoDB Connection**: Ensure your `server/.env` has the correct `MONGODB_URI`.
2.  **Dependencies**: Run `npm install` in the `server` directory.
3.  **Data Seeding**: Run `node src/utils/seeder.js` in the `server` directory to populate the database.

## Starting the Server

1.  Open a terminal in `server/`.
2.  Run `npm run dev` (or `node src/server.js`).
3.  Server should start on port 5001.

## Testing Endpoints

You can test these URLs in your browser or a tool like Postman:

### Global Data
- **URL**: `http://localhost:5001/api/global`
- **Expected Result**: JSON object containing logo path and contact info.

### Home Data
- **URL**: `http://localhost:5001/api/home`
- **Expected Result**: JSON object with Hero slides, Services, and About highlights.

### Products
- **List All**: `http://localhost:5001/api/products`
- **Single Product**: `http://localhost:5001/api/products/apropride-200`
- **ByCategory**: `http://localhost:5001/api/products/category/antipsychotic`

## Troubleshooting

- **Connection Error**: Check your IP whitelist in MongoDB Atlas if connection fails.
- **Empty Data**: Run the seeder script again.
