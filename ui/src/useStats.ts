import { createDockerDesktopClient } from '@docker/extension-api-client';

export default function useStats(name: string) {
  const ddClient = createDockerDesktopClient();

  // interacts with command line to get the stats according to the options
  const result = ddClient.docker.cli.exec('stats', [
    '-a',
    '--no-stream',
    '--format',
    '"Container":"{{.Container}}","Name":"{{.Name}}","CPUPerc":"{{.CPUPerc}}","MemUsage":"{{.MemUsage}}","MemPerc":"{{.MemPerc}}","NetIO":"{{.NetIO}}","BlockIO":"{{.BlockIO}}"',
    `${name}`,
  ]);

  // returns a promise
  return result;
}
