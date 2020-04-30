const utils = require('./utils');

const input = 'Genalogy';

console.log(utils.convertToClassName(input));
console.log(utils.convertClassNameToFileName(utils.convertToClassName(input)));
