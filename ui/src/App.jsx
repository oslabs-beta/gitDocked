import React from 'react';
import { useState, useEffect } from 'react';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { DockerMuiThemeProvider } from '@docker/docker-mui-theme';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Stack, TextField, Typography } from '@mui/material';
import './styles.css';
import Dashboard from './Dashboard';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
// const client = createDockerDesktopClient();

export function App() {
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

  return (
    <>
      <DockerMuiThemeProvider>
        <CssBaseline />
        <Dashboard/>
      </DockerMuiThemeProvider>
    </>
  );
}
