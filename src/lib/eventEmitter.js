var events = require('events');

const em = new events.EventEmitter();
export default em;

// Event's constants
export const UNAUTHORIZED_USER = 'unauthorized_user';
