import 'source-map-support/register';

// import ProductModel  from "../../models/product.model";
// import schema from './schema';

// import { FromSchema } from "json-schema-to-ts";


// type Request = FromSchema<typeof schema>;

const recebeEvento  = async (event) => {
  try {
    console.log(`handled order ${JSON.stringify(event)}`);
  } catch (error) {
    console.log(error);
  }

}

export const main = recebeEvento;
