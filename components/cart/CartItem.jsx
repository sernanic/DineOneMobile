import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import useCartStore from '@/store/cartStore';
import { Ionicons } from '@expo/vector-icons'


const CartItem = ({ item }) => {
    const { addProduct, reduceProduct,removeProduct } = useCartStore();

    const handleIncrement = () => addProduct(item);
    const handleDecrement = () => reduceProduct(item);
    const handleRemoval = () => removeProduct(item);


    return (
        <View style={styles.CardContainer}>
            <View style={styles.card}>
                <View style={styles.leftContent}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/80' }} // Replace with actual image source
                        style={styles.image}
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                        <View style={styles.quantityContent}>
                            <TouchableOpacity onPress={handleDecrement} style={styles.button}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <TouchableOpacity onPress={handleIncrement} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.rightContent}>
                    <TouchableOpacity onPress={handleRemoval} >
                        <Text style={styles.buttonText}><Ionicons name="close" size={24} color="gray" /></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    CardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '95%'
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    productInfo: {
        justifyContent: 'center',
        height:'100%',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        width: "70%"
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: 'gray',
        marginTop:10,
    },
    calories: {
        fontSize: 12,
        color: 'gray',
    },
    quantityContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        borderColor:'gray',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '400',
        color:'gray'
    },
    quantity: {
        fontSize: 16,
        fontWeight: '400',
        marginHorizontal: 8,
    },
    rightContent:{
        height:'100%',
        flex:1,
        alignItems:'flex-end',
        justifyContent:'flex-end'

    }
});

export default CartItem;