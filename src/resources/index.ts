import { default as validadeCpfQueue } from './SQS/validadeCpfQueue';
import { default as setProductQueue } from './SQS/setProductQueue';
import { default as repeatOrderQueue } from './SQS/repeatOrderQueue';
import { default as receiverQueue } from './SQS/receiverQueue';
import { default as listItensQueue } from './SQS/listItensQueue';
import { default as listTable } from './dynamoDB/list-table';
import { default as orders } from './EventBridge/orders';
import { default as validadeCpfBus } from './EventBridge/validadeCpfBus';


export const RESOURCES = {
    ListTable:          listTable,
    receiverQueue:      receiverQueue,
    validadeCpfQueue:   validadeCpfQueue,
    repeatOrderQueue:   repeatOrderQueue,
    listItensQueue:     listItensQueue,
    setProductQueue:    setProductQueue,
    orders:             orders,
    validadeCpfBus:     validadeCpfBus, 
  } 
