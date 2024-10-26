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
import { LinearGradient } from 'expo-linear-gradient';

interface ImageInterface {
    id: number;
    imageUrl: string;
  }
interface BottomSheetProps {
    item: {
        id: string;
        name: string;
        price: number;
        images: ImageInterface[];
        subsectionId: string;
        description?: string;
    };
}

const BottomSheet = forwardRef<Ref, BottomSheetProps>(({ item }, ref) => {
    const snapPoints = useMemo(() => ['100%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    const { dismiss } = useBottomSheetModal();
    const { reduceProduct, addProduct, products } = useCartStore();

    const product = products[item.id];
    const quantity = product ? product.quantity : 1;
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const handleCloseModal = () => {
        dismiss();
    };

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(item.price * quantity);
    }, [item, quantity]);

    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: "transparent"
            }}
            overDragResistanceFactor={0}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
                
            <View style={styles.contentContainer}>
                <View style={styles.container}>
                    <View style={styles.detailsContainer}>
                        <View style={styles.imageContainer}>
                            <Animated.Image
                                sharedTransitionTag={item.name}
                                source={item.images[0]?.imageUrl ? { uri: item.images[0].imageUrl } : require('@/assets/images/image-product-1-landscape.jpg')}
                                style={styles.topImage}
                            />
                            <LinearGradient
                                colors={['#FFFFFF', 'rgba(255, 255, 255, 0)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.gradientOverlay}
                            />
                            <View style={styles.buttonOverlay}>
                                <TouchableOpacity style={styles.overlayButton} onPress={handleCloseModal}>
                                    <Ionicons name="close" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.overlayButton}>
                                    <Ionicons name="heart-outline" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.quantityContainer}>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <View style={styles.quantityButton}>
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => reduceProduct(item)}>
                                        <Ionicons name='remove' size={20} color={'#fff'} />
                                    </TouchableOpacity>
                                    <View><Text style={{ color: '#fff' }}>{quantity}</Text></View>
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => addProduct(item)}>
                                        <Ionicons name='add' size={20} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Animated.View entering={FadeInDown.delay(600)}>
                            <Text style={styles.itemDescriptionTitle}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.description || 'No description available'}</Text>
                        </Animated.View>
                    </View>
                    <View style={[styles.buttonContainer]}>
                        <TouchableOpacity
                            style={[styles.addToCartTouchable, styles.addCartButton]}
                            onPress={() => addProduct(item)}
                        >
                            <Text style={styles.addToCartText}>
                                Add {quantity} To Cart • ${totalPrice.toFixed(2)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    detailsContainer: {
        backgroundColor: '#fff',
        paddingTop: 0,
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
    topImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    imageContainer: {
        position: 'relative',
        zIndex: 1,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -20, // This creates the overlap effect
        zIndex: 2,
    },
    buttonOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    overlayButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomSheet;
