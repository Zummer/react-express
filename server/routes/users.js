import express from 'express';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import commonValidations from '../shared/validations/signup';

import User from '../models/user';

const validateInput = (data, otherValidations) => {
  let {errors} = otherValidations(data);

  return User.query({
    where: {email: data.email},
    orWhere: {username: data.username}
  })
    .fetch()
    .then(user => {
      if (user) {
        if (user.get('username') === data.username) {
          errors.username = 'Уже есть пользователь с таким именем';
        }
        if (user.get('email') === data.email) {
          errors.email = 'Уже есть пользователь с такой почтой';
        }
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };

    })
}

let router = express.Router();

router.get('/:identifier', (req, res) => {

  let query;

  if(
    !isEmpty(req.query) &&
    req.query.field &&
    ['username', 'email'].some(field => field == req.query.field)
  ) {

    const field = req.query.field;

    query = User.query({
      select: [field],
      where: {[field]: req.params.identifier}
    });

  } else {
    query = User.query({
      select: ['username', 'email'],
      where: {username: req.params.identifier},
      orWhere: {email: req.params.identifier}
    });
  }

  query
    .fetch()
    .then(
      (user) => res.json({user})
    );
})

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({errors, isValid}) => {
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
          error: err,
          message: err.message
        }));

    } else {
      res.status(400).json(errors);
    }

  });

});

export default router;
