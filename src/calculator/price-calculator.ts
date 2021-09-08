import { Product } from "../product/product";

export interface PriceCalculator {
  calculateFinalPrice(product: Product, quantity: number): number
}