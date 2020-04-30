// update-products
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
