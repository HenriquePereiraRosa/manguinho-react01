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

server.use((req, res, next) => {
  console.log(`Request received for URL: ${req.originalUrl}`);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Authorization', '*');
  res.header('Content-Type', 'application/json');
  next();
});

server.post('/api/login', (req, res) => {
  res.json({ accessToken: 'login_mocked_9280d2e6-3f27-42d8-a886-cf22954065a7' });
});

server.post('/api/signup', (req, res) => {
  res.json({ accessToken: 'signup_mocked_9280d2e6-3f27-42d8-a886-cf22954065a7' });
});

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});