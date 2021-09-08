// @packages
import { v4 as uuidv4 } from "uuid";

import { CalculatorNormal } from "../calculator/calculator-normal";
import { CalculatorSpecialPrice } from "../calculator/calculator-special-price";
import { CalculatorWeight } from "../calculator/calculator-weight";
import { CartProduct } from "./cart-product";
import { PriceCalculator } from "../calculator/price-calculator";
import { Product } from "../product/product";
import EventEmitter from "events";

export class Cart extends EventEmitter {
  private id: string;
  private cartProducts: CartProduct[];

  constructor(id: string) {
    super({})
    this.id = id;
    this.cartProducts = [];
  }

  public addProduct(product: Product, quantity: number) {
    const productSKU = product.getSKU();

    const productIndex = this.cartProducts.findIndex(
      (cartProduct) => cartProduct.product.getSKU() === productSKU
    );
    if (productIndex !== -1) {
      const cartProduct = this.cartProducts[productIndex]
      const isEnoughQuantity = cartProduct.product.validateExistence(cartProduct.getQuantity() + quantity)
      if (!isEnoughQuantity) throw new Error('Invalid Product')

      this.cartProducts[productIndex].addQuantity(quantity);
      return;
    }

    const isEnoughQuantity = product.validateExistence(quantity)
    if (!isEnoughQuantity) throw new Error('Invalid Product')

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

  public buyCart() {
      this.emit('boughtCart', {
        finalPrice: this.calculateFinalCartPrice(),
        cartProducts: [...this.cartProducts]
      })
      this.cartProducts = [];
  }

  public listProducts(): CartProduct[] {
      return this.cartProducts;
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
