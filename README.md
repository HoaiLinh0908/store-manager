# STORMAN

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Restart the database
$ npm run db:dev:restart
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# Restart the test database
$ npm run db:test:restart
```

```bash
# e2e tests
$ npm run test:e2e
```

## View the DB

```bash
# View the DB
$ npx prisma studio

# View test DB
$ npx dotenv -e test.env -- prisma studio
```
