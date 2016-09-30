const SendMsg = require('../utilities/sendmsg');

function checkSQL(io){
  var result = '';

  var sqlPLI = require("mssql");
  var conPLI = {
    user: process.env.sqlUser,
    password:  process.env.sqlPassword,
    server:  process.env.pliServer,
    database:  process.env.pliDatabase,
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
        io.emit('sqlStatus', 'pli-app', 'NO RESULTS', '---', new Date().toLocaleTimeString());
      } else {
        result = recordset[0].LastDate.toLocaleDateString();
        io.emit('sqlStatus', 'pli-app', 'OK', result, new Date().toLocaleTimeString());
      }
    });
  });
};

exports.checkSQL = function (io) {
  setInterval(checkSQL, 5000, io);
};
