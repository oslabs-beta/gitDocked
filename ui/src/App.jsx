import React from 'react';
import { useState, useEffect } from 'react';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { DockerMuiThemeProvider } from '@docker/docker-mui-theme';
import CssBaseline from '@mui/material/CssBaseline';
import './styles.css';
import SignInPage from './SignInPage';
import Navbar from './Navbar';
import Container from './Container';
import StatusLog from './StatusLog';
import ContainerHealth from './ContainerHealth';
import ToggleButton from './ToggleButton';
import { Routes, Route, NavLink } from 'react-router-dom';
import Charts from './Charts';

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
  const [logs, setLogs] = useState('');

  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');

  /* After receiving the code from the Github login redirect, we will pass the code to our backend API.
  The backend API will use the code to fetch a token, and set the new token */
  async function fetchToken() {
    console.log('fetching token');
    try {
      const result = await ddClient.extension.vm?.service?.get(`/api/github-oauth/${code}`);
      setToken(`${result}`);
      localStorage.setItem('authToken', authToken);
      setLoggedIn(true);
    } catch (error) {
      console.log('this is the error', error);
    }
  }
  /* We will only try to fetch a new token once the user has returned from the Github OAuth redirect */
  if (!loggedIn && code) {
    let newDate = new Date();
    console.log(newDate);
    fetchToken();
  }

  async function handleWorkflowLogsClick() {
    if (localStorage.getItem('authToken')) {
      getWorkflowLogs();
    } else {
      console.log('You are not logged in yet!');
    }
  }

  async function getWorkflowLogs() {
    try {
      const logs = await ddClient.extension.vm?.service?.get(`/api/workflow-logs/${authToken}`);
      console.log(logs);
      setLogs(logs);
    } catch (error) {
      console.log('this is the error', error);
    }
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

  useEffect(() => {
    async function getUser() {
      const user = await ddClient.extension.vm?.service?.get(`/api/user-info/${localStorage.getItem('authToken')}`);
      setLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', user.login);
      localStorage.setItem('userpic', user.avatar_url);
    }

    if (localStorage.getItem('authToken') !== '') {
      setToken(localStorage.getItem('authToken'));
      getUser();
    }
  }, [authToken]);

  const handlePinToggle = (index) => {
    console.log(`pin this container ${index}`);
    const pinnedContainer = containers[index];
    const filteredContainers = containers.filter((item, i) => i !== index);

    setContainers([pinnedContainer, ...filteredContainers]);
  };

  const handleStartClick = (name) => {
    const ddClient = createDockerDesktopClient();

    const result = ddClient.docker.cli.exec('start', [name]);
    result.then((data) => console.log('started container'));
  };
  const handleStopClick = (name) => {
    const ddClient = createDockerDesktopClient();

    const result = ddClient.docker.cli.exec('stop', [name]);
    result.then((data) => console.log('stopped container'));
  };

  if (!localStorage.getItem('authToken')) {
    return <SignInPage />;
  } else if (localStorage.getItem('isLoggedIn')) {
    return (
      <>
        <DockerMuiThemeProvider>
          <CssBaseline />
          <div>
            <div className='body'>
              <Navbar avatar={localStorage.getItem('userpic')} />
              <h1 className='test'>Welcome to your dashboard, {localStorage.getItem('username')}!</h1>
              {/* <button onClick={githubOAuthButton}>Log in through Github</button> */}
              {/* <button onClick={getLogsClick}>Get Docker Logs</button> */}
              <Routes>
                <Route path='/'></Route>
                <Route path='/charts' element={<Charts />}></Route>
              </Routes>
              <button onClick={handleWorkflowLogsClick}>Get Github Action Logs</button>
              <ToggleButton />
              {/* <button onClick={getEventsClick}>Get Docker Events</button> */}
              <div className='box'>
                <div className='container-grid'>
                  {/*Containers go here*/}
                  {containers.map((container, index) => {
                    return (
                      <Container
                        key={index}
                        details={container}
                        onPinToggle={() => handlePinToggle(index)}
                        onStartClick={handleStartClick}
                        onStopClick={handleStopClick}
                      />
                    );
                  })}
                </div>

                <div className='log-grid'>
                  {/*Log goes here*/}
                  {localStorage.getItem('authToken') && <StatusLog />}
                  <div className='logs'>
                    <p>{logs}</p>
                  </div>
                  
                </div>
              </div>

              <div className='container-health'>
                {/* Container Health Comparison goes here */}
                <ContainerHealth />
              </div>
            </div>
          </div>
        </DockerMuiThemeProvider>
      </>
    );
  }
}
