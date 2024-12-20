let products = [{
  id: 1,
  name: 'test',
  description: 'desc'
}]

const getProducts = () => {
  return Promise.resolve(products)
}

const getProductById = (productId) => {
  return Promise.resolve(products.find(p => p.id === productId))
}

const createProduct = (product) => {
  const newId = products.length === 0 ? 1 : products[products.length - 1].id + 1
  products = [...products, { ...product, id: newId }]
  return Promise.resolve('success')
}

module.exports = {
  getProducts,
  getProductById,
  createProduct
}
