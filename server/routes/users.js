import express from 'express';
import bcrypt from 'bcrypt';
import validateInput from '../shared/validations/signup';

import User from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {
  const {errors, isValid} = validateInput(req.body);

  if(isValid){
    const {username, timezone, email, password} = req.body;
    const password_diggest = bcrypt.hashSync(password, 10);

    User.forge({ 
      username, timezone, email, password_diggest
    }, {
      hasTimestamps: true
    })
      .save()
      .then(user => res.json({
        success: true
      }))
      .catch(err => res.status(500).json({
        error: err
      }));

  } else {
    res.status(400).json(errors);
  }

});

export default router;
