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
