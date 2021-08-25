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

## CATEGORIA DE EXEMPLO PARA CRIAR NO DYNAMODB

``` json
{
  "id": {
    "S": "BEBIDA"
  },
  "createdAt": {
    "N": "1629038068110"
  },
  "produto": {
    "L": [
      {
        "S": "Coca Cola 600ml"
      },
      {
        "S": "Guaraná 600ml"
      },
      {
        "S": "Cerveja skol lata 250ml"
      }
    ]
  },
  "updatedAt": {
    "N": "1629038068110"
  }
}

{
  "id": {
    "S": "CALZONE"
  },
  "createdAt": {
    "N": "1629038068110"
  },
  "produto": {
    "L": [
      {
        "S": "Calabreza"
      },
      {
        "S": "Mussarela"
      },
      {
        "S": "Palmito"
      },
      {
        "S": "4 Queijos"
      }
    ]
  },
  "updatedAt": {
    "N": "1629038068110"
  }
}

{
  "id": {
    "S": "PIZZA"
  },
  "createdAt": {
    "N": "1629038068110"
  },
  "produto": {
    "L": [
      {
        "S": "Calabresa"
      },
      {
        "S": "Mussarela"
      },
      {
        "S": "Palmito"
      },
      {
        "S": "4 Queijos"
      },
      {
        "S": "Portuguesa"
      },
      {
        "S": "Napolitana"
      }
    ]
  },
  "updatedAt": {
    "N": "1629038068110"
  }
}

```