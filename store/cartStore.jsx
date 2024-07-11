import { create } from 'zustand'

const useCartStore = create((set) => ({
  products: [],
  items: 0,
  addProduct: (product) => set((state) => {
    state.items++;
    const hasProduct = state.products.find(p => p.id === product.id);    
    if(hasProduct)
    {
        return{
            products: state.products.map(p =>{
                if(p.id === product.id)
                {
                    return{...p,quantity:p.quantity + 1}
                }
                return p;
            })
        }
    }
    else{
        return{
            products:[...state.products,{...product,quantity:1}]
        }
    }
  }),
  reduceProduct: (product) => set((state) =>{
    return{
        products: state.products.map(p =>{
            if(p.id === product.id){
                state.items--;
                return{...p,quantity:p.quantity - 1}
            }
            return p;
        }).filter(p =>p.quantity > 0 )
    }
  }),
  clearCart: () => set(() => {
    return {
        items:0,
        products:[]
    }
  }),
}))

export default useCartStore