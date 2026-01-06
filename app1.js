const http = require("http");
const routes = require("./routes");

const server = http.createServer((req, res) => {
  routes(req, res);
});

// const server = http.createServer(routes);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
