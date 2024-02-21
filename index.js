const http = require('http');
const fs = require('fs')

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.url} New request has been recieved\n`;
  fs.appendFile('logs.txt', log, (err, data) => {
    res.end("Ended");
  })
  // console.log('My requst');
  
})

myServer.listen(8000, () => {
  console.log('My server running')
})