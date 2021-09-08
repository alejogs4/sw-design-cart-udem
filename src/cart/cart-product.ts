import { Product } from '../product/product';
import { PriceCalculator } from '../calculator/price-calculator';

export class CartProduct {
	public id: string;
	public product: Product;
	private priceCalculator: PriceCalculator;
	private quantity: number;

	constructor(id: string, product: Product, quantity: number, priceCalculator: PriceCalculator) {
		this.id = id;
		this.product = product;
		this.quantity = quantity;
		this.priceCalculator = priceCalculator;
	}

	public calculateFinalPrice(): number {
		return this.priceCalculator.calculateFinalPrice(this.product, this.quantity);
	}

    public getQuantity() {
        return this.quantity
    }

	public addQuantity(quantity: number) {
		this.quantity += quantity;
	}
}
