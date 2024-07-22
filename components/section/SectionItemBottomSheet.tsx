import { View, TouchableOpacity, StyleSheet,Image } from 'react-native';
import React, { forwardRef, useCallback, useLayoutEffect, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useProductStore from '@/store/selectedProductStore';

import ParallaxScrollView from '@/components/parallaxScrollView';
import {  Button, Divider, Text } from '@ui-kitten/components';
import useCartStore from '../../store/cartStore';

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['95%'], []);
  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
  const { dismiss } = useBottomSheetModal();
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const {reduceProduct,addProduct} = useCartStore()

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
                    <View style={{flex:1,justifyContent:'space-between',flexDirection:'row'}}>
                            <Text style={styles.stickySectionText}>{selectedProduct.name}</Text>
                            <Text style={styles.stickySectionText}>{selectedProduct.price}</Text>
    
                            </View>
                        <Divider/>
                        <Text style={styles.itemDescription}>{selectedProduct.description}</Text>
                    </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={()=>addProduct(selectedProduct)}>Add To Cart</Button>
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

export default BottomSheet;
