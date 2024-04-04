import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, loginUser, renewToken } from '../controllers/auth';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post(
  '/new',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password length must be greather than 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password length must be greather than 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  loginUser
);

router.post('/renew', renewToken)

export { router as authRouter };
