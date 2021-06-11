const https = require('https');
class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        console.log('Status response code: ', response.statusCode);
        var data = '';
        response.on("data", chunk => {
          // console.log(chunk.toString());
          data += chunk.toString();
          console.log('Chunk received!');
        });
        response.on('end', (chunk) => {
          console.log('end'); 
          console.log(data);  
          resolve(data);
        })
        // response.on("error", reject);
      }).on("error", (error) => {
        console.log(error);
        reject(error);
      });
    })
  }
}

module.exports = Service;