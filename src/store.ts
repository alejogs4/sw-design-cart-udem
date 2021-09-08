import { Product } from "./product/product";
import { ProductLoader } from "./product/product-loader";

export class Store {
  public incomes: number;
  private productLoader: ProductLoader;
  public inventory: Product[];

  constructor(productLoader: ProductLoader) {
    this.incomes = 0;
    this.productLoader = productLoader;
    this.inventory = [];
  }

  public addIncomes(income: number): void {
    this.incomes += income;
  }

  public async loadProducts(): Promise<void> {
    this.inventory = await this.productLoader.loadProducts();
  }
}
