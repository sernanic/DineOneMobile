import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomSheetProps } from '../types';
import ReadMoreText from '@/components/general/ReadMoreText';

interface HeaderProps {
    item: BottomSheetProps['item'];
    handleCloseModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ item, handleCloseModal }) => {
    console.log(item);
    return (
        <Animated.View style={styles.header}>
            <View style={styles.imageContainer}>
                <Image
                    source={item.images[0]?.imageUrl 
                        ? { uri: item.images[0].imageUrl } 
                        : require('@/assets/images/image-product-1-landscape.jpg')}
                    style={styles.topImage}
                />
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
                    <TouchableOpacity style={styles.overlayButton}>
                        <Ionicons name="heart-outline" size={24} color="black" />
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
        width: '100%',
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
});

export default Header;
