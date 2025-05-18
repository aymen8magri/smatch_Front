import { Category } from "./Category";

export interface Product {
  id?: string;             
  name: string;          
  description: string;     
  price: number;         
  imageUrl: string;      
  category: Category; 
  createdAt?: Date;        
  updatedAt?: Date;       
}