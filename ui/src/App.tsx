import React from 'react';
import {useState, useEffect} from "react"
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Stack, TextField, Typography } from '@mui/material';
import './styles.css'
import Container from './Container';
import StatusLog from './StatusLog';
import ContainerHealth from './ContainerHealth';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const ddClient = createDockerDesktopClient();
// const client = createDockerDesktopClient()

// function useDockerDesktopClient() {
//   return ddClient;
// }

export function App() {
  const ddClient = createDockerDesktopClient();
  {/* Use an array to store our containers initial state is empty*/}
  const [containers, setContainers] = useState([]);
  {/* Use a boolean to check whether user is logged in or not. This will be used for conditional rendering of components*/}
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setToken] = useState('');

  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');

  async function fetchToken(){
    const result = await ddClient.extension.vm?.service?.get(`/api/github-oauth/${code}`);
    setToken(`${result}`);
    console.log(result)
  };

  async function handleButtonClick() {
    ddClient.host.openExternal('https://github.com/login/oauth/authorize?client_id=32239c9ebb7b81c40e9d');
  };

  return (
    <>
      <body className='body'>
        <h1 className='test'>Welcome to your dashboard!!!!!</h1>
        <button onClick={handleButtonClick}>Log in through Github</button>
        <div className='box'>
          <div className='container-grid'>
            {/*Containers go here*/}
            {containers.map((container, index) => {
              console.log('these are the containers', container);
              return <Container key={index} details={container} />}
            )}
          </div>

          <div className='log-grid'>
            {/*Log goes here*/}
            {loggedIn && <StatusLog/>}
            <h1>Not logged in!</h1>
          </div>
        </div>

        <div className='container-health'>
          {/* Container Health Comparison goes here */}
          <ContainerHealth />
        </div>
      </body>
    </>
  );
}

{
  /*
  const [response, setResponse] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  const fetchAndDisplayResponse = async () => {
    console.log('trying to fetch /api')
    const result = await ddClient.extension.vm?.service?.get('/api');
    console.log('result: ', result);
    setResponse(JSON.stringify(result));
  };

  return (
    <>
      <Typography variant="h3">GitDocked</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This is a basic page rendered with MUI, using Docker's theme. Read the
        MUI documentation to learn more. Using MUI in a conventional way and
        avoiding custom styling will help make sure your extension continues to
        look great as Docker's theme evolves.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will trigger a request to the backend. Its
        response will appear in the textarea.
      </Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={fetchAndDisplayResponse}>
          Call backend
        </Button>

        <TextField
          label="Backend response"
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={response ?? ''}
        />
  </Stack>
  */
}