import { Router } from 'express';

const router = Router();

/* This route uses the authToken to make a RESTful API request to Github and receive the user's profile data */
router.get('/:authtoken', (req, res) => {
  console.log('Hit user data API');

  const token = req.params.authtoken;
  const url = 'https://api.github.com/user';
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
    .then((response) => response.json())
    /* After the JSON object promise is resolved, we can access the user's username under the 'login' key */
    .then(data => res.send(data));
});

export default router;