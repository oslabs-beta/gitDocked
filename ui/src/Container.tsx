import react from "react"

export default function Container() {

  return (
    <div className="container">
      <p>Container ID</p>
      <h6>Container_Name</h6>
      <h6>CPU</h6>
      <h6>Memory</h6>
      <h6>Network I/O</h6>

      <button className="small-button">Start</button>
      <button className="small-button">Pause</button>
      <button className="small-button">Restart</button>
      <button className="small-button">Delete</button>

    </div>
  )
}