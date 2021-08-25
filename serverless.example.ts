import type { AWS } from '@serverless/typescript';
import listTable from '@resources/dynamoDB/list-table';
import receiverQueue from '@resources/SQS/receiverQueue'
import validadeCpfQueue from '@resources/SQS/validadeCpfQueue'
import repeatOrderQueue from '@resources/SQS/repeatOrderQueue'
import listItensQueue from '@resources/SQS/listItensQueue'
import setProductQueue from '@resources/SQS/setProductQueue'
import hello from '@functions/hello';
import sender from '@functions/sender';
import receiver from '@functions/receiver';
import validatorCpf from '@functions/validatorCpf';
import repeatOrder from '@functions/repeatOrder';
import listItens from '@functions/listItens';
import setOrder from '@functions/setOrder';

const serverlessConfiguration: AWS = { 
  service: 'typescript-lambda',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      forceExclude:['aws-sdk']
    },
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',
    list_table: '${self:service}-list-table-${opt:stage, self:provider.stage}',
    table_throughputs: {
      prod: 5,
      default: 1,
    },
    table_throughput: '${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}',
    prune:{
      automatic:true,
      number: 3,
      includeLayers:true
    },

  },
  package: {
    individually: true,
  },
  plugins: [
      'serverless-webpack',
      'serverless-prune-plugin',
      'serverless-iam-roles-per-function',
      'serverless-offline'
      
    ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    // versionFunctions: false,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      LIST_TABLE: '${self:custom.list_table}',
      NODE_PATH: './:/opt/node_modules',
      TELEGRAM_URL:  'https://api.telegram.org/bot1{{TOKEN_TELEGRAM_FATHER}}'
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
    ]
  },
  layers:{
    UuidDependenciesNodeModule:{
      path:'./src/layers/uuid',
      description:'uuid dependencies'
    },
    DialogflowDependenciesNodeModule:{
      path:'./src/layers/dialogflow',
      description:'dialogflow dependencies'
    }
  },
  // import the function via paths
  functions: { hello, sender, receiver, validatorCpf,repeatOrder, listItens , setOrder},
  resources: { 
    Resources: {
      ListTable: listTable,
      receiverQueue: receiverQueue,
      validadeCpfQueue: validadeCpfQueue,
      repeatOrderQueue: repeatOrderQueue,
      listItensQueue: listItensQueue,
      setProductQueue: setProductQueue
    } 
  }
};

module.exports = serverlessConfiguration;

