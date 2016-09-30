'use strict';

(function($, kendo, _, socketHelper) {

    var viewModel = kendo.observable({
        title: "That Room Status!",
        title2: "That Room Status!"
    });

    function rebind() {
      viewModel.trigger("change", { field: "rooms" });
    }

    function statusCallback(message) {
      console.log('in statusCallback');
      /*
      var roomId = message.coreid;
      var status = message.data;
      var room = _.where(_rooms, {id: roomId})[0];
      if (room != null) {
        room.status = status;
        rebind();
      }
      */
    }

    socketHelper.setSqlStatusCallback(statusCallback);

    kendo.bind($("#body"), viewModel);

})(window.jQuery, window.kendo, window._, window.socketHelper);
