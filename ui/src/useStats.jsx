import { createDockerDesktopClient } from '@docker/extension-api-client';

export default function useStats(name) {
  const ddClient = createDockerDesktopClient();
  // console.log('use stats name: ', name);
  // console.log('Docker Desktop Client: ', ddClient);

  // interacts with command line to get the stats according to the options
  const result = ddClient.docker.cli.exec('stats', [
    '-a',
    '--no-stream',
    '--format',
    '"Container":"{{.Container}}","ID":"{{.ID}}","Name":"{{.Name}}","CPUPerc":"{{.CPUPerc}}","MemUsage":"{{.MemUsage}}","MemPerc":"{{.MemPerc}}","NetIO":"{{.NetIO}}","BlockIO":"{{.BlockIO}}"',
    `${name}`,
  ]);

  // returns a promise
  return result;
}
