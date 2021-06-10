const { readFile } = require('fs/promises');
const { join } = require('path');
const { error } = require('./constants');
const User = require('./user');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: [ 
    "id",
    "name",
    "profession",
    "age"
  ],
};

class File {
  static async csvToJson(filePath) {
    const fileContent = await this.getFileContent(filePath);
    const validation = this.isValid(fileContent);
    if (!validation.valid) throw new Error(validation.error)
    const users = this.parseCSVtoJSON(fileContent);
    return users;
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, filePath);
    return (await readFile(fileName)).toString('utf8');
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...data] = csvString.split('\r\n');

    const isHeaderValid = header === options.fields.join(',');
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      }
    }

    const isContentLengthAccepted = (
      data.length > 0 && data.length <= options.maxLines
    );
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      }
    }

    return { valid: true };
  }

  static parseCSVtoJSON(csvString) {
    const [firstLine, ...lines] = csvString.split('\r\n');
    const header = firstLine.split(',');
    const users = [];

    for (let line of lines) {
      const user = {};
      const fieldValues = line.split(',');
      // for (let n = 0; n < fieldValues.length; n++) {
      for (const index in fieldValues) {
        user[header[index]] = fieldValues[index];
      }
      users.push(new User(user));
    }
    return users;
  }
}

module.exports = File;