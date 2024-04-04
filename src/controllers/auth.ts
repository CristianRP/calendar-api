import {  Request, Response } from 'express';

const createUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

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
