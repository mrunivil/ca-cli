const utils = require('./utils');
const fs = require('fs');
exports.create = ({ entityName }) => {
  files = new Map();
  const className = `${utils.convertToObjectName(entityName)}Entity`;
  files.set(
    utils.convertClassNameToFileName(className),
    templateEntity({ className })
  );
  return files;
};

const templateEntity = ({ className }) =>
  `import {AbstractEntity} from '../../core/domain/entity/abstract.entity';

export class ${className}Entity extends AbstractEntity {
    readonly id:string;
    private constructor({id}:Partial<${className}Entity>){
        super();
        this.id = id;
    }
    static from${className}Model({id}:Partial<${className}Model>):${className}Entity{
        return new ${className}Entity({id});
    }
}
`;
