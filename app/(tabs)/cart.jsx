import { View, Dimensions,FlatList,StyleSheet } from 'react-native'
import React from 'react'
import Header from '@/components/cart/CartHeader';
import useCartStore from '@/store/cartStore';
import { Button } from '@ui-kitten/components';
import Colors from '@/constants/Colors';
import CartItem from '@/components/cart/CartItem';
import OrderTotalSummary from '@/components/cart/OrderTotalSUmmary';
import withAuth from '@/components/auth/withAuth';
const Cart = () => {
    const handleExit = () => {
        router.push('/');
    };
    const { reduceProduct, addProduct, products } = useCartStore();
    const renderItem = ({ item }) => <CartItem item={item} />;
    const screenHeight = Dimensions.get('window').height;
    const listHeight = screenHeight * 0.4; // Adjust as needed
    const totalInfoHeight = screenHeight * 0.35;
    const { subtotal } = useCartStore();

    return (
        <View style={styles.container}>
            <Header title="Cart" handleExit={handleExit} />
            <View style={[styles.listContainer, { height: listHeight }]}>
                <FlatList
                    data={Object.values(products)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
                <View style={styles.blurEffect} />
            </View>
            <View style={{height:totalInfoHeight,backgroundColor:'white'}}>
            <OrderTotalSummary
                subtotal={subtotal}
                taxesAndFees={10.00} // TODO: change this to dynamic info
                deliveryFee={5.00} // TODO: change this to dynamic info
                />
            </View>
            <Button style={styles.button}>Checkout</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        position: 'relative',
    },
    listContent: {
        paddingBottom: 20, // Add some padding at the bottom for the blur effect
    },
    blurEffect: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust opacity as needed
    },
    button: {
        backgroundColor: Colors.primary,
    },
});

export default withAuth(Cart);