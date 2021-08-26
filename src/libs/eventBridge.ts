
import * as EVENTBRIDGE from 'aws-sdk/clients/eventbridge';


export interface BusPutEvent {
  EventBusName:string
  Source: string;
  DetailType: string;
  Detail?: any | string;
}

export default class EventBridge{
  private eventBridge = new EVENTBRIDGE();

  private event:BusPutEvent;

  constructor(event:BusPutEvent){
    this.event = event
  }

  async putEvents(): Promise<EVENTBRIDGE.PutEventsResponse>  {

    this.event.Detail = (typeof this.event.Detail == 'object') ? JSON.stringify(this.event.Detail) : this.event.Detail;
    return this.eventBridge.putEvents({
      Entries: [this.event]
    }).promise();

  };
  
}
