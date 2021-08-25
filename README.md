# Serverless - AWS Node.js Typescript Bot Example


## Installation/deployment instructions

Para iniciar o projeto é necessário ter o serveless instalado e as credenciais da AWS configurada.

Pode confirgurar com comando :

```
sls config credentials -o --provider aws --key={{KEY}} --secret={{SECRET}}

```
   - Instalação 

```
$ git clone http://projeto...
$ npm i
$ npm --prefix ./src/layers/uuid install uuid @types/uuid 
$ npm --prefix ./src/layers/dialogflow install @google-cloud/dialogflow
$ mv serverless.example.ts serveless.ts

```
 -  O arquivo serveless.ts -- Incluir na Env TELEGRAM_URL o token do telegram father para integração com seu bot telegram.



### Comandos Serveless
```
$ sls deploy -v
$ sls remove
$ sls package 
$ serverless invoke --function hello --data=2  
$ sls logs -f receiver -t
$ sls deploy function -f receiver
```

## URL WEBHOOK TELEGRAM BOT


https://api.telegram.org/bot{{bot-token}}/setWebHook?url={{webhook-url}}/dev/sender


## Dialogflow

https://github.com/googleapis/nodejs-dialogflow

