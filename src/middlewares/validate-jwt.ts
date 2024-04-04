import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  uid?: string;
  name?: string;
} 

const validateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token provided'
    })
  }

  try {
    const { uid, name } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED!
    ) as { uid: string; name: string }

    req.uid = uid;
    req.name = name;
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'No valid Token',
    })
  }

  next();
}

export {
  validateJWT
}
