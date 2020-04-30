const fs = require('fs');
const utils = require('./utils');
exports.createDataSource = ({ featureName, entityName, methodName }) => {
  files = new Map();
  const fileName = utils.convertToFileName(featureName);
  const className = utils.convertToClassName(featureName);
  const objectName = utils.convertToObjectName(entityName);

  files.set(
    `abstract.${fileName}.data.source.ts`,
    templateAbstractDataSource({ className, objectName, methodName, fileName })
  );
  files.set(
    `${fileName}.data.source.ts`,
    templateConcreteDataSource({ className, objectName, methodName, fileName })
  );
  files.set(
    `mock.${fileName}.data.source.ts`,
    templateMockDataSource({ className, objectName, methodName, fileName })
  );
  return files;
};

templateAbstractDataSource = ({ className, objectName, methodName }) =>
  `import { AbstractCustomError } from '../../core/errors';
import { AbstractDataSource } from '../../core/data-source/abstract.data.source';

export abstract class Abstract${className}DataSource extends AbstractDataSource {
  abstract ${methodName}(params?:Partial<${objectName}Model>):Promise<${objectName}Model>;
}
`;
templateConcreteDataSource = ({
  className,
  objectName,
  methodName,
  fileName,
}) =>
  `import { Injectable } from '@angular/core';
import { Abstract${className}DataSource } from './abstract.${fileName}.data.source';

@Injectable()
export class ${className}DataSource extends Abstract${className}DataSource {
  async ${methodName}(params?:Partial<${objectName}Model>):Promise<${objectName}Model>{
    throw new Error('not implemented yet');
  };
}
`;
templateMockDataSource = ({ className, objectName, methodName, fileName }) =>
  `import { Abstract${className}DataSource } from './abstract.${fileName}.data.source';

export class Mock${className}DataSource extends Abstract${className}DataSource {
  async ${methodName}(params?:Partial<${objectName}Model>):Promise<${objectName}Model>{
    return ${objectName}Model.fromJSON({});
  };
}
`;
