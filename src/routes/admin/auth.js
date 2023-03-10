import express from 'express';

import { userRepo } from '../../repositories/users.js';
import { signinTemplate } from '../../views/admin/auth/signin.js';
import { signupTemplate } from '../../views/admin/auth/signup.js';
import { signupValidator } from './validators.js';
import { validationResult } from 'express-validator';

const router = express.Router();

/** Sign up form endpoint */
router.get('/users/signup', (req, res) => {
  res.send(signupTemplate({}));
});

/** Storing user sign up details */
router.post('/users/signup', [signupValidator()], async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  console.log(errors.mapped());

  if (!errors.isEmpty()) {
    return res.send(signupTemplate({ errors }));
  }

  const user = await userRepo.save({ email, password });

  req.session.userId = user.id;

  res.send('Account created!!');
});

/** Login form */
router.get('/users/signin', (req, res) => {
  res.send(signinTemplate());
});

/** Login user */
router.post('/users/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await userRepo.getOneBy({ email });

  if (!user) {
    return res.send('Invalid email or password');
  }

  if (user.email !== email) {
    return res.send('Invalid email or password');
  }

  const isValidPassword = await userRepo.comparePasswords({
    saved: user.password,
    supplied: password,
  });

  if (!isValidPassword) {
    return res.send('Invalid email or password');
  }

  req.session.userId = user.id;

  res.send('Signed in 🎉🎉🎉');
});

/** Logout user */
router.get('/users/signout', (req, res) => {
  req.session = null;

  res.send('You are logged out 👋🏿');
});

export default router;
