// Twilio Credentials
 var accountSid = process.env.TWILIO_ACCOUNT_SID;
 var authToken = process.env.TWILIO_AUTH_TOKEN;

 //require the Twilio module and create a REST client
 var client = require('twilio')(accountSid, authToken);

module.exports = {
  sendText: function (sServer){
      client.messages.create({
       
        // TO/FROM info here
       
        body: 'SQL FAILED: ' + sServer + '!',
      }, function (err, message) {
        console.log(message.sid);
      });
  }
};
