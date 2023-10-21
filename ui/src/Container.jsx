import React, { useState, useEffect } from 'react';
import useStats from './useStats';
import { createDockerDesktopClient } from '@docker/extension-api-client';


// this component shows a tile for each of the user's containers
// this includes active and inactive containers
export default function Container({ details }) {
  // destructure the details prop which is an object holding information on the container
  const ddClient = createDockerDesktopClient();

  const [stats, setStats] = useState({});
  const [minMaxAvg, setminMaxAvg] = useState({ 
    containerName: details.Id,
    containerID: details.Names[0].slice(1),
    numDataPoints: 0,
    avgCPUPerc: 0, 
    minCPUPerc: 101,
    maxCPUPerc: -1,
    avgMemUsage: 0,
    minMemUsage: 101,
    maxMemUsage: -1,
    avgMemPerc: 0,
    minMemPerc: 101,
    maxMemPerc: -1,
    avgNetIO: 0,
    minNetIO: 101,
    maxNetIO: -1,
    avgBlockIO: 0,
    minBlockIO: 101,
    maxBlockIO: -1
  });

  // declaring variables for id and name which we will grab from the container object
  const id = details.Id;
  const name = details.Names[0].slice(1);
  //write initial request to database to pull any previous container information exists

  useEffect(() => {
    async function fetchStats() {
      try {
        console.log('trying to get container data');
        const response = await ddClient.extension.vm?.service?.get(`/api/container/${id}`);
        console.log('get response: ', response);
        if (response.statusCode === 200) {
          // const existingStats = await response.json();
          console.log('existingStats: ', response);
          // setminMaxAvg(existingStats);
        } else {
          console.log('trying to post container data');
          try {
            const postData = {'id': id, 'name': name};
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
      } catch (error) {
        console.log('error status code from get request', error.statusCode);
        if (error.statusCode === 404) {
          console.log('trying to post container data');
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
          console.error('Error fetching stats from database', error);
        }
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    //update state with this information
    //interval every 5 minutes to sync database
    //this should be done for all containers at the same time.

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
