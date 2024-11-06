import { useState, useEffect } from 'react';
import useCartStore from '@/store/cartStore';

export const useCart = () => {
  const { products } = useCartStore();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = (items) => {
      return Object.values(items).reduce((total, item) => {
        return total + (parseFloat(item.price) * parseInt(item.quantity));
      }, 0).toFixed(2);
    };

    setTotalPrice(calculateTotalPrice(products));
  }, [products]);

  return {
    products,
    totalPrice
  };
}; 