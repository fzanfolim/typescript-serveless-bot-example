# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions



### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f hello --path src/functions/hello/mock.json` if you're using NPM
- `yarn sls invoke local -f hello --path src/functions/hello/mock.json` if you're using Yarn

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/hello' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Frederic"
}'
```

### Comandos Serveless
sls deploy -v
sls remove
sls package 
serverless invoke --function hello --data=2 // chamar funcao 
sls logs -f receiver -t // coleta log da funcao 
sls deploy function -f receiver // deploy funcao especifica


## URL WEBHOOK TELEGRAM BOT

https://api.telegram.org/bot1972056617:AAGiFtjLg5BcowhjtH2kbDgYrAfJGd6xpU4/setWebHook?url=https://wcrzek5je8.execute-api.us-east-1.amazonaws.com/dev/sender
https://api.telegram.org/bot<bot-token>/setWebHook?url=<webhook-url>/dev/sender

codigo devolver para o telegram : https://github.com/dpiTech/build-a-telegram-bot/blob/main/index.js

Dialogflow implementação 

https://github.com/googleapis/nodejs-dialogflow

### LAYERS 

npm --prefix ./src/layers/uuid install uuid @types/uuid 
npm --prefix ./src/layers/dialogflow install @google-cloud/dialogflow