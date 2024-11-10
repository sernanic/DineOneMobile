import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const BottomActions = ({ localQuantity, setLocalQuantity, totalPrice, handleAddToCart }) => {
    return (
        <View style={styles.stickyBottomContainer}>
            <View style={styles.bottomRowContainer}>
                <View style={styles.quantityButton}>
                    <TouchableOpacity 
                        style={styles.quantityButtonTouchable} 
                        onPress={() => {
                            if (localQuantity > 1) {
                                setLocalQuantity(prev => prev - 1);
                            }
                        }}
                    >
                        <Ionicons name="remove" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    
                    <View style={styles.quantityTextContainer}>
                        <Text style={styles.quantityText}>{localQuantity}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.quantityButtonTouchable} 
                        onPress={() => {
                            setLocalQuantity(prev => prev + 1);
                        }}
                    >
                        <Ionicons name="add" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.addToCartTouchable, styles.addCartButton]}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.addToCartText}>
                        Add To Bag • ${(totalPrice / 100).toFixed(2)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    stickyBottomContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    bottomRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityButton: {
        flexDirection: 'row',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '30%',
    },
    quantityButtonTouchable: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
    },
    quantityTextContainer: {
        height: '100%',
        width: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    addCartButton: {
        borderRadius: 30,
        height: 60,
        backgroundColor: Colors.primary,
        marginBottom: 20,
        width: '50%',
    },
    addToCartTouchable: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BottomActions;
