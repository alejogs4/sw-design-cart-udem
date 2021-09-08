import { PriceCalculator } from './price-calculator'
import { Product } from '../product/product'

export class CalculatorSpecialPrice implements PriceCalculator {
    public calculateFinalPrice(product: Product, quantity: number): number {
        const discount = ~~(quantity/3) > 2 ? 0.5 : 0.2 * ~~(quantity/3)
        return (product.price * quantity) * discount
    }
}