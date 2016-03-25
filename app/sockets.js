'use strict';

module.exports = socketsHadlers;

/**
 * Set the socket events and handlers
 *
 * @param {object}  http server
 */
function socketsHadlers(http){
  // --- counter sockets ---
  var io = require('socket.io')(http);

  var contenders = [];
  // --- counter sockets ---
  io.on('connection', socket => {

    io.emit('current contenders', JSON.stringify(contenders));

    // --- new contenders ---
    socket.on('new contenders', newContenders =>{
      var current = JSON.parse(newContenders);
      contenders = current.map( (item, index) => {
        return {
          id: index,
          votes: 0,
          label: item
        }
      });
      io.emit('current contenders', JSON.stringify(contenders));
    });

    // --- update the votes ---
    socket.on('vote', voted => {
      contenders.map(item => {
        if(item.id == voted)
          item.votes++;
      })
      io.emit('update results', JSON.stringify(contenders));
    });

  });
}
