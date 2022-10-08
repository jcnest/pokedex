<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Pokedex

Este proyecto tiene como objetivo brindar un «Rest-API» sobre los Pokémon.

## Descripción

Nota: Agregar la descripción del proyecto.

## Instalación

```bash
$ yarn install
```

## Base de datos

Se utiliza `docker` como contenedor, y `mongo` como base de datos. Los datos son persistido local
mente en la carpeta `./mongo`.

_Nota: Se utiliza `docker-compose` para la creación del contenedor de la base de datos._

```bash
# Para ejecutar el contenedor y levantar la base de datos.
$ docker-compose up -d
```

## Ejecutando la aplicación

```bash
# «development»
$ yarn start

# «watch mode»
$ yarn start:dev

# «production mode»
$ yarn start:prod
```

## Pruebas

```bash
# «unit tests»
$ yarn test

# «e2e tests»
$ yarn test:e2e

# «test coverage»
$ yarn test:cov
```

## Licencia

Pkedex es [MIT licensed](LICENSE).
