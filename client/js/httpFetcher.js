(function() {
  
  const serverUrl = 'http://127.0.0.1:3000/';

  var doTheThings = () => {
  $.get(serverUrl, (data) => {
    SwimTeam.move(data.toLowerCase())
  });
  setTimeout(doTheThings, 100);
  };

  doTheThings();
})();

