
import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import gitHubRouter from '../server/routes/gitHubRouter'
import cors from 'cors';

const app: Express = express();

app.use(bodyParser.json());
// app.use(cors);

app.use('/api/github-oauth', (req, res, next) =>{
    console.log('hitting first route github-oauth')
    return next();
}, gitHubRouter);
// app.get('/api', (req, res) => {
//     console.log('api hit')
//     res.status(200).send('api worked');
// });

export default app;