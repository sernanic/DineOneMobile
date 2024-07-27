import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import React, { forwardRef, useCallback, useLayoutEffect, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useProductStore from '@/store/selectedProductStore';
import { Button, Divider, Text } from '@ui-kitten/components';
import useCartStore from '@/store/cartStore';
import FullWidthImage from './SectionImage'
import ReadMoreText from '@/components/general/ReadMoreText'
export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['100%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    const { dismiss } = useBottomSheetModal();
    const { selectedProduct } = useProductStore();
    const { reduceProduct, addProduct, products } = useCartStore();

    // Add a null check for selectedProduct
    const productId = selectedProduct?.id;
    const product = productId ? products[productId] : undefined;
    const quantity = product ? product.quantity : 1;


    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: Colors.primary,
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                </TouchableOpacity>
            ),
        });
    }, []);
    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.lightGrey }}
            overDragResistanceFactor={0}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
            <View style={styles.contentContainer}>
                {selectedProduct ? (
                    <View style={styles.container}>
                        <View style={styles.detailsContainer}>
                            <FullWidthImage source={require('@/assets/images/react-logo.png')} />

                            <View style={{flexDirection:'row',justifyContent:"space-between",padding:20}}>
                                <View>
                                    {/* TODO: Add Title Styling */}
                                    <View><Text>{selectedProduct.name}</Text></View>
                                    {/*TODO: Add pricing Styling */}
                                    <View><Text>{selectedProduct.price}</Text></View>
                                </View>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => reduceProduct(selectedProduct)}>
                                        <Ionicons name='remove' size={20} color={'#fff'} />
                                    </TouchableOpacity>
                                    <View><Text style={{color:'#fff'}}>{quantity}</Text></View>
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => addProduct(selectedProduct)}>
                                        <Ionicons name='add' size={20} color={'#fff'} />
                                    </TouchableOpacity> 
                                </View>
                            </View>
                            {/*TODO: Add Title Styling */}
                            <Text style={styles.itemDescription}>About the food</Text>
                            <ReadMoreText text={selectedProduct.description} maxLength={50} style={{fontSize:16}}/>
                      </View>
                        <View style={styles.buttonContainer}>
                            <Button style={styles.addCartButton} onPress={() => addProduct(selectedProduct)}>Add To Cart</Button>
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
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    detailsContainer: {
        backgroundColor: Colors.lightGrey,
    },
    stickySection: {
        backgroundColor: '#fff',
        marginLeft: 70,
        height: 100,
        justifyContent: 'flex-end',
    },
    stickySectionText: {
        fontSize: 20,
        margin: 10,
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
    itemDescription: {
        marginTop: 20,
        marginLeft: 20,
    },
    price: {
        fontSize: 18,
        marginBottom: 8,
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
        height: 50


    },
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        width: 350,
        height: 350,
        backgroundColor: 'red',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    quantityContainer:{
        flexDirection:'row',
        backgroundColor:'blue',
        height:50,
        width:110,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
});

export default BottomSheet;
