import { v4 as uuidv4 } from "uuid";

import { Cart } from "./cart/cart";
import { CartProduct } from "./cart/cart-product";
import { Store } from "./store";



export class User {
  public id: string;
  private store: Store;
  private currentCart: Cart | null;

  constructor(id: string, store: Store) {
    this.id = id
    this.store = store
    this.currentCart = null

    this.onBoughtCart = this.onBoughtCart.bind(this)
  }

  public addProductToCart(sku: string, quantity: number) {
    if (this.currentCart === null) {
      this.currentCart = new Cart(uuidv4())
      this.currentCart.once('boughtCart', this.onBoughtCart)
    }

    const productToAdd = this.store.inventory.find(product => product.getSKU() === sku)
    if (!productToAdd) return
    this.currentCart.addProduct(productToAdd, quantity)
  }

  public buyCart() {
    if (this.currentCart) {
      this.currentCart.buyCart()
    }
  }

  private onBoughtCart({ finalPrice, cartProducts }: { finalPrice: number, cartProducts: CartProduct[] }) {
    this.store.addIncomes(finalPrice)
    cartProducts.forEach((cartProduct: CartProduct) => {
      const storeProduct = this.store.inventory.find(product => product.getSKU() === cartProduct.product.getSKU())
      storeProduct?.discountUnits(cartProduct.getQuantity())
    })
    this.currentCart = null
  }
}