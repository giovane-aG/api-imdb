import express, { Request, Response, Router } from 'express';
import { createConnection } from 'typeorm';
import { UserComposer } from '../composers/userComposer';
import { MovieComposer } from '../composers/MovieComposer';

createConnection().then(() => {

  const app = express();
  const userRouter = Router();
  const movieRouter = Router();

  UserComposer.compose(userRouter);
  MovieComposer.compose(movieRouter);

  app.use(express.json());
  app.use(userRouter);
  app.use(movieRouter);

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});
