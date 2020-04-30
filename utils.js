// update-products

exports.pascalToClassName = (input) => {
  let className = input;
  className = className.charAt(0).toUpperCase() + className.slice(1);
  return className;
};
exports.pascalToImportClassName = (input) => {
  let importName = input;
  importName = importName.charAt(0).toUpperCase() + importName.slice(1);
  const capitalLetters = [];
  for (let i = 0; i < importName.length; i++) {
    if (importName.charAt(i).match(/[A-Z]/)) {
      capitalLetters.push(i);
    }
  }
  const tmp = importName.toLowerCase();
  let res = '';
  capitalLetters.forEach((val, index, array) => {
    res += tmp.substring(val, array[index + 1]) + '.';
  });
  return res.substring(0, res.length - 1);
};
exports.pascalToFileName = (input) => {
  let fileName = input;
  fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  const capitalLetters = [];
  for (let i = 0; i < fileName.length; i++) {
    if (fileName.charAt(i).match(/[A-Z]/)) {
      capitalLetters.push(i);
    }
  }
  const tmp = fileName.toLowerCase();
  let res = '';
  capitalLetters.forEach((val, index, array) => {
    res += tmp.substring(val, array[index + 1]) + '.';
  });
  return res + '.ts';
};

exports.convertToFileName = (input) => {
  let res = input.toLowerCase();
  let containsMinus = res.includes('-');
  while (containsMinus) {
    res = res.replace('-', '.');
    containsMinus = res.includes('-');
  }
  return res;
};
exports.convertToClassName = (input) => {
  let tmp = input.toLowerCase();
  let res = '';
  const parts = tmp.split('-');
  parts.forEach((part) => {
    res += part.charAt(0).toUpperCase() + part.slice(1);
  });
  return res;
};

exports.convertToObjectName = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

exports.convertClassNameToFileName = (className) => {
  let input = className;

  input = input.charAt(0).toUpperCase() + input.slice(1);

  const capitalLetters = [];
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i).match(/[A-Z]/)) {
      capitalLetters.push(i);
    }
  }

  const tmp = input.toLowerCase();
  let res = '';

  capitalLetters.forEach((val, index, array) => {
    res += tmp.substring(val, array[index + 1]) + '.';
  });
  res += 'ts';
  return res;
};

exports.convertClassNameToImport = (className) => {
  let input = className;

  input = input.charAt(0).toUpperCase() + input.slice(1);

  const capitalLetters = [];
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i).match(/[A-Z]/)) {
      capitalLetters.push(i);
    }
  }

  const tmp = input.toLowerCase();
  let res = '';

  capitalLetters.forEach((val, index, array) => {
    res += tmp.substring(val, array[index + 1]) + '.';
  });
  return res.substring(0, res.length - 1);
};
