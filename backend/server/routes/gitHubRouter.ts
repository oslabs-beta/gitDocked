import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.get('/', (req, res) => {
// const code = req.params.code;
return res.status(200).send('api worked');
// fetch(
//     `https://github.com/login/oauth/access_token?client_id=32239c9ebb7b81c40e9d&client_secret=49f9dc62e838915e1ca271715de3b57fdb385dbb&code=${code}`)
//     .then((response) => response.text())
//     .then((token) => {
//       console.log('token', token);
//       authToken = token;
//       return;
//     });
//     return res.json(authToken);
 }
)


console.log(process.env.REDIRECT_URI);

export default router;