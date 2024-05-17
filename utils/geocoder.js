const NodeGeoCoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "npl9Zm8kxXWTwCQutj7DNfpmwPunLzPL",
  formatter: null,
};  

const geocoder = NodeGeoCoder(options);

module.exports = geocoder;
