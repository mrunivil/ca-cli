const dataSource = require('./create.data.source');
const model = require('./create.model');
const entity = require('./crete.entity');
const repository = require('./create.repository');
const useCase = require('./create.use.case');
const fs = require('fs');
const colors = require('colors/safe');
exports.create = ({ featureName, entityName, methodName }) => {
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
      const dataSources = dataSource.createDataSource({
        featureName,
        entityName,
        methodName,
      });

      const models = model.create({ entityName });

      const repositories = repository.createRepository({
        featureName,
        entityName,
        methodName,
      });

      const entities = entity.create({ entityName });

      const useCases = useCase.createUseCase({
        featureName,
        entityName,
        methodName,
      });

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

      dataSources.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/${featureName}/data/data-source/${key}`,
          val
        );
      });

      models.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/${featureName}/data/model/${key}`,
          val
        );
      });

      repositories.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/${featureName}/data/repository/${key}`,
          val
        );
      });

      entities.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/${featureName}/domain/entity/${key}`,
          val
        );
      });

      useCases.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/${featureName}/domain/use-case/${key}`,
          val
        );
      });
      console.log(
        `\nFeature ${colors.bgGreen(
          colors.black(`'${featureName}'`)
        )} successfully created`
      );
    } catch (error) {
      console.error(error);
    }
  }
};
