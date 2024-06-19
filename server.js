import express from 'express';
import AppRouter from './routes/index';

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/', AppRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
