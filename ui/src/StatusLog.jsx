import react from "react"
import {useState} from "react"

export default function StatusLog() {
  const testLogs = ['Pull request initiated', 'Checking mergeability', 'Pushing to DockerHub', 'Deploying to AWS']

  const [logItem, setLogItem] = useState([``])

  function handleButtonClick() {
    let index = 0
    setLogItem([`User initiated pull request at ${new Date().toLocaleTimeString()}`, ...logItem])
    const interval = setInterval(() => {
      setLogItem(prevItems => [...prevItems, testLogs[index]])
      index++
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
    }, 3000)
  }

  return (
    <>
      <h2>Github Actions</h2>
      <button onClick={handleButtonClick}>Pull Request</button>
      <ul className="log-list">
        {logItem.map((log, index) => {
          return <li key={index}>{log}</li>
        })}
      </ul>
    </>
  )
}