const fs = require('fs');
const utils = require('./utils');
exports.createRepository = ({ featureName, entityName, methodName }) => {
  files = new Map();
  const fileName = utils.convertToFileName(featureName);
  const className = utils.convertToClassName(featureName);
  const objectName = utils.convertToObjectName(entityName);

  files.set(
    `abstract.${fileName}.repository.ts`,
    templateAbstractRepository({ className, objectName, methodName, fileName })
  );
  files.set(
    `${fileName}.repository.ts`,
    templateConcreteRepository({ className, objectName, methodName, fileName })
  );
  return files;
};

templateAbstractRepository = ({ className, objectName, methodName }) =>
  `import { AbstractCustomError } from '../../core/errors';
import { AbstractRepository } from '../../core/data/repository/abstract.repository';

export abstract class Abstract${className}Repository extends AbstractRepository {
  abstract ${methodName}(params?:Partial<${objectName}Entity>):Promise<${objectName}Entity>;
}
`;
templateConcreteRepository = ({
  className,
  objectName,
  methodName,
  fileName,
}) =>
  `import { Abstract${className}DataSource } from '../data-source/abstract.${fileName}.data.source';
import { Abstract${className}Repository } from './abstract.${fileName}.repository';

export class ${className}Repository extends Abstract${className}Repository {
  constructor(private dataSource: Abstract${className}DataSource) {
    super();
  }
  async ${methodName}(params?:Partial<${objectName}Entity>):Promise<${objectName}Entity>{
    throw new Error('not implemented yet');
  };
}
`;
