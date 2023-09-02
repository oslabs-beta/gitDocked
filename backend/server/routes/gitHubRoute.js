import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.get('/login', (req, res, next) => {
  const client_id = '32239c9ebb7b81c40e9d';
  const client_secret = '49f9dc62e838915e1ca271715de3b57fdb385dbb';
  ddClient.host.openExternal(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}`);
})



console.log(REDIRECT_URI);