
import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import gitHubRouter from '../server/routes/gitHubRouter'
import cors from 'cors';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors);

// app.use('/api/github-oauth', gitHubRouter);
app.get('/api', (req, res)=>{
    res.status(200).send('api worked')
});

export default app;