import React from 'react';
import { useEffect } from 'react';

// this component shows a tile for each of the user's containers
// this includes active and inactive containers
export default function Container({ details }) {
  // destructure the details prop which is an object holding information on the container

  // declaring variables for id and name which we will grab from the container object
  const id = details.Id;
  const name = details.Names;

  return (
    <div className="container">
      {/* Invoke slice method on id so that we have the shorter version of the ID which fits inside the size of the component */}
      <h4>Container ID: {id.slice(-10)}</h4>
      <h5>Container_Name: {name}</h5>
      {/* Still have to grab info for the below header tags*/}
      <h5>CPU</h5>
      <h5>Memory</h5>
      <h5>Network I/O</h5>

      {/* Still have to add functionality for these buttons */}
      <button className="small-button">Start</button>
      <button className="small-button">Pause</button>
      <button className="small-button">Restart</button>
      <button className="small-button">Delete</button>
    </div>
  );
}
