import {  Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/User';

const createUser = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists.'
      });
    }
    
    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    })
  } catch(error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Failed, please reach the admin.'
    })
  } 
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
