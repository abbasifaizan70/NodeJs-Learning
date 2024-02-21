const http = require("http");
const fs = require("fs");
const url  = require('url')

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.url} New request has been recieved\n`;
  const myUrl = url.parse(req.url, true)
  console.log(myUrl)
  fs.appendFile("logs.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        const myName = myUrl.query.name;
        res.end(`Hi ${myName}`);
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