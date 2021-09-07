import { Product } from "./product";

export interface ProductLoader {
  loadProducts(): Product[]
}