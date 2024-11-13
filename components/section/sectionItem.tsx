// MenuItem.js

import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Dimensions } from 'react-native';
import useCartStore from '../../store/cartStore';
import { useRouter } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from './SectionItemBottomSheet';
import useProductStore from '@/store/selectedProductStore'
import Colors from '@/constants/Colors';
import {MotiView} from 'moti';
import { useCustomerStore } from '@/store/customerStore';


interface ImageInterface {
  id: number;
  imageUrl: string;
}

interface SectionItemProps {
    item: {
        itemId: string;
        name: string;
        price: number;
        images: ImageInterface[];
        subsectionId: string;
        calories?: number;
    };
    index:number;
}

const SectionItem: React.FC<SectionItemProps> = ({ item,index }) => {
    const { reduceProduct, addProduct, products } = useCartStore();
    const { setSelectedProduct } = useProductStore();
    const product = products[item.itemId];
    const quantity = product ? product.quantity : 0;
     
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const customer = useCustomerStore((state) => state.customer);
    
    const isItemFavorited = useMemo(() => {
        return customer?.favorites?.some((fav: { itemId: string }) => fav.itemId === item.itemId) || false;
    }, [customer?.favorites, item.itemId]);

    const openModal = (item: any) => {
        bottomSheetRef.current?.present();
        setSelectedProduct(item);
    };

    return (
        <TouchableOpacity onPress={() => openModal(item)}>
            <MotiView
                key={item.itemId} 
                style={styles.listContainer}
                from={{opacity: 0, translateY: 20}}
                animate={{opacity: 1, translateY: 0}}
                transition={{
                    type: 'timing',
                    duration: 350,
                    delay: 150 + index * 100
                }}>
                <View style={styles.item}>
                    <BottomSheet ref={bottomSheetRef} item={item}/>
                    
                    {/* Image Section */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={item.images[0]?.imageUrl 
                                ? { uri: item.images[0].imageUrl } 
                                : require('@/assets/images/image-product-1-landscape.jpg')}
                            style={styles.itemImage}
                        />
                        {isItemFavorited && (
                            <View style={styles.heartIconContainer}>
                                <Ionicons name="heart" size={20} color="red"/>
                            </View>
                        )}
                    </View>

                    {/* Content Section */}
                    <View style={styles.contentContainer}>
                        <Text style={styles.itemTitle}>
                            {item?.name.length > 25 ? `${item?.name.substring(0, 25)}...` : item?.name}
                        </Text>
                        <View style={styles.detailsContainer}>
                            <View style={styles.priceCaloriesRow}>
                                <Text style={styles.priceText}>${(item.price / 100).toFixed(2)}</Text>
                                <View style={styles.caloriesChip}>
                                    <Text style={styles.caloriesText}>{item.calories || 500} cal</Text>
                                </View>
                            </View>
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
        height: 240,
        backgroundColor: "#FFF",
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        overflow: 'hidden',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    heartIconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 16,
        padding: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    itemTextContainer: {
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 6,
        letterSpacing: -0.4,
        textAlign: 'left',
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
        fontSize: 15,
        color: '#8E8E93',
        fontWeight: '500',
    },
    listContainer: {
        width: Dimensions.get('window').width / 2 - 24,
        margin: 12,
        borderRadius: 20,
    },
    caloriesText: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '400',
    },
    detailsContainer: {
        marginTop: 'auto',
    },
    contentContainer: {
        padding: 12,
        paddingTop: 16,
        flex: 1,
        justifyContent: 'space-between',
        height: 100,
    },
    priceCaloriesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    caloriesChip: {
        backgroundColor: '#F2F2F7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
});

export default SectionItem;
