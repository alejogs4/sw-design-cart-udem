// @packages
import { v4 as uuidv4 } from "uuid";

import { CalculatorNormal } from "./calculator-normal";
import { CalculatorSpecialPrice } from "./calculator-special-price";
import { CalculatorWeight } from "./calculator-weight";
import { CartProduct } from "./cart-product";
import { PriceCalculator } from "./price-calculator";
import { Product } from "./product";

export class Cart {
  public id: string;
  private cartProducts: CartProduct[];

  constructor(id: string) {
    this.id = id;
    this.cartProducts = [];
  }

  // public listProducts():

  public addProduct(product: Product, quantity: number) {
    const productSKU = product.getSKU();

    const productIndex = this.cartProducts.findIndex(
      (cartProduct) => cartProduct.product.getSKU() === productSKU
    );
    if (productIndex !== -1) {
      this.cartProducts[productIndex].addQuantity(quantity);
      return;
    }

    const priceCalculator = this.createPriceCalculator(productSKU);
    const cartProductID = uuidv4();
    const newCartProduct = new CartProduct(
      cartProductID,
      product,
      quantity,
      priceCalculator
    );
    this.cartProducts.push(newCartProduct);
  }

  public removeProduct(product: Product) {
    const productSKU = product.getSKU();

    this.cartProducts = this.cartProducts.filter((cartProduct) => {
      const cartProductSKU = cartProduct.product.getSKU();
      return cartProductSKU !== productSKU;
    });
  }

  public calculateFinalCartPrice(): number {
    return this.cartProducts.reduce((finalPrice, cartProduct) => {
      return finalPrice + cartProduct.calculateFinalPrice();
    }, 0);
  }

  private createPriceCalculator(productSKU: string): PriceCalculator {
    let priceCalculator: PriceCalculator;
    if (productSKU.includes("EA")) {
      priceCalculator = new CalculatorNormal();
    } else if (productSKU.includes("WE")) {
      priceCalculator = new CalculatorWeight();
    } else {
      priceCalculator = new CalculatorSpecialPrice();
    }
    return priceCalculator;
  }
}
