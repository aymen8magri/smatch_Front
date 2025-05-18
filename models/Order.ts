import { User } from './User';       
import { Product } from './Product'; 

export interface Order {
  _id?: string;
  user: string | User;             
  products: Array<string | Product>; 
  orderDate?: string;            
  total: number;
}
