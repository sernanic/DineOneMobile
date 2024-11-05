import React, { forwardRef, useCallback, useMemo, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import useCartStore from '@/store/cartStore';
import Animated from 'react-native-reanimated';
import axios from 'axios';
import { useReducedMotion } from 'react-native-reanimated';

import Header from "./BottomSheetComponents/Header";
import Content from './BottomSheetComponents/Content';
import BottomActions from './BottomSheetComponents/BottomActions';
import { BottomSheetProps, ModifierGroup } from './types';

const BottomSheet = forwardRef<Ref, BottomSheetProps>(({ item }, ref) => {
    const snapPoints = useMemo(() => ['94%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    const { dismiss } = useBottomSheetModal();
    const { addProduct, products, removeProduct } = useCartStore();
    const product = products[item.itemId];
    const cartQuantity = product ? product.quantity : 0;

    const [localQuantity, setLocalQuantity] = useState(cartQuantity || 1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>([]);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [selectedModifiers, setSelectedModifiers] = useState<Set<string>>(new Set());

    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        setTotalPrice(item.price * localQuantity);
    }, [item, localQuantity]);

    useEffect(() => {
        const fetchModifierGroups = async () => {
            if (!isBottomSheetVisible) return;
            try {
                const clientId = '10';
                const response = await axios.get(`http://127.0.0.1:4000/api/client/${clientId}/item/${item.itemId}/modifierGroups`);
                setModifierGroups(response.data.modifierGroups);
            } catch (error) {
                console.error('Error fetching modifier groups:', error);
            }
        };
        fetchModifierGroups();
    }, [item.itemId, isBottomSheetVisible]);

    const handleCloseModal = useCallback(() => {
        if (ref && 'current' in ref && ref.current) {
            ref.current.close();
        }
        dismiss();
    }, [dismiss, ref]);

    const handleAddToCart = useCallback(() => {
        console.log('Adding to cart with quantity:', localQuantity);
        const existingQuantity = product ? product.quantity : 0;
        
        if (localQuantity !== existingQuantity) {
            const quantityDifference = localQuantity - existingQuantity;
            if (quantityDifference > 0) {
                for (let i = 0; i < quantityDifference; i++) {
                    addProduct({...item, id: item.itemId});
                }
            } else {
                for (let i = 0; i < Math.abs(quantityDifference); i++) {
                    removeProduct({...item, id: item.itemId});
                }
            }
        }
        if (ref && 'current' in ref && ref.current) {
            ref.current.close();
        }
        dismiss();
    }, [localQuantity, product, item, addProduct, removeProduct, dismiss, ref]);

    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: "transparent"
            }}
            overDragResistanceFactor={0}
            enableOverDrag={!shouldReduceMotion}
            enablePanDownToClose={!shouldReduceMotion}
            animationConfigs={{
                duration: shouldReduceMotion ? 0 : 250
            }}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            onAnimate={(fromIndex, toIndex) => {
                setIsBottomSheetVisible(toIndex === 0);
            }}
        >
            <View style={styles.contentContainer}>
                <Header item={item} handleCloseModal={handleCloseModal} />
                <Content 
                    item={item}
                    modifierGroups={modifierGroups}
                    selectedModifiers={selectedModifiers}
                    setSelectedModifiers={setSelectedModifiers}
                />
                <BottomActions
                    localQuantity={localQuantity}
                    setLocalQuantity={setLocalQuantity}
                    totalPrice={totalPrice}
                    handleAddToCart={handleAddToCart}
                />
            </View>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default BottomSheet;
