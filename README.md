# JOBIJOBA

Running for development 👷
--

## Start mysql db and initialize schema

```shell
pushd docker && docker compose up -d && popd
``` 

## Start backend server 

```shell
cd server && npm ci && npm start
```

## Start frontend development server

```shell
cd client && npm ci && npm start
```

## Using adminer to inspect database

visit http://localhost:8080 and use the mysql credentials defined in your docker-compose.yaml

## Environment Variables (with default values)
```shell
MYSQL_HOST=localhost
MYSQL_USERNAME=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=fermine
JWT_SIGNIN_KEY=""
```

> Note: An empty JWT_SIGNIN_KEY variable will lead to random key generation, making your session
  revoked when the development servers restarts

