import Express from 'express';
import AppRouter from './routes';

const app = new Express();

const port = process.env.PORT || 5000;

app.use(Express.json());

app.use('/', AppRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
