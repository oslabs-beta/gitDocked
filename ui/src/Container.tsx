import React, { useState, useEffect } from 'react';
import useStats from './useStats';

// this component shows a tile for each of the user's containers
// this includes active and inactive containers
export default function Container({ details, onPinToggle }) {
  // destructure the details prop which is an object holding information on the container

  const [stats, setStats] = useState({});

  // destructure id and name which we will grab from the container object
  const id = details.Id;
  const name = details.Names[0].slice(1);

  useEffect(() => {
    // calls useStats on an interval
    const id = setInterval(() => {
      useStats(name)
        // useStats returns a promise which is thenable
        .then((data) => {
          // remove line breaks
          const cleanedStdout = data.stdout.trim();

          // Replace the curly braces with double quotes to make it valid JSON
          const validJsonString = cleanedStdout.replace(/{/g, '{"').replace(/}/g, '"}').replace(/,/g, '","').replace(/:/g, '":"');
          // add the curly brackets back in
          const addedCurlyBracketsJsonString = ` { "${validJsonString}" }`;
          // Now parse the JSON string into an object
          const parsedObject = JSON.parse(addedCurlyBracketsJsonString);
          setStats({ ...parsedObject });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1500);

    // clean up function
    return () => clearInterval(id);
  }, [name]);

  return (
    <div className='container'>
      {/* Invoke slice method on id so that we have the shorter version of the ID which fits inside the size of the component */}
      <div className='pin-button'>
        <h4>Container ID: {id.slice(-10)}</h4>
        <button className='pin' onClick={onPinToggle}>Pin</button>
      </div>
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
