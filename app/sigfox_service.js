var request = require('request');
var moment = require('moment-timezone');
var parser = require('./payload_parser.js');

var exports = module.exports = {};

exports.getMessages = function() {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://backend.sigfox.com/api/devices/'+ process.env.SENSIT_DEVICE_ID +'/messages',
      method: 'GET',
      headers: {
          'Authorization': 'Basic ' + process.env.SIGFOX_BASIC_AUTH_TOKEN
      }
    }, function(error, response, body){
      if(error) {
          console.error(error);
          reject(error);
      } else {
          resolve(processResponseBody(JSON.parse(body)));
      }
    });
  });
}

function processResponseBody(body) {
  let messages = [];

  body.data.forEach(item => {
    let message = {};
    message.timestamp = moment.unix(item.time).tz("Europe/Berlin").format('HH:mm');
    message.battery = parser.getBatteryVoltage(item.data);
    message.temperature = parser.getTemperature(item.data);
    message.humidity = parser.getHumidity(item.data);

    messages.push(message);
  });

  return messages.reverse();
}
