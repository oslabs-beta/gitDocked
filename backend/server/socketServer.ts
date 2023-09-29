
import express from 'express';
import { Express } from 'express';
import bodyParser from 'body-parser';
import gitHubRouter from '../server/routes/gitHubRouter';

const app: Express = express();

app.use(bodyParser.json());

app.use('/api/github-oauth', (req, res, next) =>{
  console.log('hitting first route github-oauth socketServer.ts file');
  return next();
}, gitHubRouter);

export default app;