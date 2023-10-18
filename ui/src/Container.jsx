import React, { useState, useEffect } from 'react';
import useStats from './useStats';

// this component shows a tile for each of the user's containers
// this includes active and inactive containers
export default function Container({ details }) {
  // destructure the details prop which is an object holding information on the container

  const [stats, setStats] = useState({});

  // declaring variables for id and name which we will grab from the container object
  console.log(details);
  const id = details.Id;
  const name = details.Names[0].slice(1);

  useEffect(() => {
    // calls useStats on an interval
    const id = setInterval(() => {
      console.log('THIS IS THE NAME', name);
      useStats(name)
        // useStats returns a promise which is thenable
        .then((data) => {
          // console.log('this is what to show on dashboard', data.stdout);
          console.log('this is data', data);
          console.log('this is data stdout', data.stdout);
          const cleanedStdout = data.stdout.trim();

          // Replace the curly braces with double quotes to make it valid JSON
          const validJsonString = cleanedStdout.replace(/{/g, '{"').replace(/}/g, '"}').replace(/,/g, '","').replace(/:/g, '":"');
          // add the curly brackets back in
          const addedCurlyBracketsJsonString = ` { "${validJsonString}" }`;
          // Now parse the JSON string into an object
          const parsedObject = JSON.parse(addedCurlyBracketsJsonString);

          console.log(parsedObject);
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
