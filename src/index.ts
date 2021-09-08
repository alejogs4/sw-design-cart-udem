import { v4 as uuidv4 } from "uuid";
import { FileProductLoader } from './product/file-product-loader'
import { Store } from './store'
import { User } from './user'

(async function startProgram() {
  const store = new Store(new FileProductLoader())
  await store.loadProducts()

  const userID = uuidv4()
  const user = new User(userID, store)

  user.addProductToCart('', 10)
  user.addProductToCart('', 10)
  user.addProductToCart('', 10)
})()
