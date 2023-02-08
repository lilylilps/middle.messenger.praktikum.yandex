const express = require('express');

const app = express();
const PORT = 3000;

const path = require('path') 
app.use('/', express.static(path.join(__dirname, 'dist')));

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});
