export class Product {

  public SKU: string;
  public name: string;
  public availableUnits: number;
  public price: number;

  constructor(SKU: string, name: string, availableUnits: number, price: number) {
    this.SKU = SKU;
    this.name = name;
    this.availableUnits = availableUnits;
    this.price = price;
  }

  public validateExistence(quantity: number): boolean {
    return quantity <= this.availableUnits;
  }

  public discountUnits(quantity: number): void {
    this.availableUnits -= quantity;
  }
}