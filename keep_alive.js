const http = require('https');

const data = JSON.stringify({
  message: 'ping'
});

const options = {
  hostname: 'your-app-name.onrender.com',
  path: '/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();

console.log('Keep-alive ping sent (Node.js)');
