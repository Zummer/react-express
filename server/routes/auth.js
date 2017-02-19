import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

class InvalidCredError extends Error {
  constructor(message) {
    super(); // (A)
    this.name = 'InvalidCredError';
    this.message = message;
    Error.captureStackTrace(this, InvalidCredError); // added

  }

}

router.post('/', async (req, res) => {
  const {identifier, password} = req.body;

  try {
    const user = await User.query({
      where: {username: identifier},
      orWhere: {email: identifier}
    }).fetch();

    if (user && bcrypt.compareSync(password, user.get('password_diggest'))) {
      const token = jwt.sign({
        id: user.get('id'),
        username: user.get('username')
      }, config.jwtSecret);
      res.json({token});
    } else {
      throw new InvalidCredError('Invalid Credentials');
    }
  } catch (e) {
    console.log({name: e.name, message: e.message});
    if (e instanceof InvalidCredError) {
      res.status(401).json(e);
    } else {
      res.status(500).json(e);
    }
  }


});

export default router;
