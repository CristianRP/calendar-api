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

const loginUser = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User does not exists.'
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Not valid credentials',
      })
    }

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Failed, please reach the admin.'
    })
  }
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
