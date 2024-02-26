import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityTarget, ObjectLiteral } from 'typeorm';

import { RepositoryBase } from './repository.base';
import { EntityBase } from './entity.base';

export class ServiceBase<
  T extends EntityTarget<ObjectLiteral & EntityBase>,
  TResponse extends ObjectLiteral & EntityBase,
  TFilterDto,
  TCreateDto,
  TUpdateDto,
> {
  constructor(
    protected _repository: RepositoryBase<
      T,
      TResponse,
      TFilterDto,
      TCreateDto,
      TUpdateDto
    >,
    protected _functionToCreateObjectToFindIfTheEntityAlreadyExists: (
      dto: TCreateDto,
    ) => any,
    protected _article: string,
    protected _resourceName: string,
  ) {}

  async create(dto: TCreateDto) {
    const entityFounded = await this._repository.findOne(
      this._functionToCreateObjectToFindIfTheEntityAlreadyExists(dto),
    );
    if (entityFounded != null)
      throw new HttpException(
        `${this._article} ${this._resourceName} ya existe`,
        HttpStatus.CONFLICT,
      );

    const entityCreated = await this._repository.create(dto);
    return entityCreated;
  }
}
