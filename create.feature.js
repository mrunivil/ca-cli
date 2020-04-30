const dataSource = require('./create.data.source');
const model = require('./create.model');
const entity = require('./create.entity');
const repository = require('./create.repository');
const useCase = require('./create.use.case');
const fs = require('fs');
const colors = require('colors/safe');
const core = require('./create.core');
const { exec } = require('child_process');
exports.create = ({ featureName, entityName, methodName }) => {
  try {
    exec('rm -rf ./output');
    // fs.rmdirSync(`${process.cwd()}/output`, { recursive: true });
  } catch (error) {
    console.log(error);
  }
  if (!fs.existsSync(`${process.cwd()}/output`)) {
    fs.mkdirSync(`${process.cwd()}/output`);
  }

  if (!!(featureName && featureName.length)) {
    try {
      const cores = core.create();

      const dataSources = dataSource.createDataSource({
        featureName,
        entityName,
        methodName,
      });

      const models = model.create({ featureName, entityName, methodName });

      const repositories = repository.createRepository({
        featureName,
        entityName,
        methodName,
      });

      const entities = entity.create({ featureName, entityName, methodName });

      const useCases = useCase.create({
        featureName,
        entityName,
        methodName,
      });

      fs.mkdirSync(`${process.cwd()}/output/core`);
      fs.mkdirSync(`${process.cwd()}/output/core/data`);
      fs.mkdirSync(`${process.cwd()}/output/core/data/data-source`);
      fs.mkdirSync(`${process.cwd()}/output/core/data/model`);
      fs.mkdirSync(`${process.cwd()}/output/core/data/repository`);
      fs.mkdirSync(`${process.cwd()}/output/core/domain`);
      fs.mkdirSync(`${process.cwd()}/output/core/domain/entity`);
      fs.mkdirSync(`${process.cwd()}/output/core/domain/use-case`);
      fs.mkdirSync(`${process.cwd()}/output/features`);
      fs.mkdirSync(`${process.cwd()}/output/features/${featureName}`);
      fs.mkdirSync(`${process.cwd()}/output/features/${featureName}/data`);
      fs.mkdirSync(
        `${process.cwd()}/output/features/${featureName}/data/model`
      );
      fs.mkdirSync(
        `${process.cwd()}/output/features/${featureName}/data/data-source`
      );
      fs.mkdirSync(
        `${process.cwd()}/output/features/${featureName}/data/repository`
      );
      fs.mkdirSync(`${process.cwd()}/output/features/${featureName}/domain`);
      fs.mkdirSync(
        `${process.cwd()}/output/features/${featureName}/domain/entity`
      );
      fs.mkdirSync(
        `${process.cwd()}/output/features/${featureName}/domain/use-case`
      );
      fs.mkdirSync(
        `${process.cwd()}/output/features/${featureName}/presentation`
      );
      fs.mkdirSync(
        `${process.cwd()}/output/features/${featureName}/presentation/presenter`
      );
      fs.mkdirSync(
        `${process.cwd()}/output/features/${featureName}/presentation/view-model`
      );
      fs.mkdirSync(
        `${process.cwd()}/output/features/${featureName}/presentation/state`
      );

      cores.forEach((val, key) => {
        fs.writeFileSync(`${process.cwd()}/output/${key}`, val);
      });

      dataSources.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/features/${featureName}/data/data-source/${key}`,
          val
        );
      });

      models.forEach((val, key) => {
        fs.writeFileSync(`${key}`, val);
      });

      repositories.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/features/${featureName}/data/repository/${key}`,
          val
        );
      });

      entities.forEach((val, key) => {
        fs.writeFileSync(`${key}`, val);
      });

      useCases.forEach((val, key) => {
        fs.writeFileSync(
          `${process.cwd()}/output/features/${featureName}/domain/use-case/${key}`,
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
