import { PriceCalculator } from './price-calculator'
import { Product } from '../product/product'

export class CalculatorNormal implements PriceCalculator {
    public calculateFinalPrice(product: Product, quantity: number): number {
        return product.price * quantity;
    }
}