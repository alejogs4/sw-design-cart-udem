import { Product } from "./product";
import { PriceCalculator } from './price-calculator'
import { CalculatorNormal } from "./calculator-normal";
import { CalculatorWeight } from "./calculator-weight";
import { CalculatorSpecialPrice } from "./calculator-special-price";

export class CartProduct {
    public id: string;
    public product: Product;
    private priceCalculator: PriceCalculator;
    public quantity: number;

    constructor(id: string, product: Product, quantity: number) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;

        if (id.includes('EA')) {
            this.priceCalculator = new CalculatorNormal();
        } else if (this.id.includes('WE')) {
            this.priceCalculator = new CalculatorWeight();
        } else {
            this.priceCalculator = new CalculatorSpecialPrice();
        }
    }

    public calculateFinalPrice(): number {
        return this.priceCalculator.calculateFinalPrice(this.product, this.quantity);
    }
}