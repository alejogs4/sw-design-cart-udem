import fs from 'fs';
import path from 'path'
import { promisify } from 'util'

import { Product, ProductDTO } from './product';
import { ProductLoader } from './product-loader'

const readFile = promisify(fs.readFile)

export class FileProductLoader implements ProductLoader {
  async loadProducts(): Promise<Product[]> {
    const productsFromFile = await readFile(path.join(__dirname, '..', 'products.json'), { encoding: 'utf8' })
    const products = JSON.parse(productsFromFile)
    return products.map((product: ProductDTO) => {
      return new Product(product.SKU, product.name, product.availableUnits, product.price)
    })
  }
}