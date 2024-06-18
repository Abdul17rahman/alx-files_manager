const express = require('express');

const app = express();
const AppRouter = require('./routes/index');

const port = process.env.PORT || 5000;

app.use(express.json())

app.use('/', AppRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
