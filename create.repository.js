const fs = require('fs');
const utils = require('./utils');
exports.createRepository = ({ featureName, entityName, methodName }) => {
  const entityClassName = `${utils.pascalToClassName(entityName)}Entity`;
  const entityImportClassName = `${utils.pascalToImportClassName(
    entityClassName
  )}`;

  const repositoryClassName = `${utils.convertToClassName(featureName)}`;
  const repositoryFileName = `${utils.convertToFileName(featureName)}`;
  const importFileName = `${utils.convertToFileName(featureName)}`;

  files = new Map();

  files.set(
    `abstract.${repositoryFileName}.repository.ts`,
    templateAbstractRepository({
      entityClassName,
      entityImportClassName,
      repositoryClassName,
      repositoryFileName,
      methodName,
      importFileName,
    })
  );
  files.set(
    `${repositoryFileName}.repository.ts`,
    templateConcreteRepository({
      entityClassName,
      entityImportClassName,
      repositoryClassName,
      repositoryFileName,
      methodName,
      importFileName,
    })
  );
  return files;
};

templateAbstractRepository = ({
  entityClassName,
  entityImportClassName,
  repositoryClassName,
  repositoryFileName,
  methodName,
  importFileName,
}) =>
  `
  import { AbstractCustomError } from '../../../../core/errors';
  import { AbstractRepository } from '../../../../core/data/repository/abstract.repository';
  import { ${entityClassName} } from '../../domain/entity/${entityImportClassName}';

  export abstract class Abstract${repositoryClassName}Repository extends AbstractRepository {
    abstract ${methodName}(params?:Partial<${entityClassName}>):Promise<${entityClassName} | AbstractCustomError>;
  }
`;
templateConcreteRepository = ({
  entityClassName,
  entityImportClassName,
  repositoryClassName,
  repositoryFileName,
  methodName,
  importFileName,
}) =>
  `
  import { AbstractCustomError } from '../../../../core/errors';
  import { Abstract${repositoryClassName}DataSource } from '../data-source/abstract.${importFileName}.data.source';
  import { Abstract${repositoryClassName}Repository } from './abstract.${importFileName}.repository';
  import { ${entityClassName} } from '../../domain/entity/${entityImportClassName}';

  export class ${repositoryClassName}Repository extends Abstract${repositoryClassName}Repository {
    constructor(private dataSource: Abstract${repositoryClassName}DataSource) {
      super();
    }
    async ${methodName}(params?:Partial<${entityClassName}>):Promise<${entityClassName} | AbstractCustomError>{
      throw new Error('not implemented yet');
    };
  }
`;
