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
    private _requiresValidationInCreation: boolean = true,
  ) {}

  async findOne(filter: TFilterDto): Promise<TResponse> {
    const response = await this._repository.findOne({ state: 1, ...filter });
    if (response == null)
      throw new HttpException(
        `No se ha encontrado ${this._article} ${this._resourceName}`,
        HttpStatus.NOT_FOUND,
      );
    return response;
  }

  async findAll(dto?: TFilterDto) {
    return await this._repository.findAll({ state: 1, ...dto });
  }

  async create(dto: TCreateDto) {
    if (this._requiresValidationInCreation) {
      const entityFounded = await this._repository.findOne(
        this._functionToCreateObjectToFindIfTheEntityAlreadyExists(dto),
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

    await this.findOne({ id } as any);

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
