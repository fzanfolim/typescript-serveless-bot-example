import DatabaseService from "@libs/database.service";

export interface ICliente {
    id: string;
    cpf?: string;
    pedidos?: PEDIDO[];
    
}

interface IListInterface extends ICliente {
    timestamp: number;

}

type PEDIDO = {
    item:string,
    id:string,
    categoria:string
};

export default class ClientModel {

    private _id: string;
    private _cpf: string;
    private _pedidos: {
        item:string,
        id:string,
        categoria:string
    }[];
    
    private databaseService:DatabaseService = new DatabaseService();

    constructor({ id, cpf = '',pedidos}: ICliente) {
        this._id = id;
        this._cpf = cpf;
        this._pedidos = pedidos;
        
    }

    /**
     * Set Id
     * @param value
     */
    setPedidos(cliente:PEDIDO):void {
        
        this._pedidos.push(cliente);
    }

    getPedidos() {
        return this._pedidos;
    }


     searchClient():Promise<ICliente| null>{ 

        return new Promise( async (resolve) =>{
            const searchParam = {
                TableName: process.env.LIST_TABLE,
                Key: {
                  id: this._id,
                },
              };
            
              let message:any = await this.databaseService.get(searchParam);
              if(message.Item){
                  this._pedidos = message.Item.pedidos
              }
              resolve(message.hasOwnProperty('Item') ? message.Item : null)
        })

      }

    saveClient():void{
              
        const params = {
            TableName: process.env.LIST_TABLE,
            Item: this.getEntityMappings()
        }

        this.databaseService.create(params);
      
    }



    getEntityMappings(): IListInterface {
        return {
            id: this._id,
            cpf: this._cpf,
            pedidos: this.getPedidos(),
            timestamp: new Date().getTime(),
        };
    }

}