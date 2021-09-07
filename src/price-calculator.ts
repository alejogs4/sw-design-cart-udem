import { Product } from "./product";

export interface PriceCalculator {
  calculateFinalPrice(product: Product, quantity: number): number
}