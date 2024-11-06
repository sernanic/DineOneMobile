import { View, FlatList, StyleSheet, Modal } from 'react-native';
import React from 'react';
import Header from '@/components/general/header';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CheckoutModal from '@/components/cart/CheckoutModal';
import withAuth from '@/components/auth/withAuth';
import { useCart } from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';

const Cart = () => {
  const { products, totalPrice } = useCart();
  const { isCheckoutOpen, setIsCheckoutOpen, handlePaymentMessage } = useCheckout();

  const handleExit = () => {
    router.push('/');
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <View style={styles.container}>
      <Header title="My Cart" handleExit={handleExit} />
      <View style={styles.mainContainer}>
        <CartList products={products} />
        <CartSummary totalPrice={totalPrice} onCheckout={handleCheckout} />
      </View>
      
      <CheckoutModalWrapper 
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        handlePaymentMessage={handlePaymentMessage}
      />
    </View>
  );
};

// Extracted CartList component for better organization
const CartList = ({ products }) => (
  <FlatList
    data={Object.values(products)}
    renderItem={({ item }) => <CartItem item={item} />}
    keyExtractor={(item) => item.itemId}
    contentContainerStyle={styles.listContent}
    ListFooterComponent={<View style={styles.listFooter} />}
    scrollEnabled={true}
  />
);

// Extracted CheckoutModal wrapper component
const CheckoutModalWrapper = ({ isCheckoutOpen, setIsCheckoutOpen, handlePaymentMessage }) => (
  <Modal
    visible={isCheckoutOpen}
    onRequestClose={() => setIsCheckoutOpen(false)}
    animationType="slide"
    transparent={true}
  >
    <CheckoutModal 
      isVisible={isCheckoutOpen}
      onClose={() => setIsCheckoutOpen(false)}
      onMessage={handlePaymentMessage}
    />
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  listFooter: {
    height: 400,
  },
});

export default withAuth(Cart);