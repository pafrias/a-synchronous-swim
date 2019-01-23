
const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log('');
  messages.push(message);
};

module.exports.dequeue = () => {
  // declare an index number
  // set index to the min of messages.length and 10
  // splice out that many messages from... messages
  // return that
  return messages.shift();
};