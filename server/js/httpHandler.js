const headers = require('./cors');
const KeyHandler = require('./keypressHandler');
KeyHandler.initialize();

module.exports = (req, res) => {
  let method = req.method;
  if (method === 'GET') {
    res.writeHead(200, headers);
    let data = KeyHandler.get();
    if (data) {
      res.write(data);
    }
    res.end();
  } else {
    res.setStatus(404);
    res.end();
  }
};
