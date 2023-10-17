
import express from 'express';
import { Express } from 'express';
import bodyParser from 'body-parser';
import gitHubRouter from '../server/routes/gitHubRouter';
import workflowLogs from '../server/routes/workflowLogs'
// import { query } from './models/userModel';
import userData from '../server/routes/userData'

const app: Express = express();

app.use(bodyParser.json());

//route for oauth through github
app.use('/api/github-oauth', (req, res, next) =>{
  console.log('hitting first route github-oauth');
  return next();
}, gitHubRouter);

app.use('/api/workflow-logs', (req, res, next) =>{
    console.log('hitting workflow logs api')
    return next();
}, workflowLogs);

app.use('/api/user-info', (req, res, next) =>{
    console.log('hitting user info API')
    return next();
}, userData);
// app.get('/api', (req, res) => {
//     console.log('api hit')
//     res.status(200).send('api worked');
// });

export default app;