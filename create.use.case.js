const fs = require('fs');
const utils = require('./utils');
exports.createUseCase = ({ featureName, entityName, methodName }) => {
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

templateAbstractUseCase = ({ className, objectName, methodName }) => `
    import {AbstractCustomError} from '../../core/errors';
    import {AbstractUseCase} from '../../core/domain/use.case/abstract.use.case';

    export abstract class Abstract${className}UseCase extends AbstractUseCase {
        abstract execute(params?:Partial<${objectName}Entity>):Promise<${objectName}Entity>;
    }
`;
templateConcreteUseCase = ({ className, objectName, methodName, fileName }) => `
    import {Abstract${className}UseCase} from './abstract.${fileName}.use.case';

    export class ${className}UseCase extends Abstract${className}UseCase {
        async execute(params?:Partial<${objectName}Entity>):Promise<${objectName}Entity>{
            throw new Error('not implemented yet');
        };
    }
`;
