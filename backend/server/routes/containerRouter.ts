import { Router } from 'express';
import { container } from '../controllers/containerController';
import { query } from '../models/userModel';
const router = Router();

//get container stats from database
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log('get id: ', id);
  const result = await query('SELECT * FROM containers WHERE containerid = $1', [id]);
  try {
    if (result.rows.length > 0) {
      console.log('successful query (get): ', result.rows[0]);
      const resultObject = result.rows[0];
      return res.status(200).json(resultObject);
    } else {
      console.log('container not found');
      return res.status(404).send({ error: 'container not found'} );
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    return res.status(500).json( {error: 'Internal server error' });
  }
});

//post new container data to database
router.post('/:id', async (req, res) => {
  const id = req.params.id;
  const postData = req.body;
  const values = [
    postData.containername, postData.containerid, postData.numdatapoints,
    postData.avgcpuperc, postData.mincpuperc, postData.maxcpuperc,
    postData.avgmemusage, postData.minmemusage, postData.maxmemusage,
    postData.avgmemperc, postData.minmemperc, postData.maxmemperc,
    postData.avgnetio, postData.minnetio, postData.maxnetio,
    postData.avgblockio, postData.minblockio, postData.maxblockio
  ];
  // console.log('postData: ', postData);
  // console.log('post id: ', id);
  //insert container metrics into to database
  try {
    query('INSERT INTO containers (containername, containerid, numdatapoints, avgcpuperc, mincpuperc, maxcpuperc, avgmemusage, minMemUsage, maxMemUsage, avgMemPerc, minMemPerc, maxMemPerc, avgNetIO, minNetIO, maxNetIO, avgBlockIO, minBLockIO, maxBlockIO) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) ON CONFLICT (containerid) DO NOTHING', values);
    return res.status(200).send(`data inserted successfully for ${id}`);
  } catch (error) {
    console.error('Error inserting data:', error);
    return res.status(500).json( {error: 'Internal Server Error' });
  }
});

//put route for data synchronization from front end.
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const putData = req.body;
  console.log('putData: ', putData);
  // console.log('put id: ', id);
  const values = [
    putData.containerid, putData.numdatapoints,
    putData.avgcpuperc, putData.mincpuperc, putData.maxcpuperc,
    putData.avgmemusage, putData.minmemusage, putData.maxmemusage,
    putData.avgmemperc, putData.minmemperc, putData.maxmemperc,
    putData.avgnetio, putData.minnetio, putData.maxnetio,
    putData.avgblockio, putData.minblockio, putData.maxblockio
  ];
  console.log('values: ', values);

  //update container metrics during data synchronization
  try {
    const result = await query('UPDATE containers SET numdatapoints = $2, avgcpuperc = $3, mincpuperc = $4, maxcpuperc = $5, avgmemusage = $6, minMemUsage = $7, maxMemUsage = $8, avgMemPerc = $9, minMemPerc = $10, maxMemPerc = $11, avgNetIO = $12, minNetIO = $13, maxNetIO = $14, avgBlockIO = $15, minBLockIO = $16, maxBlockIO = $17 WHERE containerid = $1 RETURNING *', values);
    console.log('Updated data: ', result.rows);
    return res.status(200).send(`Data updated successfully for ${id}`);
  } catch (error) {
    console.error('Error updating data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;