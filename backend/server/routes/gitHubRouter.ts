import { Router } from 'express';
import dotenv from 'dotenv';
import { query } from '../models/userModel';
dotenv.config();

const router = Router();

router.get('/:code', (req, res) => {
const code = req.params.code;
let authToken: any;
fetch(
    `https://github.com/login/oauth/access_token?client_id=32239c9ebb7b81c40e9d&client_secret=49f9dc62e838915e1ca271715de3b57fdb385dbb&code=${code}`)
    .then((response) => response.text())
    .then((token) => {
      const stringParam = new URLSearchParams(token);
      authToken = stringParam.get('access_token');
      return query(
        'INSERT INTO users (authToken, test) VALUES ($1, $2)',
        [authToken, 'testString']
      )
      .then(() => {
        console.log('Database INSERT successful');
        return res.status(200).send(authToken);
      })
      .catch((error) => {
        //error handler during oauth process
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
      });
    });
 }
)


console.log(process.env.REDIRECT_URI);

export default router;