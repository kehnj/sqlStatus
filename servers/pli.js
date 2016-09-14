
const Moment = require('moment');
//const SendMsg = require('../utilities/sendmsg');

//todo... you can delete this function and update the timer to point to the real one.
function checkSQL(io){
  var status = Moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

  var someObj = {
    time: status,
    somethingElse: 'booya'
  };

  console.log(JSON.stringify(someObj));
  io.emit('sqlStatus', someObj);
};

function checkSQL2(io){
  var result = '';

  var sqlPLI = require("mssql");
  var conPLI = {
      // SQL Server string here
      options: {
        tdsVersion: '7_1'
      }
  };

  var con = new sqlPLI.Connection(conPLI, function (err) {
    if (err) {
      console.log(err);
      result = 'Error connecting to PLIAPPS database';

      //todo.. why not put more of the err message in the txt message?
      SendMsg.sendText(result);
    }

    // create Request object
    var reqPLI = new sqlPLI.Request(con);

    // query to the database and get the records
    reqPLI.query('SELECT LastDate FROM tblLastDate', function (err, recordset) {

      if (err) {
        console.log(err);
        result = 'Error returning data from PLIAPPS database';
        SendMsg.sendText(result);
        //todo.. shouldn't you io.emit here back to the server as well
      }

      result = recordset[0].LastDate.toString();
      io.emit('sqlStatus', result);

    });
  });
};

exports.checkSQL = function (io) {
  setInterval(checkSQL, 3000, io);
};
