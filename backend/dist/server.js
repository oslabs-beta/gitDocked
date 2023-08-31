"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// import metricsServer from './server/metricsServer';
const socketServer_1 = __importDefault(require("./server/socketServer"));
const config_1 = require("./config");
// Delete existing socket file to allow for reusability
try {
    if (fs_1.default.existsSync(config_1.CONFIG.SOCKET_PATH)) {
        fs_1.default.unlinkSync(config_1.CONFIG.SOCKET_PATH);
    }
}
catch (err) {
    console.error('Error deleting socket file: ', err);
}
// metricsServer.listen(CONFIG.METRICS_PORT, () => {
//   console.log(`Server listening on Port ${CONFIG.METRICS_PORT}`);
// });
socketServer_1.default.listen(config_1.CONFIG.SOCKET_PATH, () => {
    console.log(`Server listening on Socket ${config_1.CONFIG.SOCKET_PATH}`);
});
