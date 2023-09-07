import react from "react"
import {useEffect} from "react"

// this component shows a tile for each of the user's containers
// this includes active and inactive containers
export default function Container({details}) {
  // destructure the details prop which is an object holding information on the container

  // declaring variables for id and name which we will grab from the container object
  const id = details.Id
  const name = details.Names

  return (
    <div className="container">
      {/* Invoke slice method on id so that we have the shorter version of the ID which fits inside the size of the component */}
      <p>Container ID: {id.slice(-10)}</p>
      <h6>Container_Name: {name}</h6>
      {/* Still have to grab info for the below header tags*/}
      <h6>CPU</h6>
      <h6>Memory</h6>
      <h6>Network I/O</h6>

      {/* Still have to add functionality for these buttons */}
      <button className="small-button">Start</button>
      <button className="small-button">Pause</button>
      <button className="small-button">Restart</button>
      <button className="small-button">Delete</button>
    </div>
  )
}