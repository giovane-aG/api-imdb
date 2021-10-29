import express, { Router } from 'express';
import { createConnection } from 'typeorm';
import { UserComposer } from '../composers/userComposer';

createConnection().then(() => {

  const app = express();
  const userRouter = Router();

  UserComposer.compose(userRouter);

  app.use(express.json());
  app.use(userRouter);

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});
