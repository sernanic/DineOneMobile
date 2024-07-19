import React, { useEffect, useLayoutEffect } from 'react';
import { View,  StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '../../components/parallaxScrollView';
import Colors from '@/constants/Colors';
import {  Button, Divider, Text } from '@ui-kitten/components';
import useCartStore from '../../store/cartStore';


const SectionItemScreen = () =>
{
    const router = useRouter();
    const { SectionItemParam } = useLocalSearchParams();
    const item = SectionItemParam ? JSON.parse(SectionItemParam) : null;
    const {reduceProduct,addProduct} = useCartStore()
    console.log(item)

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
        <View style={styles.container}>
            <ParallaxScrollView style={{ flex: 1 }}
                parallaxHeaderHeight={250} backgroundColor={'#fff'}
                renderBackground={() => <Image source={require('@/assets/images/react-logo.png')} style={{ height: 300, width: '100%' }} />}
                contentBackgroundColor={Colors.lightGrey}
                stickyHeaderHeight={100}
                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <View style={{flex:1,justifyContent:'space-between'}}>
                        <Text style={styles.stickySectionText}>item name</Text>
                        <Text style={styles.stickySectionText}>item name</Text>

                        </View>
                    </View>
                )}>
                <View style={styles.detailsContainer}>
                <View style={{flex:1,justifyContent:'space-between',flexDirection:'row'}}>
                        <Text style={styles.stickySectionText}>{item.name}</Text>
                        <Text style={styles.stickySectionText}>{item.price}</Text>

                        </View>
                    <Divider/>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
            </ParallaxScrollView>
            <View style={styles.buttonContainer}>
                <Button onPress={()=>addProduct(item)}>Add To Cart</Button>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
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
        marginTop:20,
        marginLeft:20,
    },
    itemDescription:{
        marginTop:20,
        marginLeft:20,
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
        bottom: 100, // Adjust this value to position the button higher
        left: 0,
        right: 0,
        padding: 20,
      },
      
});

export default SectionItemScreen;