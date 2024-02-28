const fs = require("fs");

const logResRes = (filename) => {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${Date.now()}: ${req.method}: ${req.path} \n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logResRes };