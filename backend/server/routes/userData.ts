import { Router } from 'express';

const router = Router();

router.get('/:authtoken', (req, res) => {
    console.log('Hit user data API')
    
    const token = req.params.authtoken;
    const url = `https://api.github.com/user`;
    console.log('About to fetch')
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    .then((response) => response.json())
    .then((text) => res.send(text.login))
})


    export default router;