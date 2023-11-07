import { Router } from 'express';

import dotenv from 'dotenv';
import { query } from '../models/userModel';
dotenv.config();

const clientID: string | undefined = process.env.CLIENT_ID;
const clientSecret: string | undefined = process.env.CLIENT_SECRET;

const router = Router();

/* This route uses the code from the Github login redirect to make a request to Github for a token
The token is saved to the database under authToken and sent back to the frontend */

router.get('/:code', (req, res) => {
  const code = req.params.code;
  let authToken: string | null;
  console.log(`clientSecret: ${clientSecret}, clientID: ${clientID}`);
  fetch(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`)
    .then((response) => response.text())
    .then((token) => {
      /* Github API returns the authToken under the label 'token' */
      const stringParam = new URLSearchParams(token);
      authToken = stringParam.get('access_token');
      return res.status(200).send(authToken);
      /* Insert the token into the DB and return to frontend */
      return query('INSERT INTO users (authToken) VALUES ($1)', [authToken])
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
});

export default router;
