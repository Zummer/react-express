import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

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
      res.status(401).json({
        message: 'Invalid Credentials'
      });

    }
  } catch (e) {
    console.log(e);
  }


});

export default router;
