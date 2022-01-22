# JOBIJOBA

## Running for development

Start mysql db and initialize schema

```shell
pushd docker && docker compose up -d && popd
``` 

Start backend server 

```shell
cd server && npm ci && npm start
```

Start frontend development server

```shell
cd client && npm ci && npm start
```

