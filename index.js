const Prompt = require('prompt');
const fs = require('fs');

const dataSource = require('./create.data.source');
const repository = require('./create.repository');
const useCase = require('./create.use.case');

let schema = {
  properties: {
    featureName: {
      description: 'feature name, in kebab-case (get-product)'
    },
    entityName: {
      description: 'entity / model name, in PascalCase (ProductList)'
    },
    methodName: {
      description: 'method name, in camelCase (getProduct)'
    }
  }
}

Prompt.start();
Prompt.get(schema, (err, result) => {
  if (err) {
    console.error(err);
    return 1;
  }
  createFeature({
    featureName: result.featureName,
    entityName: result.entityName,
    methodName: result.methodName,
  });
});

// ask for feature name
// ask for entity name
// ask for method name

const createFeature = ({ featureName, entityName, methodName }) => {
  try {
    fs.rmdirSync(`${process.cwd()}/output`, { recursive: true });
  } catch (error) {
    console.log(error);
  }
  if (!fs.existsSync(`${process.cwd()}/output`)) {
    fs.mkdirSync(`${process.cwd()}/output`);
  }

  if (!!(featureName && featureName.length)) {
    try {
      fs.mkdirSync(`${process.cwd()}/output/${featureName}`);
      fs.mkdirSync(`${process.cwd()}/output/${featureName}/data`);
      fs.mkdirSync(`${process.cwd()}/output/${featureName}/data/model`);
      fs.mkdirSync(`${process.cwd()}/output/${featureName}/data/data-source`);
      fs.mkdirSync(`${process.cwd()}/output/${featureName}/data/repository`);
      fs.mkdirSync(`${process.cwd()}/output/${featureName}/domain`);
      fs.mkdirSync(`${process.cwd()}/output/${featureName}/domain/entity`);
      fs.mkdirSync(`${process.cwd()}/output/${featureName}/domain/use-case`);
      fs.mkdirSync(`${process.cwd()}/output/${featureName}/presentation`);
      fs.mkdirSync(
        `${process.cwd()}/output/${featureName}/presentation/presenter`
      );
      fs.mkdirSync(
        `${process.cwd()}/output/${featureName}/presentation/view-model`
      );
      fs.mkdirSync(`${process.cwd()}/output/${featureName}/presentation/state`);

      const dataSources = dataSource.createDataSource({
        featureName,
        entityName,
        methodName,
      });

      const repositories = repository.createRepository({
        featureName,
        entityName,
        methodName,
      });

      const useCases = useCase.createUseCase({
        featureName,
        entityName,
        methodName,
      });

      dataSources.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/${featureName}/data/data-source/${key}`,
          val
        );
      });

      repositories.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/${featureName}/data/repository/${key}`,
          val
        );
      });

      useCases.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/${featureName}/domain/use-case/${key}`,
          val
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
};

createFeature('test-feature');

// const utils = require('./utils');
// console.log(utils.convertToFileName('update-products'));
// console.log(utils.convertToFileName('update'));
// console.log(utils.convertToFileName('update-products-life-cycle'));

// console.log(utils.convertToClassName('update-products'));
// console.log(utils.convertToClassName('update'));
// console.log(utils.convertToClassName('update-products-life-cycle'));
