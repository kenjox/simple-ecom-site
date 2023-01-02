import express from 'express';
import cookieSession from 'cookie-session';
import authRoutes from './routes/admin/auth.js';

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

app.use(authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
