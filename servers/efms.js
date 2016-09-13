module.exports = {

  checkEFMS: function (io) {
    var result = '';

    var sqlEFMS = require("mssql");
    var conEFMS = {

        // SQL Server connection string here

        options: {
          tdsVersion: '7_1'
        }
    };


    var con = new sqlEFMS.Connection(conEFMS, function (err) {
      if (err) {
        console.log(err);
        result = 'Error connecting to EFMS2 database';
        require('../sendmsg').sendText(result);
      }

      // create Request object
      var reqEFMS = new sqlEFMS.Request(con);

      // query to the database and get the records
      reqEFMS.query('SELECT MAX(AuditDate) AS LastDate FROM AuditLog', function (err, recordset) {

        if (err) {
          console.log(err)
          result = 'Error returning data from EFMS2 database';
          require('../sendmsg').sendText(result);
        }

        result = recordset[0].LastDate.toString();
        io.emit('chat message', result);

      });
    });

  }

};
