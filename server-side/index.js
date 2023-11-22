const port = process.env.PORT || 5000;
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(port);
