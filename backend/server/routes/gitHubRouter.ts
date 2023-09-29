import { Router } from 'express';

import dotenv from 'dotenv';
dotenv.config();

const clientID: string | undefined = process.env.CLIENT_ID;
const clientSecret: string | undefined = process.env.CLIENT_SECRET;

const router = Router();

router.get('/:code', (req, res) => {
  const code = req.params.code;
  let authToken: string | null;
  console.log(`clientSecret: ${clientSecret}, clientID: ${clientID}`);
  fetch(
    `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`)
    .then((response) => response.text())
    .then((token) => {
      const stringParam = new URLSearchParams(token);
      authToken = stringParam.get('access_token');
      return res.status(200).send(authToken);
    });
});

export default router;