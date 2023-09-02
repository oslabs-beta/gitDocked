import react from "react"
import Container from "./Container"

export default function ContainerHealth() {

  return (
    <>
    <h2>Compare App Health</h2>
      <div className="health-buttons">
        <button>Overview</button>
        <button>Container</button>
      </div>
    <div className="health-items">
      <Container />
      <Container />
    </div>
    </>
  )
}