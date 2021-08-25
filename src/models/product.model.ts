import DatabaseService from "@libs/database.service";

export interface IProduct {
    id: string;
    produto?: string[] | null;
}

interface IListInterface extends IProduct {
    timestamp: number;

}

export default class ProductModel {

    private _id: string;
    private _produto: string[];
    private databaseService:DatabaseService = new DatabaseService();

    constructor({ id, produto = null }: IProduct) {
        this._id = id;
        this._produto = produto;
    }


    searchProducts():Promise<string[]>{ 

        return new Promise( async (resolve) =>{
            const searchParam = {
                TableName: process.env.LIST_TABLE,
                Key: {
                  id: this._id,
                },
              };
            
              let message:any = await this.databaseService.get(searchParam);
              resolve(message.hasOwnProperty('Item') ? message.Item.produto : [])
        })

      }



    getEntityMappings(): IListInterface {
        return {
            id: this._id,
            produto: this._produto,
            timestamp: new Date().getTime(),
        };
    }

}