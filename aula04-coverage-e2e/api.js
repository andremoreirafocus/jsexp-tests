const http = require('http');

const DEFAULT_USER = { username: 'AndreMoreira', password: '12345' };

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact page');
    return response.end();
  },
  '/login:post': async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data);
      console.log('user: ',user);
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHeader(401);
        response.write('Login failed!');
      } 
      else 
        response.write('Login succeded!');
      return response.end();
    }
  },
  default: (request, response) => {
    response.write('Hello World!');
    return response.end();
  }
}

const handler = function(request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  // console.log(routeKey);
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  return chosen(request, response);
  // return response.end('Hello World!');
};

const port = 3000;

const app = http.createServer(handler)
  .listen(port, () => console.log(`app running at http://localhost:${port}`));

module.exports = app;