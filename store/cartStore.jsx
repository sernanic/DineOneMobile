import { create } from 'zustand'

const calculateSubtotal = (products) => {
  return Object.values(products).reduce((total, product) => {
    const price = parseFloat(product.price);
    const quantity = product.quantity;
    return total + (price * quantity);
  }, 0);
};

const useCartStore = create((set) => ({
  products: {},
  items: 0,
  subtotal: 0,
  addProduct: (product) => set((state) => {
    const existingProduct = state.products[product.id];
    let newProducts;
    
    if (existingProduct) {
      newProducts = {
        ...state.products,
        [product.id]: {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        },
      };
    } else {
      newProducts = {
        ...state.products,
        [product.id]: { ...product, quantity: 1 },
      };
    }
    
    return {
      products: newProducts,
      items: state.items + 1,
      subtotal: calculateSubtotal(newProducts),
    };
  }),
  reduceProduct: (product) => set((state) => {
    const existingProduct = state.products[product.id];

    if (existingProduct) {
      let newProducts;
      if (existingProduct.quantity > 1) {
        newProducts = {
          ...state.products,
          [product.id]: {
            ...existingProduct,
            quantity: existingProduct.quantity - 1,
          },
        };
      } else {
        const { [product.id]: _, ...remainingProducts } = state.products;
        newProducts = remainingProducts;
      }
      return {
        products: newProducts,
        items: state.items - 1,
        subtotal: calculateSubtotal(newProducts),
      };
    }
    return state; // No changes if product does not exist
  }),
  removeProduct: (product) => set((state) => {
    const existingProduct = state.products[product.id];
    
    if (existingProduct) {
      const { [product.id]: _, ...remainingProducts } = state.products;
      return {
        products: remainingProducts,
        items: state.items - existingProduct.quantity,
        subtotal: calculateSubtotal(remainingProducts),
      };
    }
    return state; // No changes if product does not exist
  }),
  clearCart: () => set(() => ({
    items: 0,
    products: {},
    subtotal: 0,
  })),
}));

export default useCartStore;