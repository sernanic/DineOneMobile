// MenuItem.js

import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import useCartStore from '../../store/cartStore';
import { useRouter } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from './SectionItemBottomSheet';
import useProductStore from '@/store/selectedProductStore'
import Colors from '@/constants/Colors';


interface SectionItemProps {
    item: {
        id: string;
        name: string;
        price: string;
        calories: string;
    };
}

const SectionItem: React.FC<SectionItemProps> = ({ item }) => {
    const { reduceProduct, addProduct, products } = useCartStore();
    const { setSelectedProduct } = useProductStore();
    const product = products[item.id];
    const quantity = product ? product.quantity : 0;

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const openModal = (item: any) => {
        bottomSheetRef.current?.present();
        setSelectedProduct(item);
    };

    return (
        <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
            <View style={styles.item}>
                <BottomSheet ref={bottomSheetRef} />

                <Image
                    source={require('@/assets/images/react-logo.png')} // Replace with your image source
                    style={styles.itemImage}
                />

                <Text style={styles.itemTitle}>{item.name}</Text>
                <View style={styles.priceCaloriesContainer}>
                    <Text style={styles.itemCalories}>{item.calories}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.priceText}>{item.price}</Text>
                <View style={styles.addContainer}>
                    <Ionicons name='add' size={24} color={'#fff'} />
                </View>
            </View>
        </TouchableOpacity>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    boxWithImage: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
    },
    textContainer: {
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceCaloriesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 150

    },
    price: {
        fontSize: 16,
        color: 'green',
    },
    calories: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 10,
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor: "#F7F7F7",
        borderRadius: 15,
        width: 180,
        // height:150,
    },
    itemImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    itemTextContainer: {
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    itemPrice: {
        fontSize: 14,
        color: 'green',
    },
    itemCalories: {
        fontSize: 12,
        color: 'gray',
        marginLeft: 10,
    },
    selectedIndicator: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'blue',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    addContainer: {
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5
    },
    priceText: {
        fontWeight: '500'
    }
});

export default SectionItem;