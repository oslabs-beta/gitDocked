
import express from 'express';
import { Express } from 'express';
import bodyParser from 'body-parser';
import gitHubRouter from '../server/routes/gitHubRouter';
import containerRouter from'../server/routes/containerRouter';
// import { query } from './models/userModel';

const app: Express = express();

app.use(bodyParser.json());

//route for oauth through github
app.use('/api/github-oauth', (req, res, next) =>{
  console.log('hitting first route github-oauth');
  return next();
}, gitHubRouter);

//route for updating container data
app.use('/api/container', (req, res, next) =>{
  console.log('hitting sockerServer -> containerRouter');
  return next();
}, containerRouter);

export default app;