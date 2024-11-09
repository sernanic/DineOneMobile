import { useState } from 'react';

export const useCheckout = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handlePaymentMessage = async (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'PAYMENT_SUCCESS') {
        await processPayment(data.token);
      }
    } catch (error) {
      console.error('Error processing payment message:', error);
    }
  };

  const processPayment = async (paymentToken) => {
    try {
      const response = await fetch('http://localhost:4000/api/client/10/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products, paymentToken })
      });
      const result = await response.json();
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setIsCheckoutOpen(false);
    }
  };

  return {
    isCheckoutOpen,
    setIsCheckoutOpen,
    handlePaymentMessage
  };
}; 