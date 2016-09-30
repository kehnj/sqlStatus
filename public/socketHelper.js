'use strict';

(function(io) {

  var _socket = io();
  var _sqlStatusCallback;

  function setSqlStatusCallback(callback) {
    _sqlStatusCallback = callback;
    console.log("set status callback");
  }

  _socket.on('sqlStatus', function(message){
      if (_sqlStatusCallback) {
        _sqlStatusCallback(message);
      }
  });

  window.socketHelper = {
    setSqlStatusCallback: setSqlStatusCallback,
  }

})(window.io);
