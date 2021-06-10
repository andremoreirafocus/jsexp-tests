const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
  {
    const filePath = '../mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = '../mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = '../mocks/invalidHeader-invalid.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = '../mocks/threeItems-valid.csv';
    const expected = [
      {
        "name": "André Moreira",
        "id": 123,
        "profession": "Desenvolvedor fullstack",
        "birthYear": 1968
      },
      {
        "name": "Leandro Moreira",
        "id": 134,
        "profession": "investidor",
        "birthYear": 1998
      },
      {
        "name": "Alberto Moreira",
        "id": 942, 
        "profession": "Administrador",
        "birthYear": 1966
      }
    ];
    const result = await File.csvToJson(filePath);
    // console.log(result);
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();