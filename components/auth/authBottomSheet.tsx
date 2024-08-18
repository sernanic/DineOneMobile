import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView, Text } from 'react-native';
import React, { forwardRef, useCallback, useLayoutEffect, useMemo, useState, useEffect } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import useProductStore from '@/store/selectedProductStore';
import useCartStore from '@/store/cartStore';
import { createClient } from '@supabase/supabase-js'
import Auth from './auth';
import { useAuthStore } from '@/store/authStore';
import { Session } from '@supabase/supabase-js';


export type Ref = BottomSheetModal;



const supabase = createClient('https://qnvhmkpesjjfuesjvwdf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFudmhta3Blc2pqZnVlc2p2d2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2NzMyMzAsImV4cCI6MjAzOTI0OTIzMH0.PLTLiSpl1yhBbjbNyZj6pYMcQXzphZHZonSZEgMaYuk')

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


    const handleCloseModal = () => {
        dismiss();
    };

    const { session, setSession } = useAuthStore(state => ({
        session: state.session,
        setSession: state.setSession,
    }));

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            console.log(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ borderRadius: 10, backgroundColor: Colors.lightGrey }}
            overDragResistanceFactor={0}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
            <View style={styles.contentContainer}>
            <Auth />
            {session && session.user && <Text>{session.user.id}</Text>}
            <Text>hello</Text>
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
        backgroundColor: Colors.primary
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
    }
});

export default BottomSheet;
