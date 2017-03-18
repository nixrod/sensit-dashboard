var request = require('request');
var moment = require('moment');
var parser = require('./payload_parser.js');
var config = require('./config.js');

var exports = module.exports = {};

exports.getMessages = function() {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://backend.sigfox.com/api/devices/'+ config.sensit_device_id +'/messages',
      method: 'GET',
      headers: {
          'Authorization': 'Basic ' + config.sigfox_basic_auth_token
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
    message.timestamp = moment.unix(item.time).format('HH:mm');
    message.battery = parser.getBatteryVoltage(item.data);
    message.temperature = parser.getTemperature(item.data);
    message.humidity = parser.getHumidity(item.data);

    messages.push(message);
  });

  return messages.reverse();
}
