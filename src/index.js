import express from 'express';

import { userRepo } from './repositories/users.js';
import cookieSession from 'cookie-session';

const app = express();
const PORT = process.env.PORT || 3002;

// Custom body parser.... dont use in prod :)
// const bodyParser = (req, res, next) => {
//   if (req.method === 'POST') {
//     const body = [];

//     req
//       .on('data', (data) => {
//         body.push(data);
//       })
//       .on('end', () => {
//         const splitedBody = Buffer.concat(body).toString().split('&');

//         const formData = {};

//         for (let input of splitedBody) {
//           const [key, value] = input.split('=');
//           formData[key] = value;
//         }

//         req.body = formData;

//         next();
//       })
//       .on('error', (err) => next(err));
//   } else {
//     next();
//   }
// };

app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['very-secure-key1', 'very-secure-key2'], // TODO: move to env or config 🤔
  })
);

/** Sign up form endpoint */
app.get('/users/signup', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <p>
          <label>
            Email
            <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Password
            <input type="password" name="password" />
          </label>
        </p>
        <p>
          <label>
            Confirm password
            <input type="password" name="confirmPassword" />
          </label>
        </p>
        <p>
         <button>Sign Up</button>
        </p>
      </form>
    </div>
  `);
});

/** Storing user sign up details */
app.post('/users/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const existingUser = await userRepo.getOneBy({ email });

  if (existingUser) {
    return res.send('Email is already taken');
  }

  if (password !== confirmPassword) {
    return res.send('Password must match');
  }

  res.send('Account created');
});

/** Login form */
app.get('/users/signin', (req, res) => {});

/** Login user */
app.post('/users/signin', (req, res) => {});

/** Logout user */
app.post('/users/signout', (req, res) => {});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
