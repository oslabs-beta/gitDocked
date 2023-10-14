
import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import gitHubRouter from '../server/routes/gitHubRouter'
import workflowLogs from '../server/routes/workflowLogs'
import cors from 'cors';
import userData from '../server/routes/userData'

const app: Express = express();

app.use(bodyParser.json());
// app.use(cors);

app.use('/api/github-oauth', (req, res, next) =>{
    console.log('hitting first route github-oauth')
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