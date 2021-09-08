import { PriceCalculator } from "./price-calculator";
import { Product } from "../product/product";

export class CalculatorWeight implements PriceCalculator {
  calculateFinalPrice(product: Product, quantity: number): number {
    return product.price * (quantity / 1000)
  }
}