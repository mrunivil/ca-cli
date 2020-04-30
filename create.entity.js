const utils = require('./utils');
exports.create = ({ featureName, entityName, methodName }) => {
  const entityClassName = `${utils.pascalToClassName(entityName)}Entity`;
  const entityFileName = `${utils.convertClassNameToFileName(entityClassName)}`;

  const modelClassName = `${utils.pascalToClassName(entityName)}Model`;
  const modelImportClassName = `${utils.pascalToImportClassName(
    modelClassName
  )}`;

  files = new Map();
  files.set(
    `${process.cwd()}/output/features/${featureName}/domain/entity/${entityFileName}`,
    template({
      entityClassName,
      modelClassName,
      modelImportClassName,
    })
  );
  return files;
};

const template = ({
  entityClassName,
  modelClassName,
  modelImportClassName,
}) => `
import { AbstractModel } from '../../../../core/data/model/abstract.model';
import { ${modelClassName} } from '../../data/model/${modelImportClassName}';

export class ${entityClassName} extends AbstractModel {
    readonly id:string;
    private constructor({id}:Partial<${entityClassName}>){
        super();
        this.id = id;
    }
    static fromJSON({id}:any):${entityClassName}{
        return new ${entityClassName}({id});
    }
    static toJSON({id}:Partial<${entityClassName}>):any{
        return {
            id
        }
    }
    static from${modelClassName}({id}:Partial<${modelClassName}>):${entityClassName}{
        return new ${entityClassName}({id});
    }
}
`;
