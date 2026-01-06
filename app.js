const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    // Return here to stop execution of the rest of the function
    return res.end(`
        <html>
            <body>
                <form action="/message" method="POST">
                    <label for="message">Enter Message:</label>
                    <input type="text" name="message">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>`);
  }

  if (url === "/message" && method === "POST") {
    let chunkData = [];
    req.on("data", (chunk) => {
      chunkData.push(chunk);
    });

    return req.on("end", () => {
      let combinedBuffer = Buffer.concat(chunkData);
      let formValues = combinedBuffer.toString().split("=")[1];

      // Use the SAME filename for both write and read
      fs.writeFile("message.txt", formValues, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  // Fixed the assignment error (= to ===)
  if (url === "/read") {
    return fs.readFile("message.txt", (err, data) => {
      if (err) {
        res.write("<h1>No data found yet!</h1>");
        return res.end();
      }
      res.setHeader("Content-Type", "text/html");
      return res.end(`<h1>Saved Message: ${data.toString()}</h1>`);
    });
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
