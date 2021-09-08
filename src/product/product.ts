export type ProductDTO =  {
  SKU: string;
  name: string;
  availableUnits: number;
  price: number;
}

export class Product {
  private SKU: string;
  private name: string;
  private availableUnits: number;
  private _price: number;
  

  constructor(SKU: string, name: string, availableUnits: number, price: number) {
    this.SKU = SKU;
    this.name = name;
    this.availableUnits = availableUnits;
    this._price = price;
  }

  public validateExistence(quantity: number): boolean {
    return quantity <= this.availableUnits;
  }

  public discountUnits(quantity: number): void {
    this.availableUnits -= quantity;
  }

  public getSKU(): string {
    return this.SKU
  }

  public get price(): number {
    return this._price;
  }
  
}