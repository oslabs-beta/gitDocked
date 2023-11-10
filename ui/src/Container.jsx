import React, { useState, useEffect, useRef } from 'react';
import useStats from './useStats';
import { createDockerDesktopClient } from '@docker/extension-api-client';


// this component shows a tile for each of the user's containers
// this includes active and inactive containers
export default function Container({ details }) {
  // destructure the details prop which is an object holding information on the container
  const ddClient = createDockerDesktopClient();

  const [stats, setStats] = useState({});
  const [minMaxAvg, setminMaxAvg] = useState({ 
    containername: details.Names[0].slice(1),
    containerid: details.Id,
    numdatapoints: 0,
    avgcpuperc: 0, 
    mincpuperc: 101,
    maxcpuperc: -1,
    avgmemusage: 0,
    minmemusage: 101,
    maxmemusage: -1,
    avgmemperc: 0,
    minmemperc: 101,
    maxmemperc: -1,
    avgnetio: 0,
    minnetio: 101,
    maxnetio: -1,
    avgblockio: 0,
    minblockio: 101,
    maxblockio: -1
  });

  const minMaxAvgRef = useRef(minMaxAvg);

  // declaring variables for id and name which we will grab from the container object
  const id = details.Id;
  const name = details.Names[0].slice(1);
  //write initial request to database to pull any previous container information exists

  //initial useEffect to get previous container information from database
  useEffect(() => {
    async function fetchStats() {
      try {
        console.log('trying to get container data');
        const response = await ddClient.extension.vm?.service?.get(`/api/container/${id}`);
        console.log('get response: ', response);
        // console.log('get response status code: ', response[0].statusCode);
        if (response) {
          // const existingStats = await response.json();
          //remove quotes from decimal numbers
          for (const key in response) {
            if (!isNaN(response[key])) {
              response[key] = parseFloat(response[key]);
            }
          }
          console.log('stats after removing quotes: ', response);

          setminMaxAvg({...minMaxAvg, ...response});
        } else {
          //everything in this else statement can be deleted
          console.log('no data was retrieved');
        }
      } catch (error) {
        console.log('error status code from get request', error.statusCode);
        if (error.statusCode === 404) {
          //if get request sends back error 404 (data not found), try posting new container to database
          console.log('trying to post container data status code 404');
          try {
            const postData = minMaxAvg;
            console.log('postData: ', postData);
            const postResponse = await ddClient.extension.vm?.service?.post(`/api/container/${id}`, postData);
            console.log('response post:', postResponse);
            if (postResponse) {
              console.log('Data posted successfully for: ', name);
            } else {
              console.error('Error within try block posting new containers stats to database', postResponse);
            }
          } catch (error) {
            console.error('Error within catch posting new containers stats to database: ', error);
          }
        }
        else {
          //for all other errors
          console.error('Error fetching stats from database', error);
        }
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
  
    // calls useStats on an interval
    const id = setInterval(() => {
      // console.log('THIS IS THE NAME', name);
      useStats(name)
        // useStats returns a promise which is thenable
        .then((data) => {
          // console.log('this is what to show on dashboard', data.stdout);
          // console.log('this is data', data);
          // console.log('this is data stdout', data.stdout);
          const cleanedStdout = data.stdout.trim();
          // console.log('cleanedStdout: ', cleanedStdout);

          // Replace the curly braces with double quotes to make it valid JSON
          const validJsonString = cleanedStdout.replace(/{/g, '{"').replace(/}/g, '"}').replace(/,/g, '","').replace(/:/g, '":"');
          // console.log('json data: ', validJsonString);
          // add the curly brackets back in
          const addedCurlyBracketsJsonString = ` { "${validJsonString}" }`;
          // Now parse the JSON string into an object
          const parsedObject = JSON.parse(addedCurlyBracketsJsonString);

          // console.log('final parsed object: ', parsedObject);
          setStats({ ...parsedObject });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1500);

    return () => clearInterval(id);
  }, []);

  //use effect to calculate average stats
  useEffect(() => {
    // console.log('these are the stats: ', stats);
    // Function to extract numbers from a string
    function extractNumbersFromString(inputString) {
      const numbers = inputString.match(/[\d.]+/g);
      return numbers ? numbers.map(Number) : [];
    }

    // Extract numbers from the stats object
    const extractedNumbers = {};
    for (const key in stats) {
      if (key === 'Container' || key === 'Name') {
        extractedNumbers[key] = stats[key];
      } else{
        extractedNumbers[key] = extractNumbersFromString(stats[key]);
        if (key === 'MemPerc') extractedNumbers[key] /= 100;
      }
    }
    // console.log('extractedNumbers: ', extractedNumbers);
    if (extractedNumbers.Container) {
      const count = minMaxAvg.numdatapoints;
      //calculate average, min, and max from previous state updated with newly retrieved stats
      const newMinMaxAvg = { 
        numdatapoints: count + 1,
        avgcpuperc: ((minMaxAvg.avgcpuperc*count + extractedNumbers.CPUPerc[0]) / (count + 1)), 
        mincpuperc: Math.min(minMaxAvg.mincpuperc, extractedNumbers.CPUPerc[0]),
        maxcpuperc: Math.max(minMaxAvg.mincpuperc, extractedNumbers.CPUPerc[0]),
        avgmemusage: ((minMaxAvg.avgmemusage*count + extractedNumbers.MemUsage[0]) / (count + 1)),
        minmemusage: Math.min(minMaxAvg.avgmemusage, extractedNumbers.MemUsage[0]),
        maxmemusage: Math.max(minMaxAvg.avgmemusage, extractedNumbers.MemUsage[0]),
        avgmemperc: ((minMaxAvg.avgmemperc*count + extractedNumbers.MemPerc) / (count + 1)),
        minmemperc: Math.min(minMaxAvg.avgmemperc, extractedNumbers.MemPerc),
        maxmemperc: Math.max(minMaxAvg.avgmemperc, extractedNumbers.MemPerc),
        avgnetio: ((minMaxAvg.avgnetio*count + extractedNumbers.NetIO[0]) / (count + 1)),
        minnetio: Math.min(minMaxAvg.avgnetio, extractedNumbers.NetIO[0]),
        maxnetio: Math.max(minMaxAvg.avgnetio, extractedNumbers.NetIO[0]),
        avgblockio: ((minMaxAvg.avgblockio*count + extractedNumbers.BlockIO[0]) / (count + 1)),
        minblockio: Math.min(minMaxAvg.avgblockio, extractedNumbers.BlockIO[0]),
        maxblockio: Math.max(minMaxAvg.avgblockio, extractedNumbers.BlockIO[0])
      };

      // console.log('newMinMaxAvg: ', newMinMaxAvg);

      setminMaxAvg({...minMaxAvg, ...newMinMaxAvg });
    }
    

  }, [stats]);

  useEffect(() => {
    // console.log('true minMaxAvg: ', minMaxAvg);
    minMaxAvgRef.current = minMaxAvg;
  }, [minMaxAvg]);

  //useEffect to upload state to the database every 5 minutes
  useEffect(() => {
    
    const idInt = setInterval(() => {
      console.log('state to be uploaded ', minMaxAvgRef.current);
      const statsUpload = minMaxAvgRef.current;

      async function fetchStats() {
        try {
          console.log('trying to get container data');
          const response = await ddClient.extension.vm?.service?.put(`/api/container/${id}`, statsUpload);
          console.log('database stats sync response: ', response);
        } catch (error) {
          console.log('error from syncing database stats: ', error);
        }
      }
      fetchStats();
    }, 60000);

    return () => clearInterval(idInt);

  }, []);


  return (
    <div className='container'>
      {/* Invoke slice method on id so that we have the shorter version of the ID which fits inside the size of the component */}
      <h4>Container ID: {id.slice(-10)}</h4>
      <h5>Container Name: {name}</h5>
      <h5>CPU Percentage: {stats.CPUPerc}</h5>
      <h5>Memory Usage: {stats.MemUsage}</h5>
      <h5>Net IO: {stats.NetIO}</h5>
      <h5>Block IO: {stats.BlockIO}</h5>

      {/* Still have to add functionality for these buttons */}
      <div className='button-wrapper'>
        <button className='small-button'>Start</button>
        <button className='small-button'>Pause</button>
        <button className='small-button'>Restart</button>
        <button className='small-button'>Delete</button>
      </div>
    </div>
  );
}


/*{Container: 'gitdocked', Name: 'gitdocked', CPUPerc: '0.00%', MemUsage: '42.89MiB / 7.671GiB', MemPerc: '0.55%', …}
BlockIO
: 
"0B / 2.21MB"
CPUPerc
: 
"0.00%"
Container
: 
"gitdocked"
MemPerc
: 
"0.55%"
MemUsage
: 
"42.89MiB / 7.671GiB"
Name
: 
"gitdocked"
NetIO
: 
"4.43MB / 19.9kB"
*/