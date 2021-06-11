const Service = require('./service');
const sinon = require('sinon');
const BASE_URL_1 = 'https://swapi.dev/api/planets/1';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

const mocks = {
  alderaan: require('../mocks/alderaan.json'),
  tatooine: require('../mocks/tatooine.json'),
};

(async() => {
  {
    const service = new Service()
    const withoutStub = await service.makeRequest(BASE_URL_1);
    console.log(withoutStub);
    console.log(JSON.stringify(withoutStub));
  }
  // const service = new Service()
  // const stub = sinon.stub(service, service.makeRequest.name)

  // stub
  //   .withArgs(BASE_URL_1)
  //   .resolves(mocks.tatooine)

  // service.makeRequest(BASE_URL_1);
  // service.makeRequest('https://swapi.dev/api/planets/1ere');

})();
