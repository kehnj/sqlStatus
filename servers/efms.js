const SendMsg = require('../utilities/sendmsg');

function checkSQL(io) {
  var result = '';

  var sqlEFMS = require("mssql");
  var conEFMS = {
    user: process.env.sqlUser,
    password:  process.env.sqlPassword,
    server:  process.env.efmsServer,
    database:  process.env.efmsDatabase,
      options: {
        tdsVersion: '7_1'
      }
  };

  var con = new sqlEFMS.Connection(conEFMS, function (err) {
    if (err) {
      console.log(err);
      result = 'Error connecting to EFMS2 database';

      //todo.. why not put more of the err message in the txt message?
      SendMsg.sendText(result);
    }

    // create Request object
    var reqEFMS = new sqlEFMS.Request(con);

    // query to the database and get the records
    reqEFMS.query('SELECT MAX(AuditDate) AS LastDate FROM AuditLog', function (err, recordset) {

      if (err) {
        console.log(err)
        result = 'Error returning data from EFMS2 database';
        SendMsg.sendText(result);
        io.emit('sqlStatus', 'efms', 'NO RESULTS', '---', new Date().toLocaleTimeString());
      }

      result = recordset[0].LastDate.toLocaleDateString();

      io.emit('sqlStatus', 'efms', 'OK', result, new Date().toLocaleTimeString());

    });
  });
};

exports.checkSQL = function (io) {
  setInterval(checkSQL, 5000, io);
};
