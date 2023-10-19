import { Router } from 'express';
import dotenv from 'dotenv';
import * as fs from 'fs';
import JSZip from 'jszip';


dotenv.config();

const router = Router();

/* This route makes a RESTful API request to Github for the latest workflow run data */
router.get('/:authtoken', (req, res) => {
  const token = req.params.authtoken;
  /* Before we pull the workflow run logs, we need to get the ID for the most recent workflow */
  const workflowUrl = `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/actions/workflows/${process.env.WORKFLOW_ID}/runs`;
  fetch(workflowUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then((response)=> response.json())
  .then((runs)=> { 
    const runID = runs.workflow_runs[0];
    return runID.id;
  }).then((id)=> {
    /* Now that we have the ID, we can make a REST API request for the logs */
      const url = `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/actions/runs/${id}/logs`;
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
    .then((response) => response.arrayBuffer())
    .then((array) => {
      /* The data from the API is received as binary data, which we will convert to a Buffer and write to the container */
      fs.writeFileSync('./downloadedLogs.zip', Buffer.from(array), { flag: 'w' })
      /* Now that it is converted to a zip file, we can parse the folder and pull the txt data for the logs */
      fs.readFile('./downloadedLogs.zip', (err, data)=> {
        if (err) {
          throw err;
        } else {
            /*JSZip will read the data from the zip file and create a JSZip object containing our txt files.
            We will parse through the txt files to the one we need and send it back to the frontend */
            JSZip.loadAsync(data).then((zip) => zip.files['1_build_push.txt'].async("text"))
            .then((txt) => {
              let newTxt = txt;
              let date = ''
              for(let i = 0; i < newTxt.length; i++){
                let yearChecker = newTxt.slice(i, i + 4)
                if(yearChecker === '2023'){
                  date += newTxt[i];
                  for(let j = i + 1; j < i + 29; j++){
                    date += newTxt[j];
                    if(newTxt[j] === 'Z'){
                      newTxt = newTxt.replace(`${date}`, '$')
                      date = ''
                      break;
                    }
                  }
                }
              }
              return res.send(newTxt)
            });
          }
      });
    });
    })
})

export default router;