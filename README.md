## Description

This in NestJS template for a basic API REST with:
- [Authentication](#Authentication)
- [Authorization](#Authorization)
- [TypeORM with MYSQL](#TypeORMwithMYSQL)
- [Repository Base](#RepositoryBase)
- [Service Base](#ServiceBase)
- [Auditory Entities](#AuditoryEntities)
- Response Interceptor
- [Testing and Coverage](#TestingandCoverage)
- Swagger

These implementions were made following the [NestJS documentation](https://docs.nestjs.com/).

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

###BASIC EXPLANATION OF FILES INVOLVED:

## <a name="Authentication"></a>Authentication
You can find the files involved in the auth module. It was made using Passport with JWT strategy.
## <a name="Authorization"></a>Authorization
The files involved are inside the auth module: 
 - roles.decorator.ts
 - roels-auth.guard.ts

Those files were made following the [ NestJS documentation](https://docs.nestjs.com/).
## <a name="TypeORMwithMYSQL"></a>TypeORM with MYSQL
If you're gonna keep using MySQL you just will need to create your own .env following the .env.example. Otherwise you will need to change the db.config.ts file.
## <a name="RepositoryBase"></a>Repository Base
This is a basic repository who implements the IRepository interface that has the CRUD operations and it doesn't implement the soft delete logic.

This file also receive multiple generic classes to be able to perform the operations.
## <a name="ServiceBase"></a>Service Base
This is a basic service with the basic CRUD operations.
It needs: 
- Implemention of the RepositoryBase
- Function to get the body to validate if the resource already exist
- The article used for the resource
- The resource name
- A boolean to determine if it's neccesary to check if the resource already exists
## <a name="AuditoryEntities"></a>Auditory Entities
The files are inside the auditory module and are: <b>auditory.entity.ts</b> and <b>auditory.suscriber.ts</b>.

The only thing you will need to do for this to work it's that your new entity extends the AuditoryEntity class and the suscriber will do the rest.

## <a name="TestingandCoverage"></a>Testing and Coverage
For the coverage and testing configuration I followed this [link](https://dev.to/rohithart/nestjs-unit-and-e2e-testing-7pb)