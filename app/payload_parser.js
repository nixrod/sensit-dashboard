var exports = module.exports = {};

// Note that the sens'it must be in temperature mode
// Temperature in °C
exports.getTemperature = function(data) {
  let msb = getByte(data, 2).substr(0, 4);
  let lsb = getByte(data, 3).substr(2, 6);

  let value = parseInt(msb + lsb, 2);
  return (value - 200) / 8;
}

// Humidity in %
exports.getHumidity = function(data) {
  let byte4 = getByte(data, 4);
  return parseInt(byte4, 2) * 0.5;
}

exports.getBatteryVoltage = function(data) {
  let msb = getByte(data, 1).substr(0, 1);
  let lsb = getByte(data, 2).substr(4, 4);

  return (((parseInt(msb, 2) * 16) + parseInt(lsb, 2)) + 54) / 20;
}


function getByte(data, index) {
  return dec2bin(parseInt('0x' + data.substr((index - 1) * 2, 2)));
}

function dec2bin(dec){
    let bin = (dec >>> 0).toString(2);
    // add padding to 8 bits
    while (bin.length < 8) {
      bin = '0' + bin;
    }
    return bin;
}
