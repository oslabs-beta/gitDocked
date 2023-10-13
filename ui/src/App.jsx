import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';
import './styles.css';
import Container from './Container';
import StatusLog from './StatusLog';
import ContainerHealth from './ContainerHealth';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
// const client = createDockerDesktopClient();

export function App() {
  const ddClient = createDockerDesktopClient();
  {
    /* Use an array to store our containers initial state is empty */
  }
  const [containers, setContainers] = useState([]);
  {
    /* Use a boolean to check whether user is logged in or not. This will be used for conditional rendering of components*/
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setToken] = useState('');

  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');

  async function fetchToken() {
    console.log('fetching token');
    try {
      console.log('in try block');
      const result = await ddClient.extension.vm?.service?.get(`/api/github-oauth/${code}`);
      console.log('got result');
      setToken(`${result}`);
      console.log('this is the result', result);
    } catch (error) {
      console.log('this is the error', error);
    }
  }

  if (!loggedIn && code) {
    fetchToken();
    setLoggedIn(true);
    console.log('this is the code', code);
  }

  // const ddClient = useDockerDesktopClient();

  // Users are redirected to an an external page to request
  // their GitHub identity.
  async function githubOAuthButton() {
    ddClient.host.openExternal(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`);
  }

  async function getStatsClick() {
    let newData = [];

    const TERMINAL_CLEAR_CODE = '\x1B[2J\x1B[H';

    const result = ddClient.docker.cli.exec('stats', ['--no-trunc', '--format', '{{ json . }}'], {
      stream: {
        onOutput(data) {
          if (data.stdout?.includes(TERMINAL_CLEAR_CODE)) {
            // This stdout begins with the terminal clear code,
            // meaning that it is a new sample of data.
            setResponse(newData);
            newData = [];
            newData.push(JSON.parse(data.stdout.replace(TERMINAL_CLEAR_CODE, '')));
            console.log('included the terminal clear code and data', data);
          } else {
            console.log('else block hit', data);
            newData.push(JSON.parse(data.stdout ?? ''));
          }
        },
        onError(error) {
          console.error(error);
          return;
        },
        onClose(exitCode) {
          console.log('docker stats exec exited with code ' + exitCode);
          return;
        },
        splitOutputLines: true,
      },
    });
  }

  async function getLogsClick() {
    await ddClient.docker.cli.exec('logs', ['-f', '...'], {
      stream: {
        onOutput(data) {
          if (data.stdout) {
            console.error(data.stdout);
          } else {
            console.log(data.stderr);
          }
        },
        onError(error) {
          console.error(error);
        },
        onClose(exitCode) {
          console.log('onClose with exit code ' + exitCode);
        },
        splitOutputLines: true,
      },
    });
  }

  async function getEventsClick() {
    await ddClient.docker.cli.exec('events', ['--format', '{{ json . }}', '--filter', 'container=my-container'], {
      stream: {
        onOutput(data) {
          if (data.stdout) {
            const event = JSON.parse(data.stdout);
            console.log(event);
          } else {
            console.log(data.stderr);
          }
        },
        onClose(exitCode) {
          console.log('onClose with exit code ' + exitCode);
        },
        splitOutputLines: true,
      },
    });
  }

  // useEffect which will invoke an async function to retrieve all the user's containers and set the state equal to the array of objects
  // each object will be a container
  useEffect(() => {
    // gets the list of running containers
    async function getContainer() {
      return await ddClient.docker.listContainers();
    }

    // sets the state of containers to only our running containers
    getContainer().then((allContainers) => {
      console.log('all containers', allContainers);
      setContainers(allContainers);
    });
  }, []);

  return (
    <>
      <div>
        <body className='body'>
          <h1 className='test'>Welcome to your dashboard!</h1>
          <button onClick={githubOAuthButton}>Log in through Github</button>
          <button onClick={getLogsClick}>Get Docker Logs</button>
          <button onClick={getEventsClick}>Get Docker Events</button>
          <div className='box'>
            <div className='container-grid'>
              {/*Containers go here*/}
              {containers.map((container, index) => {
                return <Container key={index} details={container} />;
              })}
            </div>

            <div className='log-grid'>
              {/*Log goes here*/}
              {loggedIn && <StatusLog />}
              <h1>Not logged in!</h1>
            </div>
          </div>

          <div className='container-health'>
            {/* Container Health Comparison goes here */}
            <ContainerHealth />
          </div>
        </body>
      </div>
    </>
  );
}
