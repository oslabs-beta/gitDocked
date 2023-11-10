# Git Docked

The one-stop Docker Desktop Extension for seamless CI / CD workflow monitoring and container snapshot comparison.

## Table of Contents
1. [About](#about)
2. [How it Works](#how-it-works)
3. [Getting Started](#getting-started)
4. [Roadmap](#roadmap)
5. [Contributors](#contributors)
6. [License](#license)

## About

Git Docked is a Docker Desktop Extension that hooks into your Github, and provides a simplified GUI to monitor your CI/CD workflow in real time.

## How it Works
- Docker
- TypeScript
- React
- MUI
- React Router
- Vite
- Node.js
- Express.js
- OAuth (Github)
- PostgreSQL

Git Docked consists of:

- A frontend UI which allows you to start and stop containers, or remove them from view. Clicking on a container will show you a comparison of the recorded average, min and max statistics associated with the two most recent containers. Additionally, you can check the status of your related Github Actions and watch the new containers update and deploy.
- A node backend which handles API calls from the frontend UI, and a local PostgreSQL database to store your container's metrics.
- Open Authorization through Github to pull Github Action data into the app.

## Getting Started

### Requirements

In order to use Git Docked, you must have Docker Desktop downloaded to your local machine.

### Install

Install the extension from Docker Desktop, or build it yourself by forking this repo, navigating to the root folder and running:
```console
make build-extension
```

and then

```console
make install-extension
```

### Logging in to see your Github Actions

Once installed, click login to Github, and click "Get Github Action Logs" to see your most recent pull request.

Your Github token and container metrics are stored exclusively in a containerized database right on your own machine, giving you complete control over your data. Git Docked does not externally transmit any of your sensitive data.

## Roadmap

Some features the team is implementing in the future include:

- Build images on your local machine, instead of through Github Actions (cloud), decreasing build time.
- Display Github Actions as they are processing, giving you live insight as your actions are completed.
- Add charting to make live container stats easy to digest.
- Add E2E testing with Jest-puppeteer.
- Grow the metrics dashboards with additional useful metrics.
- Add AWS OAuth to enable pulling of container logs from the platform.

## Contributors
- Austin Mattus | [Github] (https://github.com/ajmattus) | [Linkedin] (https://www.linkedin.com/in/austinmattus/)
- David Ortega | [Github] (https://github.com/gitcodedave) | [Linkedin] (https://www.linkedin.com/in/david-ortega-b96094244/)
- Matthew McCormack | [Github] (https://github.com/mccormsy) | [Linkedin] (https://www.linkedin.com/in/matthewamccormack/)
- Omid Nasrollahi | [Github] (https://github.com/ajmattus) | [Linkedin] (www.linkedin.com/in/omid-nasrollahi-54b226243)

## Contributing

We urge developers to utilize Git Docked in their workflow and provide product feedback via Git issues. We encourage potential contributors to start with our Roadmap above. Thank you in advance for your support!

## License

This product is licensed under the MIT License without restriction.
