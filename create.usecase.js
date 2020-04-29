const fs = require('fs');
const utils = require('./utils');
exports.createUsecase = ({ featureName, entityName, methodName }) => {
    files = new Map();
    const fileName = utils.convertToFileName(featureName);
    const className = utils.convertToClassName(featureName);
    const objectName = utils.convertToObjectName(entityName);

    files.set(
        `abstract.${fileName}.usecase.ts`,
        templateAbstractUsecase({ className, objectName, methodName, fileName })
    );
    files.set(
        `${fileName}.usecase.ts`,
        templateConcreteUsecase({ className, objectName, methodName, fileName })
    );
    files.set(
        `mock.${fileName}.usecase.ts`,
        templateMockUsecase({ className, objectName, methodName, fileName })
    );
    return files;
};

templateAbstractUsecase = ({ className, objectName, methodName }) => `
    import {AbstractCustomError} from '../../core/errors';
    import {AbstractUsecase} from '../../core/domain/usecase/abstract.usecase';

    export abstract class Abstract${className}Usecase extends AbstractUsecase {
        abstract execute(params?:Partial<${objectName}Entity>):Promise<${objectName}Entity>;
    }
`;
templateConcreteUsecase = ({
    className,
    objectName,
    methodName,
    fileName,
}) => `
    import {Abstract${className}Usecase} from './abstract.${fileName}.usecase';

    export class ${className}Usecase extends Abstract${className}Usecase {
        async execute(params?:Partial<${objectName}Entity>):Promise<${objectName}Entity>{
            throw new Error('not implemented yet');
        };
    }
`;
templateMockUsecase = ({ className, objectName, methodName, fileName }) => `
import {Abstract${className}Usecase} from './abstract.${fileName}.usecase';

    export class Mock${className}Usecase extends Abstract${className}Usecase {
        async execute(params?:Partial<${objectName}Entity>):Promise<${objectName}Entity>{
            return ${objectName}Model.fromJSON({});
        };
}
`;
