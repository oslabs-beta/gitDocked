
import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import gitHubRouter from '../server/routes/gitHubRouter'
import cors from 'cors';
import { query } from './models/userModel';

const app: Express = express();

app.use(bodyParser.json());
// app.use(cors);

//route for oauth through github
app.use('/api/github-oauth', (req, res, next) =>{
    console.log('hitting first route github-oauth')
    console.log('trying database connection');
    return next();
}, gitHubRouter);

//database test route

//test route
// app.get('/api', (req, res) => {
//     console.log('api hit')
//     res.status(200).send('api worked');
// });

export default app;