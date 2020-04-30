exports.create = () => {
  const files = new Map();
  files.set(
    'core/data/data-source/abstract.data.source.ts',
    templateAbstractDataSource()
  );
  files.set(
    'core/data/repository/abstract.repository.ts',
    templateAbstractRepository()
  );
  files.set(
    'core/domain/use-case/abstract.use.case.ts',
    templateAbstractUseCase()
  );
  files.set('core/errors.ts', templateAbstractCustomError());
  files.set('core/data/model/abstract.model.ts', templateAbstractModel());
  files.set('core/domain/entity/abstract.entity.ts', templateAbstractEntity());
  return files;
};

const templateAbstractDataSource = () =>
  `
    export abstract class AbstractDataSource {}
    `;
const templateAbstractRepository = () =>
  `
    export abstract class AbstractRepository {}
    `;
const templateAbstractUseCase = () =>
  `
    import { AbstractEntity } from '../../domain/entity/abstract.entity';
    import { AbstractCustomError } from '../../errors';

    export abstract class AbstractUseCase {
        abstract execute(params?:Partial<AbstractEntity>) : Promise < void | AbstractEntity | AbstractCustomError >
    }
    `;
const templateAbstractModel = () =>
  `
    export abstract class AbstractModel {}
    `;
const templateAbstractEntity = () =>
  `
    export abstract class AbstractEntity {}
    `;
const templateAbstractCustomError = () =>
  `
export abstract class AbstractCustomError extends Error {
    constructor(msg?: string) {
        super(msg || 'Something went wrong!');
    }
}
    `;
