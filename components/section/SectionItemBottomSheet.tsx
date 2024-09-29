import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView, useWindowDimensions, Button, Text } from 'react-native';
import React, { forwardRef, useCallback, useLayoutEffect, useMemo, useState, useEffect } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useProductStore from '@/store/selectedProductStore';
import useCartStore from '@/store/cartStore';
import FullWidthImage from './SectionImage'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['94%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    const { dismiss } = useBottomSheetModal();
    const { selectedProduct } = useProductStore();
    const { reduceProduct, addProduct, products } = useCartStore();

    const productId = selectedProduct?.id;
    const product = productId ? products[productId] : undefined;
    const quantity = product ? product.quantity : 1;
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const handleCloseModal = () => {
        dismiss();
    };

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (selectedProduct && quantity) {
            setTotalPrice(parseFloat(selectedProduct.price) * quantity);
        }
    }, [selectedProduct, quantity]);

    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ borderRadius: 10, backgroundColor: Colors.lightGrey }}
            overDragResistanceFactor={0}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
            <View style={styles.contentContainer}>
                {selectedProduct ? (
                    <View style={styles.container}>
                        <View style={styles.detailsContainer}>
                            {/* <FullWidthImage source={require('@/assets/images/react-logo.png')} onBackPress={handleCloseModal}/> */}
                            <View style={{ height: 200, }}>
                                <Animated.Image
                                    sharedTransitionTag={selectedProduct.name}
                                    source={require('@/assets/images/image-product-1-landscape.jpg')}
                                    style={{ width: width, height: '100%' }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 20 }}>

                                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <View style={styles.quantityButton}>
                                        <TouchableOpacity style={{ padding: 10 }} onPress={() => reduceProduct(selectedProduct)}>
                                            <Ionicons name='remove' size={20} color={'#fff'} />
                                        </TouchableOpacity>
                                        <View><Text style={{ color: '#fff' }}>{quantity}</Text></View>
                                        <TouchableOpacity style={{ padding: 10 }} onPress={() => addProduct(selectedProduct)}>
                                            <Ionicons name='add' size={20} color={'#fff'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {/*TODO: Add Title Styling */}
                            <Animated.View entering={FadeInDown.delay(600)}>
                                <Text style={styles.itemDescriptionTitle}>About the food</Text>
                                <Text style={styles.itemDescription}>{selectedProduct.description}</Text>
                            </Animated.View>
                        </View>
                        <View style={[styles.buttonContainer]}>
                            <TouchableOpacity
                                style={[styles.addToCartTouchable, styles.addCartButton]}
                                onPress={() => addProduct(selectedProduct)}
                            >
                                <Text style={styles.addToCartText}>
                                    Add {quantity} To Cart • ${totalPrice.toFixed(2)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <Text >No product selected</Text>
                )}
            </View>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    detailsContainer: {
        backgroundColor: '#fff',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 20,
        marginLeft: 20,

    },
    itemDescriptionTitle: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemDescription: {
        fontSize: 16,
        color: 'gray',
        padding: 20
    },
    calories: {
        fontSize: 18,
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: '#fff',
    },
    addCartButton: {
        borderRadius: 10,
        height: 50,
        backgroundColor: Colors.primary,
        marginBottom: 20,

    },
    addToCartTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityButton: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        height: 50,
        width: 110,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemName: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 15
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 15,
        color: Colors.primary
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'white'

    },
    textName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default BottomSheet;
