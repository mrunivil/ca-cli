const utils = require('./utils');
exports.create = ({ featureName, entityName, methodName }) => {
  const entityClassName = `${utils.pascalToClassName(entityName)}Entity`;
  const entityImportClassName = `${utils.pascalToImportClassName(
    entityClassName
  )}`;

  const modelClassName = `${utils.pascalToClassName(entityName)}Model`;
  const modelFileName = `${utils.convertClassNameToFileName(modelClassName)}`;

  files = new Map();
  files.set(
    `${process.cwd()}/output/features/${featureName}/data/model/${modelFileName}`,
    template({
      entityClassName,
      entityImportClassName,
      modelClassName,
    })
  );
  return files;
};

const template = ({
  entityClassName,
  entityImportClassName,
  modelClassName,
}) => `
import { AbstractModel } from '../../../../core/data/model/abstract.model';
import { ${entityClassName} } from '../../domain/entity/${entityImportClassName}';

export class ${modelClassName} extends AbstractModel {
    readonly id:string;
    private constructor({id}:Partial<${modelClassName}>){
        super();
        this.id = id;
    }
    static fromJSON({id}:any):${modelClassName}{
        return new ${modelClassName}({id});
    }
    static from${entityClassName}({id}:Partial<${entityClassName}>):${modelClassName}{
        return new ${modelClassName}({id});
    }
    static toJSON({id}:Partial<${modelClassName}>):any{
        return {
            id
        }
    }
}
`;
