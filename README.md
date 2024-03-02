## Description

This in NestJS template for a basic API REST with:
- [Authentication](#Authentication)
- [Authorization](#Authorization)
- [TypeORM with MYSQL](#TypeORM with MYSQL)
- [Repository Base](#Repository Base)
- [Service Base](#Service Base)
- [Coverage](#Coverage)
- [Auditory Entities](#Auditory Entities)
- [Response Interceptor](#Response Interceptor)

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

###EXPLANATION OF FILES INVOLVED:

## <a name="Authentication"></a>Authentication
You can find the files involved in the auth module. It was made using Passport with JWT strategy.
