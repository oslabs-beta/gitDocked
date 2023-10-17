import { Router } from 'express';
import dotenv from 'dotenv';
import convertBody from 'fetch-charset-detection';
import request from 'request';
import * as fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import decompress from 'decompress';


dotenv.config();

const router = Router();


router.get('/:authtoken', (req, res) => {
  console.log('Hit workflow logs API')
  
  const token = req.params.authtoken;
  const url = `https://api.github.com/repos/GitDocked-Mock-User-App/To-Do-App/actions/runs/6346173281/logs`;
  console.log('About to fetch')
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  .then((response) => response.arrayBuffer())
  .then((array) => {
    fs.writeFileSync('./downloadedLogs.zip', Buffer.from(array), { flag: 'w' })
    fs.readFile('./downloadedLogs.zip', (err, data)=> {
      if (err) {
        throw err;
      } else {
          JSZip.loadAsync(data).then((zip) => zip.files['1_build_push.txt'].async("text"))
          .then((txt) => res.send(txt));
      }
    });
  });
})



// console.log(process.env.REDIRECT_URI);

export default router;