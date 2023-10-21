import { Router } from 'express';
import { container } from '../controllers/containerController';
import { query } from '../models/userModel';
const router = Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log('get id: ', id);
  const result = await query('SELECT * FROM containers WHERE containerid = $1', [id]);
  try {
    if (result.rows.length > 0) {
      console.log('successful query (get)');
      return res.status(200).json(result.rows);
    } else {
      console.log('container not found');
      return res.status(404).send({ error: 'container not found'} );
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    return res.status(500).json( {error: 'Internal server error' });
  }
});

router.post('/:id', async (req, res) => {
  const id = req.params.id;
  const postData = req.body;
  const values = [
    postData.containerName, postData.containerID, postData.numDataPoints,
    postData.avgCPUPerc, postData.minCPUPerc, postData.maxCPUPerc,
    postData.avgMemUsage, postData.minMemUsage, postData.maxMemUsage,
    postData.avgMemPerc, postData.minMemPerc, postData.maxMemPerc,
    postData.avgNetIO, postData.minNetIO, postData.maxNetIO,
    postData.avgBlockIO, postData.minBlockIO, postData.maxBlockIO
  ];
  console.log('postData: ', postData);
  console.log('post id: ', id);
  //insert container metrics into to database
  try {
    query('INSERT INTO containers (containername, containerid, numdatapoints, avgcpuperc, mincpuperc, maxcpuperc, avgmemusage, minMemUsage, maxMemUsage, avgMemPerc, minMemPerc, maxMemPerc, avgNetIO, minNetIO, maxNetIO, avgBlockIO, minBLockIO, maxBlockIO) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) ON CONFLICT (containerID) DO NOTHING', values);
    return res.status(200).send(`data inserted successfully for ${id}`);
  } catch (error) {
    console.error('Error inserting data:', error);
    return res.status(500).json( {error: 'Internal Server Error' });
  }
});



export default router;