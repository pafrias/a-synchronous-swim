const _ = require('underscore');
const keypress = require('keypress');
const Messages = require('./messageQueue');


///////////////////////////////////////////////////////////////////////////////
// Utility Function ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const validMessages = ['left', 'right', 'up', 'down'];

const isValidMessage = (message) => {
  return _.contains(validMessages, message);
};

const logKeypress = (key) => {
  // in raw-mode it's handy to see what's been typed
  // when not in raw mode, the terminal will do this for us
  if (process.stdin.isRaw) { 
    process.stdout.write(key);
  }
};

///////////////////////////////////////////////////////////////////////////////
// Keypress Handler ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var message = ''; // a buffer to collect key presses

module.exports.initialize = () => {

  // setup an event handler on standard input
  process.stdin.on('keypress', (chunk, key) => { 
    // ctrl+c should quit the program
    if (key && key.ctrl && key.name === 'c') {
      process.exit();
    }

    if (key && key.ctrl && isValidMessage(key.name)) {
      Messages.enqueue(key.name);
    } 
    // check to see if the keypress itself is a valid message
    if (isValidMessage(key.name)) { // don't do any more processing on this key
      Messages.enqueue(key.name); //changed
    }
    
    // otherwise build up a message from individual characters
    if (key && (key.name === 'return' || key.name === 'enter')) {
      // on enter, process the message
      logKeypress('\n');
      if (isValidMessage(message)) {
        Messages.enqueue(message); //changed
      }
      // clear the buffer where we are collecting keystrokes
      message = '';
    } else {
      // collect the individual characters/keystrokes
      message += key.name;
      logKeypress(key.name);
    }
  });
};

module.exports.get = () => {
  return Messages.dequeue();
}

///////////////////////////////////////////////////////////////////////////////
// Configuration -- do not modify /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

keypress(process.stdin);
if (process.stdin.setRawMode) {
  // configure stdin for raw mode, if possible
  process.stdin.setRawMode(true);
}