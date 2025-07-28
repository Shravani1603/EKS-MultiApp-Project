const express = require('express');
const app = express();
const port = 5501;

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/web2', (req, res) => {
  res.send('Hello from Web2 - Node.js!');
});

app.listen(port, () => {
  console.log(`Web2 running on http://localhost:${port}`);
});
