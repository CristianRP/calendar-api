import express from 'express';
import { authRouter } from './routes';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();
const port = process.env.PORT || '8080';

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', authRouter)

// app.get('/', rootHandler);
// app.get('/hello/:name', helloHandler);

app.listen(port, (err?: unknown) => {
  if (err) return console.error(err);

  return console.log(`Server is listenting on ${port}`);
});
