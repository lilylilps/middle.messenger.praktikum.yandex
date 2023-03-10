const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

app.use('/', express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
