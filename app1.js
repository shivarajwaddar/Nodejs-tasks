const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    // 1. Read the file first when user visits "/"
    return fs.readFile("message.txt", "utf8", (err, data) => {
      // If file doesn't exist, we just use an empty string
      const message = err ? "No messages yet!" : data;

      res.setHeader("Content-Type", "text/html");
      return res.end(`
        <html>
            <body>
                <h1>Current Message: ${message}</h1>
                <hr>
                <form action="/message" method="POST">
                    <label for="message">Enter Message:</label>
                    <input type="text" name="message">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>`);
    });
  }

  if (url === "/message" && method === "POST") {
    let chunkData = [];
    req.on("data", (chunk) => {
      chunkData.push(chunk);
    });

    return req.on("end", () => {
      let combinedBuffer = Buffer.concat(chunkData);
      // decodeURIComponent handles spaces (+) and special characters
      let formValues = decodeURIComponent(
        combinedBuffer.toString().split("=")[1]
      );

      fs.writeFile("message.txt", formValues, (err) => {
        if (err) console.log(err);
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
