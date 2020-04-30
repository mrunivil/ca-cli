const utils = require('./utils');
const fs = require('fs');
exports.create = (className) => {
    files = new Map();
    const entityName = utils.convertToObjectName(className);
    files.set();
};

templateModel = ({ className }) => `
    import {AbstractModel} from '../../core/data/model/abstract.model';

    export class ${className}Model extends AbstractModel {
        readonly id:string;

        private constructor({id}:Partial<${className}Model>){
            super();
            this.id = id;
        }

        static fromJSON({id}:any):${className}Model{
            return new ${className}Model({id});
        }

        static toJSON({id}:Partial<${className}Model>):any{
            return {
                id
            }
        }

        static from${className}Entity({id}:Partial<${className}Entity>):${className}Model{
            return new ${className}Model({id});
        }
    }
`;
