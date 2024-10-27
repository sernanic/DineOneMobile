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
    };
    index:number;
}

const SectionItem: React.FC<SectionItemProps> = ({ item,index }) => {
    const { reduceProduct, addProduct, products } = useCartStore();
    const { setSelectedProduct } = useProductStore();
    const product = products[item.itemId];
    const quantity = product ? product.quantity : 0;
    // console.log(item);
     
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const openModal = (item: any) => {
        bottomSheetRef.current?.present();
        setSelectedProduct(item);
    };

    return (

        <TouchableOpacity  onPress={() => openModal(item)}>
            <MotiView
            key={item.itemId} 
            style={styles.listContainer}
            from={{opacity: 0, translateY: 50}}
            animate={{opacity: 1, translateY: 0}}
            transition={{delay: 500 + index * 200}}>
            <View style={styles.item}>
                <View style={{flex:1,flexDirection:'column',width:"100%",alignItems: 'center',}}>
                    <BottomSheet ref={bottomSheetRef} item={item}/>

                    <View style={styles.imageContainer}>
                        <Image
                            source={item.images[0]?.imageUrl ? { uri: item.images[0].imageUrl } : require('@/assets/images/image-product-1-landscape.jpg')}
                            style={styles.itemImage}
                        />
                        <View style={styles.heartIconContainer}>
                            <Ionicons name='heart-outline' size={20} color={'black'} />
                        </View>
                    </View>
                    <Text style={styles.itemTitle}>{item?.name.length > 30 ? `${item?.name.substring(0, 30)}...` : item?.name}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
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
        height: 198,
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor: "#FFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FBFBFB',
        width: 175,
        shadowColor: 'rgba(6, 51, 54, 0.10)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 5, // for Android
    },
    imageContainer: {
        position: 'relative',
        width: '85%',
        height: 85,
        marginTop: 12,
    },
    itemImage: {
        resizeMode: 'cover',
        borderRadius: 16,
        width: '100%',
        height: '100%',
    },
    heartIconContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 4,
    },
    itemTextContainer: {
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
        marginTop:10,
        fontFamily:'sofia-pro',
        width:'100%',
        paddingLeft:12
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
      
        color: '#97A2B0',  // Equivalent to var(--Neutral-Grey-2)
        fontFamily: 'Sofia Pro',  // Make sure this font is correctly installed and linked
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20.3,  // Since line-height is in px, use the exact value
        marginBottom:12
        
    },
    listContainer: {
        width: Dimensions.get('window').width / 2 - 20,
        margin: 10,
        borderRadius: 20,
      },
});

export default SectionItem;
