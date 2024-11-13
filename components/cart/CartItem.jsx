import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import useCartStore from '@/store/cartStore';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ item }) => {
    const { addProduct, reduceProduct, removeProduct } = useCartStore();

    const handleIncrement = () => addProduct(item);
    const handleDecrement = () => reduceProduct(item);
    const handleRemoval = () => removeProduct(item);

    return (
        <View style={styles.cardContainer}>
            <Image
                source={{ uri: item.images[0]?.imageUrl || 'https://via.placeholder.com/80' }}
                style={styles.image}
            />
            
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.bottomContent}>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.price}>${(item.price / 100).toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1A1A1A',
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    quantity: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: '500',
        color: '#1A1A1A',
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1A1A1A',
        marginLeft: 16,
    },
});

export default CartItem;