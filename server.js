const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router({});
const middlewares = jsonServer.defaults();

server.use(cors({
  origin: '*', // Allow requests from any origin (for development purposes)
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], // Specify the allowed headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Create a generic route handler that responds to any URL
server.use((req, res, next) => {
  console.log(`Request received for URL: ${req.originalUrl}`);

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Authorization', '*');
  res.header('Content-Type', 'application/json');

  res.json({ accessToken: 'mocked_9280d2e6-3f27-42d8-a886-cf22954065a7' });
});

server.use(middlewares);
server.use(router);

// Start the server on port 3001 (or any other port you prefer)
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});