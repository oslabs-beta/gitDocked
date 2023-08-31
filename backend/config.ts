import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  METRICS_PORT: Number(process.env.METRICS_PORT) || 3332,
  SOCKET_PATH: '/run/guest-services/backend.sock',
};