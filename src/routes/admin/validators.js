import { check } from 'express-validator';

import { userRepo } from '../../repositories/users.js';

const requireEmail = check('email')
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage('Must provide a valid email address')
  .custom(async (email) => {
    const existingUser = await userRepo.getOneBy({ email });

    if (existingUser) {
      throw new Error('Email is already taken');
    }
  });

const requirePassword = check('password')
  .trim()
  .isLength({ min: 6, max: 20 })
  .withMessage('Password must be between 6 and 20 characters');

const requireConfirmPassword = check('confirmPassword')
  .trim()
  .custom((confirmPassword, { req }) => {
    if (confirmPassword !== req.body.password) {
      throw new Error('Passwords must match');
    }
  });

const signupValidator = () => [
  requireEmail,
  requirePassword,
  requireConfirmPassword,
];

export { signupValidator };
