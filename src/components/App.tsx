import React from 'react';

export default function App() {

  return (
    <>
      <div>
        <h1>Why GitDocked?</h1>
          The CI/CD pipeline continues to transform the way software is delivered, several technologies have emerged to facilitate the process. Docker, a tool that has become almost synonymous with containerization, and GitHub Actions have become a popular combination for packaging up applications, and automating workflows. But, for all of its benefits, there are still issues that can make the process feel tedious for developers. That is where GitDocked has stepped up to help cut down extra steps, and make the CI/CD process seamless. 
        <h1>How Will It Save Me Time?</h1>
            GitDocked is a Docker Desktop extension, meaning it works within Docker’s native software. It provides a simplified GUI that allows you monitor your CI/CD workflow in real time, without the need to open other applications:
        <ul>
          <li>Container Management - Docker containers are neatly spaced out and organized by ID, allowing for easy traversal through either “running-only” or all containers. As an option, each one is pinnable to the top, making it easy to focus on specific containers as you monitor and deploy new features. Vital metrics such as CPU usage and memory allocation are constantly being streamed and displayed in real-time. All components have start, stop, pause, and delete features built-in. </li>
          <li>GitHub Actions Integration - GitDocked is integrated with GitHub OAuth, allowing for secure access to user’s GitHub profile, repository, and GitHub Actions workflows. This component displays status and process logs for current builds. Each run is parsed and organized by workflow step, making it easy to pinpoint errors in the process.</li> 
          <li>Snapshot History - Under the hood, GitDocked is storing container metrics with each version of the application. As new Docker images are created, a snapshot of the previous version’s container metrics are stored and organized onto a graph. This powerful feature allows you to compare side-by-side how your current application performance compares with historical versions. </li>
        </ul>
        <h1>Updates and Planned Features</h1>
          As we make the transition from local machine monitoring to AWS hosted applications, we will continue to make improvements to performance and response times.
        <ul>
          <li>AWS Integration - Authentication with AWS will allow GitDocked to access metrics of online-server hosted applications. This will allow for organizations to collaborate and visualize deployment updates from other team members in real-time. </li>
          <li>WebHooks - Receiving workflow process logs and container metric data will be automated via webhooks, meaning updates to the codebase will begin monitoring for all users live.</li>
          <li>Testing - A robust testing suite is being implemented for improved error handling when integrating user’s app with GitDocked.
          </li>
        </ul>
        <h1>Takeaway</h1>
          GitDocked is designed to be a centralized hub for monitoring your CI/CD pipeline in real-time. This is an open-sourced product created by developers, for developers looking to save time and simplify their workflow.
        <br></br>
        <br></br>
        Thanks for reading!
        <br></br>
        Meet the team!
        <ul>
          <li>Austin Mattus | LinkedIn</li>
          <li>David Ortega | LinkedIn</li>
          <li>Matthew McCormack | LinkedIn</li>
          <li>Omid Nasrollahi | LinkedIn</li>
        </ul>
      </div>
    </>
  );
}