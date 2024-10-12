import http from "node:http";

// 返回请求信息服务器
http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on("error", (err) => {})
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        // 接收完一个响应
        response.on("error", (err) => {
          console.error(err);
        });

        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        const responseBody = { headers, method, url, body };

        response.write(JSON.stringify(responseBody));
        response.end();
        // 结束
      });
  })
  .listen(8080);

// echo服务器
http
  .createServer((request, response) => {
    let body = [];
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("error", (err) => {
        //
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        response.end(body);
      });
  })
  .listen(8081);

// 优化的echo服务器
http
  .createServer((request, response) => {
    if (request.method === "POST" && request.url === "/echo") {
      let body = [];
      request
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          response.end(body);
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8082);

http.createServer((request, response) => {
    request.on('error', err => {
        console.error(err);
        response.statusCode = 400;
        response.end();
      });
      response.on('error', err => {
        console.error(err);
      });
    if (request.method === 'POST' && request.url === '/echo') {
        request.pipe(response);
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8083);
