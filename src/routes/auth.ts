import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, loginUser, renewToken } from '../controllers/auth';

const router = Router();

router.post(
  '/new',
  [
    check()
  ],
  createUser
);

router.post('/', loginUser)

router.post('/renew', renewToken)

export { router as authRouter };
