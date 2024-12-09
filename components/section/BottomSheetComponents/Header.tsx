import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedScrollHandler, interpolate, useReducedMotion } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomSheetProps } from '../types';
import ReadMoreText from '@/components/general/ReadMoreText';
import { useCustomerStore } from '@/store/customerStore';
import { authenticatedRequest } from '@/utils/apiClient';

interface HeaderProps {
    item: BottomSheetProps['item'];
    handleCloseModal: () => void;
    clientId: number;
    merchantId: string;
    authUUID: string;
    isFavorited: boolean;
}

const Header: React.FC<HeaderProps> = ({ item, handleCloseModal, clientId, merchantId, authUUID, isFavorited: initialIsFavorited }) => {
    const shouldReduceMotion = useReducedMotion();
    const scrollX = useSharedValue(0);
    const ITEM_WIDTH = Dimensions.get('window').width;
    const [isFavorited, setIsFavorited] = React.useState(initialIsFavorited);
    const [isLoading, setIsLoading] = React.useState(false);
    const customer = useCustomerStore((state) => state?.customer || {});
    const setCustomer = useCustomerStore((state) => state.setCustomer);

    const handleFavoritePress = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const response = await authenticatedRequest(
                'post',
                `/api/v1/client/${clientId}/merchant/${merchantId}/customers/favorites`,
                {
                    data: { itemId: item.itemId }
                }
            );
            
            if (response) {
                // Toggle the favorite state
                setIsFavorited(prev => !prev);
                
                // Update customer favorites in the store
                const updatedCustomer = { ...customer };
                const existingFavorite = customer.favorites?.find((fav: { itemId: string }) => fav.itemId === item.itemId);

                if (existingFavorite) {
                    // Item exists, remove it from favorites
                    updatedCustomer.favorites = customer.favorites.filter(
                        (fav: { itemId: string }) => fav.itemId !== item.itemId
                    );
                } else {
                    // Item doesn't exist, add it to favorites
                    const newFavorite = {
                        clientId,
                        createdAt: new Date().toISOString(),
                        customerAuthUUID: authUUID,
                        id: response.id,
                        itemId: item.itemId
                    };
                    updatedCustomer.favorites = [...(customer.favorites || []), newFavorite];
                }
                
                setCustomer(updatedCustomer);
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            if (!shouldReduceMotion) {
                scrollX.value = event.contentOffset.x;
            }
        },
    });

    return (
        <Animated.View style={styles.header}>
            <View style={styles.imageContainer}>
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                >
                    {item.images.length > 0 ? (
                        item.images.map((image, index) => (
                            <Image
                                key={index}
                                source={image?.imageUrl 
                                    ? { uri: image.imageUrl } 
                                    : require('@/assets/images/image-product-1-landscape.jpg')}
                                style={[styles.topImage, { width: ITEM_WIDTH }]}
                            />
                        ))
                    ) : (
                        <Image
                            source={require('@/assets/images/image-product-1-landscape.jpg')}
                            style={[styles.topImage, { width: ITEM_WIDTH }]}
                        />
                    )}
                </Animated.ScrollView>
                
                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                    {item.images.length > 0 ? (
                        item.images.map((_, index) => {
                            const inputRange = [
                                index * ITEM_WIDTH,
                                (index + 1) * ITEM_WIDTH,
                            ];
                            
                            return (
                                <Animated.View
                                    key={index}
                                    style={[
                                        styles.paginationDot,
                                        !shouldReduceMotion && {
                                            opacity: interpolate(
                                                scrollX.value,
                                                inputRange,
                                                [1, 0.5],
                                                'clamp'
                                            ),
                                            transform: [{
                                                scale: interpolate(
                                                    scrollX.value,
                                                    inputRange,
                                                    [1.2, 0.8],
                                                    'clamp'
                                                ),
                                            }],
                                        },
                                    ]}
                                />
                            );
                        })
                    ) : (
                        <Animated.View style={[styles.paginationDot]} />
                    )}
                </View>
                
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradientOverlay}
                />
                <View style={styles.buttonOverlay}>
                    <TouchableOpacity style={styles.overlayButton} onPress={handleCloseModal}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.overlayButton} 
                        onPress={handleFavoritePress}
                        disabled={isLoading}
                    >
                        <Ionicons 
                            name={isFavorited ? "heart" : "heart-outline"} 
                            size={24} 
                            color={isFavorited ? "red" : "black"} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <ReadMoreText 
                    text={item.description || 'No description available'} 
                    maxLength={150}
                    style={styles.itemDescription}
                />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        width: '100%',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 250, // Adjust this value as needed
        zIndex: 1,
    },
    topImage: {
        height: '100%',
        resizeMode: 'cover',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100, // Adjust this value as needed
    },
    buttonOverlay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
    },
    overlayButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -20, // Adjust this value to control the overlap
        zIndex: 2,
    },
    itemName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemDescription: {
        fontSize: 16,
        color: 'gray',
        fontWeight: '400',
        lineHeight: 25,
    },
    paginationContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        zIndex: 2,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'white',
        marginHorizontal: 4,
    },
});

export default Header;
