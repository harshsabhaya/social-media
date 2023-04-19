import { io } from 'socket.io-client';

import { TOKEN } from '../lib/config';
import { getCookie } from './cookiesManagement';

export const socket = io('https://social-media-2rtb.onrender.com', {
  extraHeaders: {
    auth: getCookie(TOKEN),
  },
});
