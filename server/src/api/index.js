import app from '../server.js';

// Vercel will call the exported function as a handler. The Express app is a
// compatible function (req, res). We simply export it here.
export default app;