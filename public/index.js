'use strict';

(function(io) {

  var _socket = io();
  var _statusCallback;
  var _tempCallback;

  function setStatusCallback(callback) {
    _statusCallback = callback;
    console.log("set status callback");
  }

  function check() {
    console.log("got thatsocket!");
  }

  _socket.on('status', function(message){
      //console.log(message);
      if (_statusCallback) {
        _statusCallback(message);
      }
  });

  window.thatsocket = {
    check : check,
    setStatusCallback: setStatusCallback,
    setTempCallback: setTempCallback
  }

})(window.io);
