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

  const user = await userRepo.save({ email, password });

  req.session.userId = user.id;

  res.send('Account created!!');
});

/** Login form */
app.get('/users/signin', (req, res) => {
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
        <button>Sign In</button>
        </p>
      </form>
    </div>
  `);
});

/** Login user */
app.post('/users/signin', async (req, res) => {
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
app.get('/users/signout', (req, res) => {
  req.session = null;

  res.send('You are logged out 👋🏿');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
