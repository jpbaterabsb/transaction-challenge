# Transaction Challenge

## Goal
The goal of this application are to register transactions by single file application/text and to show all transactions with the option to filter by afiliado or produtor

## 💻 Requirements

- Docker
- Docker Compose
- Node >=16

## 🚀 Install

1. Clone this repository
2. Then, run the below command in source folder of this repository:
```shell
npm run install:all
```

## ☕ Run the application

1. Run the below command in source folder of this repository:

```shell
docker-compose up
```


## ☕ Run tests

1. Run the below command in source folder of this repository:

```shell
npm run test:all
```

## Notes

### How to use 
the default user credentials is:
```
username: admin
password: 123456
```

### API Documentation:
The api documentaion was written in OpenApi standard if you wanna take a look in the API Documentation you will need access the below url after you run the docker-compose:
```
http://localhost:3333/api
```