import * as fs from 'fs/promises';

import { Product } from './product';
import { ProductLoader } from './product-loader'

export class FileProductLoader implements ProductLoader {
  async loadProducts(): Promise<Product[]> {
    const productsFromFile = await fs.readFile('products.json', { encoding: 'utf8' })
    console.log(productsFromFile)
    return []
  }
}