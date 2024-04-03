const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.post("/", (request, response) => {
  console.dir(request.body);
  response.send("[accepted]");
});

app.get("/", (request, response) => {
  response.type('html')
  console.log("Request", request.body);
  response.send("Hello world");
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;