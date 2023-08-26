import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

const app: Express = express();

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  console.log('this worked');
  res.status(200).send('This worked!')
});

export default app;