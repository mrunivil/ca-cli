const utils = require('./utils');
exports.create = ({ featureName, entityName, methodName }) => {
  files = new Map();
  const fileName = utils.convertToFileName(featureName);

  const entityClassName = `${utils.pascalToClassName(entityName)}Entity`;
  const entityClassImportName = `${utils.pascalToImportClassName(
    entityClassName
  )}`;
  const useCaseClassName = `${utils.convertToClassName(featureName)}UseCase`;
  const useCaseImportName = `${utils.convertClassNameToImport(
    useCaseClassName
  )}`;
  const repositoryClassName = `${utils.convertToClassName(
    featureName
  )}Repository`;
  const repositoryImportName = `${utils.convertClassNameToImport(
    repositoryClassName
  )}`;

  files.set(
    `abstract.${fileName}.use.case.ts`,
    templateAbstractUseCase({
      entityClassImportName,
      entityClassName,
      useCaseClassName,
      useCaseImportName,
      repositoryClassName,
      repositoryImportName,
      methodName,
    })
  );
  files.set(
    `${fileName}.use.case.ts`,
    templateConcreteUseCase({
      entityClassImportName,
      entityClassName,
      useCaseClassName,
      useCaseImportName,
      repositoryClassName,
      repositoryImportName,
      methodName,
    })
  );
  return files;
};

templateAbstractUseCase = ({
  entityClassName,
  entityClassImportName,
  useCaseClassName,
}) =>
  `
  import { ${entityClassName} } from '../entity/${entityClassImportName}';
  import { AbstractUseCase } from '../../../../core/domain/use-case/abstract.use.case';
  import { AbstractCustomError } from '../../../../core/errors';

  export abstract class Abstract${useCaseClassName} extends AbstractUseCase {
    abstract execute(params?:Partial<${entityClassName}>): Promise<${entityClassName} | AbstractCustomError>;
  }
`;
templateConcreteUseCase = ({
  entityClassName,
  entityClassImportName,
  useCaseClassName,
  useCaseImportName,
  repositoryClassName,
  repositoryImportName,
  methodName,
}) =>
  `
  import { Injectable } from '@angular/core';
  import { Abstract${useCaseClassName} } from './abstract.${useCaseImportName}';
  import { Abstract${repositoryClassName} } from '../../data/repository/abstract.${repositoryImportName}';
  import { ${entityClassName} } from '../entity/${entityClassImportName}';
  import { AbstractCustomError } from '../../../../core/errors';

  @Injectable()
  export class ${useCaseClassName} extends Abstract${useCaseClassName} {
    constructor(private repository: Abstract${repositoryClassName}) {
      super();
    }
    async execute(params?:Partial<${entityClassName}>): Promise<${entityClassName} | AbstractCustomError>{
      return await this.repository.${methodName}(params)
    };
  }
`;
