import express from 'express';
import { authRouter } from './routes';
import dotenv from 'dotenv';
import { dbConnection } from './database/config';

dotenv.config();

const app = express();
dbConnection();

const port = process.env.PORT || '8080';

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', authRouter)

app.listen(port, (err?: unknown) => {
  if (err) return console.error(err);

  return console.log(`Server is listenting on ${port}`);
});
