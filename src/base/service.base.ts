import { HttpException, HttpStatus } from '@nestjs/common';
import {
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  Not,
  ObjectLiteral,
} from 'typeorm';

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
      dto: TCreateDto | TResponse,
    ) => any,
    protected _article: string,
    protected _resourceName: string,
    private _requiresValidationInCreation: boolean = true,
    private _requiresValidationInUpdate: boolean = true,
  ) {}

  async findOne(
    filter: TFilterDto,
    options: FindOneOptions<ObjectLiteral> = {},
  ): Promise<TResponse> {
    const response = await this._repository.findOne(
      { state: 1, ...filter },
      options,
    );
    if (response == null)
      throw new HttpException(
        `No se ha encontrado ${this._article} ${this._resourceName}`,
        HttpStatus.NOT_FOUND,
      );
    return response;
  }

  async findAll(
    dto?: TFilterDto,
    options: FindManyOptions<ObjectLiteral> = {},
  ) {
    return await this._repository.findAll({ state: 1, ...dto }, options);
  }

  async create(dto: TCreateDto) {
    if (this._requiresValidationInCreation) {
      const filterToKnowIfAlreadyExists =
        this._functionToCreateObjectToFindIfTheEntityAlreadyExists({
          ...dto,
          state: 1,
        });
      filterToKnowIfAlreadyExists.state = 1;
      const entityFounded = await this._repository.findOne(
        filterToKnowIfAlreadyExists,
      );
      if (entityFounded != null)
        throw new HttpException(
          `${this._article} ${this._resourceName} ya existe`,
          HttpStatus.CONFLICT,
        );
    }

    const entityCreated = await this._repository.create(dto);
    return entityCreated;
  }

  async update(id: number, dto: TUpdateDto) {
    if (Object.keys(dto).length == 0)
      throw new HttpException(
        `No se estan registrando cambios en ${this._article} ${this._resourceName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const entity = await this.findOne({ id } as any);
    if (this._requiresValidationInUpdate) {
      const valuesToFilter =
        this._functionToCreateObjectToFindIfTheEntityAlreadyExists({
          ...entity,
          ...dto,
        });
      const entityFounded = await this._repository.findOne({
        ...valuesToFilter,
        state: 1,
        id: Not(id),
      });
      if (entityFounded != null)
        throw new HttpException(
          `Ya existe un ${this._resourceName} con estos datos`,
          HttpStatus.CONFLICT,
        );
    }

    const result = await this._repository.update(id, dto);
    if (result.affected == 0)
      throw new HttpException(
        `Hubo un problema al actualizar ${this._article} ${this._resourceName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return null;
  }

  async remove(id: number) {
    await this.findOne({ id } as any);

    const result = await this._repository.logicRemove(id);
    if (result.affected == 0)
      throw new HttpException(
        `Hubo un problema de eliminar ${this._article} ${this._resourceName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return null;
  }
}
