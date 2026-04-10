const https = require('https');

const data = JSON.stringify({
  message: 'ping'
});

const options = {
  hostname: 'xai-assistant-1.onrender.com',
  path: '/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();

console.log('Keep-alive ping sent (Node.js)');
