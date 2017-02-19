import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';
import isEmpty from 'lodash/isEmpty';

export default async (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = await jwt.verify(token, config.jwtSecret);
      const user = await User.query({
        where: {id: decoded.id},
        select: ['id', 'username', 'email']
      }).fetch();

      if (!user) {
        res.status(404).json({
          message: 'No such user'
        })
      } else {
        req.currentUser = user;
        next();
      }

    } catch (e) {
      res.status(401).json({
        error: e,
        message: 'Failed authentication'
      });
    }
  } else {
    res.status(403).json({
      message: 'No token provided'
    })
  }
}
