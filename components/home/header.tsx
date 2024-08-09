import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import BottomSheet from '../location/LocationBottomSheet';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  cartItemsCount: number;
  handleAddToCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, cartItemsCount, handleAddToCart }) => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation();

  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.touchableArea} onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}>
          <Ionicons name="location" size={24} color="black" />
        </TouchableOpacity>
        <Text>hello</Text>
        <TouchableOpacity onPress={handleAddToCart} style={styles.touchableArea}>
          <Ionicons name="bag" size={24} color="black" />
          {cartItemsCount > 0 && (
            <View style={styles.notificationBubble}>
              <Text style={styles.notificationText}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 5,
    backgroundColor: '#fff',
    elevation: 4,
  },
  touchableArea: {
    position: 'relative',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationBubble: {
    position: 'absolute',
    top: 3,
    right: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;