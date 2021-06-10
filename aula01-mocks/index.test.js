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
        "id": 123,
        "name": "André Moreira",
        "profession": "Desenvolvedor fullstack",
        "age": 53
      },
      {
        "id": 134,
        "name": "Leandro Moreira",
        "profession": "investidor",
        "age": 23
      },
      {
        "id": 942,
        "name": "Alberto Moreira",
        "profession": "Administrador",
        "age": 55
      }
    ];
    const result = await File.csvToJson(filePath);
    console.log(result);
    deepStrictEqual(result, expected);
  }
})();