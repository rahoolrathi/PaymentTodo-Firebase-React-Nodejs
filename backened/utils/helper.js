const { STATUS_CODE } = require("./constant.js");
exports.generateResponse = (
  data,
  message,
  res,
  statusCode = STATUS_CODE.OK
) => {
  return res.status(statusCode).send({
    status: true,
    data,
    message,
  });
};

exports.parseBody = (body) => {
  let obj;
  console.log(body);
  if (typeof body === "object") obj = body;
  else obj = JSON.parse(body);
  return obj;
};
