# Intro

This project implements Didomi backend technical [assignement](https://github.com/didomi/challenges/blob/master/backend/README.md).
It uses Yarn as a package manager.

# Pre-requisites

## Running on your system

- Install [Node.js](https://nodejs.org/en/) version > 14.0.0. Recommended - 16.13.1;
- Install latest Yarn version: `npm install --global yarn`;
- Install [Postgres](https://www.postgresql.org/download/) version > 12. Recommended - 12.11;

## Running in Docker environment

- Install [Docker Engine](https://docs.docker.com/engine/install/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

# Environment vars

This project contains environment variables, you can find the list of them in the `.env.sample` file.
Overwrite them by copying `.env.sample` to `.env` file and adding new set of values to existing keys.

```bash
$ cp .env.sample .env
```

# Getting started

## Clone the repository

```bash
$ git clone https://github.com/chelovekgenek/didomi-backend-challenge.git <project_name>
$ cd <project_name>
```

## Running the app in the system environment

```bash
# install dependencies
$ yarn install

# run in the development mode
$ yarn start

# run in the watch mode
$ yarn start:dev

# run in the production mode
$ yarn build
$ yarn start:prod
```

## Running the app in the docker environment

```bash
$ docker-compose up
```

## Testing the app

```bash
# unit tests
$ yarn test

# unit tests in the watch mode
$ yarn test --watch

# test coverage
$ yarn test:cov
```

Navigate to `http://localhost:8080`

## API Document endpoints

- Swagger Spec Endpoint : http://localhost:8080/swagger.json
- Swagger-UI Endpoint : http://localhost:8080/docs
