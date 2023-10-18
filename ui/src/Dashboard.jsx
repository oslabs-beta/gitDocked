import React from 'react';
import { useState, useEffect } from 'react';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import Container from './Container';
import StatusLog from './StatusLog';
import ContainerHealth from './ContainerHealth';
import Navbar from './Navbar';

export default function Dashboard() {
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
      <Navbar />
      <h1 className='test'>Welcome to your dashboard</h1>
      <button onClick={githubOAuthButton}>Log in through Github</button>
      <button>Get Docker Logs</button>
      <button>Get Docker Events</button>
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
    </>
  );
}
