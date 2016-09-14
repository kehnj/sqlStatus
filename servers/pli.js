
const Moment = require('moment');

function checkSQL(io){
  var status = Moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

  console.log(status);
  io.emit('sqlStatus', status);
}

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
      require('../sendmsg').sendText(result);
    }

    // create Request object
    var reqPLI = new sqlPLI.Request(con);

    // query to the database and get the records
    reqPLI.query('SELECT LastDate FROM tblLastDate', function (err, recordset) {

      if (err) {
        console.log(err);
        result = 'Error returning data from PLIAPPS database';
        require('../sendmsg').sendText(result);
      }

      result = recordset[0].LastDate.toString();
      io.emit('sqlStatus', result);

    });
  });

};

exports.checkSQL = function (io) {
  setInterval(checkSQL, 3000, io);
};
