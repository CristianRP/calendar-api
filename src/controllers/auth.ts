import {  Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import { generateJWT } from '../helpers/jwt';
import { CustomRequest } from '../middlewares/validate-jwt';

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

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
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

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Failed, please reach the admin.'
    })
  }
}

const renewToken = async(req: CustomRequest, res: Response) => {

  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid!, name!);

  res.json({
    ok: true,
    token,
  })
}

export {
  createUser,
  loginUser,
  renewToken,
}
