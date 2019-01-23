const _ = require('underscore');
const keypress = require('keypress');
const Messages = require('./messageQueue');


///////////////////////////////////////////////////////////////////////////////
// Utility Function ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//added rotation with a & d
const validMessages = ['left', 'right', 'up', 'down', 'circle', 'eight']; 

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

    // check to see if the keypress itself is a valid message
    if (isValidMessage(key.name)) { 
        Messages.enqueue(key.name);
        console.log('');
    }

    // otherwise build up a message from individual characters
    if (key && (key.name === 'return' || key.name === 'enter')) {
      logKeypress('\n');
      if (isValidMessage(message)) {
        if (message === 'circle') {
          circle();
        } else if (message === 'eight') {
          figureEight();
        } else {
          Messages.enqueue(message);
        }
      }
      console.log('');
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

var circle = () => {
  for (let i = 0; i < 40; i++) {
    Messages.enqueue('up');
    Messages.enqueue('left');
  }
}

var figureEight = () => {
  Messages.enqueue('up');
  Messages.enqueue('up');
  for (let i = 0; i < 30; i++ ) {
    Messages.enqueue('up');
    Messages.enqueue('right');
  }
  for (let i = 0; i < 4; i++) {
    Messages.enqueue('up');
  }
  for (let i = 0; i < 30; i++ ) {
    Messages.enqueue('up');
    Messages.enqueue('left');
  }
  Messages.enqueue('up');
  Messages.enqueue('up');
}







///////////////////////////////////////////////////////////////////////////////
// Configuration -- do not modify /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

keypress(process.stdin);
if (process.stdin.setRawMode) {
  // configure stdin for raw mode, if possible
  process.stdin.setRawMode(true);
}