// MenuItem.js

import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Dimensions } from 'react-native';
import useCartStore from '../../store/cartStore';
import { useRouter } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from './SectionItemBottomSheet';
import useProductStore from '@/store/selectedProductStore'
import Colors from '@/constants/Colors';
import {MotiView} from 'moti';


interface SectionItemProps {
    item: {
        id: string;
        name: string;
        price: string;
        calories: string;
    };
    index:number;
}

const SectionItem: React.FC<SectionItemProps> = ({ item,index }) => {
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

        <TouchableOpacity  onPress={() => openModal(item)}>
            <MotiView
            key={item.id} 
            style={styles.listContainer}
            from={{opacity: 0, translateY: 50}}
            animate={{opacity: 1, translateY: 0}}
            transition={{delay: 500 + index * 200}}>
            <View style={styles.item}>
                <View style={{flex:1,flexDirection:'column',width:"100%",alignItems: 'center',}}>
                    <BottomSheet ref={bottomSheetRef} />

                    <Image
                        source={require('@/assets/images/image-product-1-landscape.jpg')} // Replace with your image source
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>{item?.name.length > 30 ? `${item?.name.substring(0, 30)}...` : item?.name}</Text>
                    <View style={styles.priceCaloriesContainer}>
                        <Text style={styles.itemCalories}>{item.calories}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.priceText}>${item.price}</Text>
                    <View style={styles.addContainer}>
                        <Ionicons name='add' size={24} color={'#fff'} />
                    </View>
                </View>
            </View>
            </MotiView>
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
        height:220,
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor: "#ffff",
        borderRadius: 15,
        width: 180,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    itemImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        position:'relative',
    },
    itemTextContainer: {
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
        marginTop:10
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
    },
    listContainer: {
        width: Dimensions.get('window').width / 2 - 20,
        margin: 10,
        borderRadius: 20,
      },
});

export default SectionItem;