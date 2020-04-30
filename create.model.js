const utils = require('./utils');
exports.create = ({ featureName, entityName, methodName }) => {
  const entityClassName = `${utils.convertToObjectName(entityName)}Entity`;
  const entityFileName = `${utils.convertClassNameToFileName(entityClassName)}`;
  const className = `${utils.convertToObjectName(entityName)}Model`;
  const fileName = `${utils.convertClassNameToFileName(className)}`;
  files = new Map();
  files.set(
    `${fileName}`,
    template({ className, entityClassName, entityFileName })
  );
  return files;
};

const template = ({ className, entityClassName, entityFileName }) => `
import { AbstractModel } from '../../../../core/data/model/abstract.model';
import { ${entityClassName} } from '../../domain/entity/${utils.convertClassNameToImport(
  entityClassName
)}';

export class ${className} extends AbstractModel {
    readonly id:string;
    private constructor({id}:Partial<${className}>){
        super();
        this.id = id;
    }
    static fromJSON({id}:any):${className}{
        return new ${className}({id});
    }
    static from${className}Entity({id}:Partial<${className}Entity>):${className}{
        return new ${className}({id});
    }
    static toJSON({id}:Partial<${className}>):any{
        return {
            id
        }
    }
}
`;
