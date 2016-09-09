


function checkStatus() {


  var sqlPLI = require("mssql");
  var conPLI = {
      user: 'uid',
      password: 'pw',
      server: 'M2300',
      database: 'PLIAPPS',
      options: {
        tdsVersion: '7_1'
      }
  };

  var sqlEFMS = require("mssql");
  var conEFMS = {
      user: 'uid',
      password: 'pw',
      server: 'EFMS',
      database: 'EFMS2',
      options: {
        tdsVersion: '7_1'
      }
  };


  var con1 = new sqlPLI.Connection(conPLI, function(err){
    if (err) console.log(err);

    // create Request object
    var reqPLI = new sqlPLI.Request(con1);

    // query to the database and get the records
    reqPLI.query('SELECT LastDate FROM tblLastDate', function (err, recordset) {

      if (err) console.log(err)

      //resStatus = '<p>PLI Status = GOOD</p>';
      console.log('PLI Status = GOOD');

    });
  });

  var con2 = new sqlEFMS.Connection(conEFMS, function (err) {
    if (err) console.log(err);

    // create Request object
    var reqEFMS = new sqlEFMS.Request(con2);

    // query to the database and get the records
    reqEFMS.query('SELECT MAX(AuditDate) AS LastDate FROM AuditLog', function (err, recordset) {

      if (err) console.log(err)

      //resStatus += '<p>EFMS Status = GOOD</p>';
      console.log('EFMS Status = GOOD');

    });
});

}

exports.startRunning = function () {
  setInterval(checkStatus, 3000);
};
