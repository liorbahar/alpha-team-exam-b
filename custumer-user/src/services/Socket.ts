import io from 'socket.io-client';
import Config from '../Config';

const socket = io(Config.url);

export default socket;
