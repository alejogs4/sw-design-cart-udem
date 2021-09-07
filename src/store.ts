import { Product } from "./product";
import { ProductLoader } from "./product-loader";

export class Store {
  public incomes: number;
  private productLoader: ProductLoader;
  public inventory: Product[];

  constructor(productLoader: ProductLoader) {
    this.incomes = 0;
    this.productLoader = productLoader;
    this.loadProducts();
  }

  public addIncomes(income: number): void {
    this.incomes += income;
  }

  private loadProducts(): void {
    this.inventory = this.productLoader.loadProducts();
  }
}
