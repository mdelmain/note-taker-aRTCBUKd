const fs = require('fs');
const util = require('util');


const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write content to the JSON file 
 *  @param {string} filePath The location of the file
 *  @param {object} content The content you want to write to the file
 *  @returns {void} Nothing
 */
const writeToFile = (filePath, content) =>
  fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to append content to a file
 *  @param {string} filePath The location of the file
 *  @param {object} content The content you want to write to the file
 *  @returns {void} Nothing
 */
const appendToFile = (filePath, content) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(filePath, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, appendToFile };
