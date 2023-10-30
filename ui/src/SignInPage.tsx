import React from 'react';
import { createDockerDesktopClient } from '@docker/extension-api-client';

export default function SignInPage() {
  const ddClient = createDockerDesktopClient();

  // Users are redirected to an an external page to request
  // their GitHub identity.
  async function logInWithGithub() {
    ddClient.host.openExternal(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&scope=repo`);
  }

  return (
    <div>
      <h1>In order to use this app, you must have a Github account. Please sign into your Github account using the button below!</h1>
      <button onClick={logInWithGithub}>Log in through Github</button>
    </div>
  );
}
