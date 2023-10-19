import React from 'react'

export default function SignInPage() {

  return (
    <div>

      <h1>In order to use this app, you must have a Github account. Please sign into your Github account using the button below!</h1>
      <button onClick={githubOAuthButton}>Log in through Github</button>
    </div>

  )
}