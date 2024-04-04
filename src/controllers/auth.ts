import {  Request, Response } from 'express';
import { validationResult } from 'express-validator';

const createUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }

  res.status(201).json({
    ok: true,
    msg: 'register-controller',
    name,
    email,
    password,
  })
}

const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    })
  }

  res.status(200).json({
    ok: true,
    msg: 'login',
    email,
    password,
  })
}

const renewToken = (req: Request, res: Response) => {
  res.json({
    ok: true
    ,msg: 'renew'
  })
}

export {
  createUser,
  loginUser,
  renewToken,
}
