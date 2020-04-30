const utils = require('./utils');
exports.create = ({ featureName, entityName, methodName }) => {
  const className = `${utils.convertToObjectName(entityName)}Model`;
  const fileName = `${utils.convertClassNameToFileName(className)}`;
  files = new Map();
  files.set(`${fileName}`, template({ className }));
  return files;
};

const template = ({ className }) => `
import { AbstractModel } from '../../core/data/model/AbstractModel';
export class ${className} extends AbstractModel {
    readonly id:string;
    private constructor({id}:Partial<${className}>){
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
