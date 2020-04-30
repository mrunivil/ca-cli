const Prompt = require('prompt');
const colors = require('colors/safe');

const feature = require('./create.feature');

let schema = {
  properties: {
    featureName: {
      description: `${colors.bgGreen(
        colors.black('Feature Name')
      )}, please type it in ${colors.green(
        'kebab-case'
      )} (example: get-product)`,
      pattern: /^[a-z\-]+$/,
      message: 'Field is required. Only small letters and dashes are allow.',
      required: true,
    },
    entityName: {
      description: `${colors.bgGreen(
        colors.black('Entity / Model Name')
      )}, please type it in ${colors.green(
        'PascalCase'
      )} (example: ProductList)`,
      pattern: /^[A-Z]{1}[a-zA-Z]+$/,
      message:
        'Field is required. Only letters are allow, frist must be capital letter.',
      required: true,
    },
    methodName: {
      description: `${colors.bgGreen(
        colors.black('Method Name')
      )}, please type it in ${colors.green('camelCase')} (example: getProduct)`,
      pattern: /^[a-z]{1}[a-zA-Z]+$/,
      message:
        'Field is required. Only letters are allow, frist must be small letter.',
      required: true,
    },
  },
};

feature.create({
  featureName: 'test',
  entityName: 'test',
  methodName: 'doTest',
});

// Prompt.start();
// Prompt.get(schema, (err, result) => {
//   if (err) {
//     console.error(err);
//     return 1;
//   }
//   feature.create({
//     featureName: result.featureName,
//     entityName: result.entityName,
//     methodName: result.methodName,
//   });
// });

// ask for feature name
// ask for entity name
// ask for method name

// createFeature('test-feature');
