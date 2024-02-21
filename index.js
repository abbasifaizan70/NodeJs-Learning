const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.url} New request has been recieved\n`;
  fs.appendFile("logs.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end("about Page");
        break;
      case "/contact":
        res.end("contact Page");
        break;
    }
  });
  // console.log('My requst');
});

myServer.listen(8000, () => {
  console.log("My server running");
});
