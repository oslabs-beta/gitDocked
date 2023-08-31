import fs from 'fs';
// import metricsServer from './server/metricsServer';
import socketServer from './server/socketServer';
import { CONFIG } from './config';

// Delete existing socket file to allow for reusability
try {
  if (fs.existsSync(CONFIG.SOCKET_PATH)) {
    fs.unlinkSync(CONFIG.SOCKET_PATH);
  }
} catch (err) {
  console.error('Error deleting socket file: ', err);
}

// metricsServer.listen(CONFIG.METRICS_PORT, () => {
//   console.log(`Server listening on Port ${CONFIG.METRICS_PORT}`);
// });

socketServer.listen(CONFIG.SOCKET_PATH, () => {
  console.log(`Server listening on Socket ${CONFIG.SOCKET_PATH}`);
});
