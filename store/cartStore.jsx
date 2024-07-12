import { create } from 'zustand'

const useCartStore = create((set) => ({
  products: {},
  items: 0,
  addProduct: (product) => set((state) => {
    const existingProduct = state.products[product.id];
    
    if (existingProduct) {
      return {
        products: {
          ...state.products,
          [product.id]: {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          },
        },
        items: state.items + 1,
      };
    } else {
      return {
        products: {
          ...state.products,
          [product.id]: { ...product, quantity: 1 },
        },
        items: state.items + 1,
      };
    }
  }),
  reduceProduct: (product) => set((state) => {
    const existingProduct = state.products[product.id];

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        return {
          products: {
            ...state.products,
            [product.id]: {
              ...existingProduct,
              quantity: existingProduct.quantity - 1,
            },
          },
          items: state.items - 1,
        };
      } else {
        const { [product.id]: _, ...remainingProducts } = state.products;
        return {
          products: remainingProducts,
          items: state.items - 1,
        };
      }
    }
    return state; // No changes if product does not exist
  }),
  clearCart: () => set(() => ({
    items: 0,
    products: {},
  })),
}));

export default useCartStore;