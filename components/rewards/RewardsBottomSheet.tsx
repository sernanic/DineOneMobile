import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView,Button, Text } from 'react-native';
import React, { forwardRef, useCallback, useLayoutEffect, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import FullWidthImage from '@/components/section/SectionImage'
import Animated, { useSharedValue, useReduceMotion } from 'react-native-reanimated';


export type Ref = BottomSheetModal;


interface RewardItemType {
    id: string;
    points: number;
    title: string;
    description: string;
    imgsrc?: string;
}

interface BottomSheetProps {
    rewardItem: RewardItemType;
}

const BottomSheet = forwardRef<Ref, { rewardItem: RewardItemType }>((props, ref) => {
    const snapPoints = useMemo(() => ['94%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    const { dismiss } = useBottomSheetModal();
    const { rewardItem } = props;
    const isReduceMotionEnabled = useReduceMotion();
    
    // Adjust animation based on reduced motion preference
    const width = useSharedValue(isReduceMotionEnabled ? 0 : 100);

    const handlePress = () => {
        // Add conditional animation
        if (!isReduceMotionEnabled) {
            width.value = width.value + 50;
        }
    };

    const handleCloseModal = () => {
        dismiss();
    };
    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ borderRadius: 10, backgroundColor: Colors.lightGrey }}
            overDragResistanceFactor={0}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
            <View style={styles.contentContainer}>
                {rewardItem ? (
                    <View style={styles.container}>
                        <View style={styles.detailsContainer}>
                            <FullWidthImage source={require('@/assets/images/react-logo.png')} onBackPress={handleCloseModal}/>
                            
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 20 }}>
                                <View>
                                    {/* TODO: Add Title Styling */}
                                    <View><Text style={styles.itemName}>{rewardItem.title}</Text></View>
                                    {/*TODO: Add pricing Styling */}
                                    <View><Text style={styles.itemPrice}>{rewardItem.points} Points</Text></View>
                                </View>
                            </View>
                            {/*TODO: Add Title Styling */}
                            <Text style={styles.itemDescription}>{rewardItem.description}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button  title='Redeem'></Button>
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
        bottom: "20%",
        left:'25%',
        right: 0,
        padding: 10,
        backgroundColor: '#fff',
        width:200
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
        paddingBottom: 10
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '400',
        paddingBottom: 10,
        color: Colors.primary
    }
});

export default BottomSheet;
