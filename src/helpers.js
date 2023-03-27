const json = function (data) {
  this.setHeader('content-type', 'application/json');
  this.end(JSON.stringify(data));
};

const status = function (statusCode) {
  this.statusCode = statusCode;
};

export default {
  json,
  status,
};
