const Service = require('./service');
const sinon = require('sinon');
const BASE_URL_1 = 'https://swapi.dev/api/planets/12';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

const mocks = {
  alderaan: require('../mocks/alderaan.json'),
  tatooine: require('../mocks/tatooine.json'),
}; 

(async() => {
  {
    const service = new Service()
    const withoutStub = await service.makeRequest(BASE_URL_1);
    // const withoutStub = await service.makeRequest('https://covid19-brazil-api.vercel.app/api/report/v1');
    console.log(withoutStub);
    console.log(JSON.stringify(withoutStub));
  }
  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.alderaan)

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.tatooine)

  var result = await service.makeRequest(BASE_URL_1);
  console.log(result);
  var result = await service.makeRequest(BASE_URL_2);
  console.log(result);

})();
