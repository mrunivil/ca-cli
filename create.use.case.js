const utils = require('./utils');
exports.create = ({ featureName, entityName, methodName }) => {
  files = new Map();
  const fileName = utils.convertToFileName(featureName);
  const className = utils.convertToClassName(featureName);
  const objectName = utils.convertToObjectName(entityName);

  files.set(
    `abstract.${fileName}.use.case.ts`,
    templateAbstractUseCase({ className, objectName, methodName, fileName })
  );
  files.set(
    `${fileName}.use.case.ts`,
    templateConcreteUseCase({ className, objectName, methodName, fileName })
  );
  return files;
};

templateAbstractUseCase = ({ className, objectName, methodName }) =>
  `import { AbstractCustomError } from '../../core/errors';
import { AbstractUseCase } from '../../core/domain/use-case/abstract.use.case';

export abstract class Abstract${className}UseCase extends AbstractUseCase {
  abstract execute(params?:Partial<${objectName}Entity>): Promise<${objectName}Entity | AbstractCustomError>;
}
`;
templateConcreteUseCase = ({ className, objectName, methodName, fileName }) =>
  `import { Injectable } from '@angular/core';
import { Abstract${className}UseCase } from './abstract.${fileName}.use.case';
import { Abstract${className}Repository } from '../data/repository/abstract.get.family.repository';

@Injectable()
export class ${className}UseCase extends AbstractUseCase {
  constructor(private repository: Abstract${className}Repository) {
    super();
  }
  async execute(params?:Partial<${objectName}Entity>): Promise<${objectName}Entity | AbstractCustomError>{
    await this.repository.${methodName}(params.data)
  };
}
`;
