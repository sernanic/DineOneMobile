import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '../location/LocationBottomSheet';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import useCartStore from '@/store/cartStore';


interface HeaderProps {
  title: string;
  cartItemsCount: number;
  handleAddToCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, }) => {
  
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation();
  const {items} = useCartStore()

  return (
    <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.touchableArea} onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity  style={styles.touchableArea}>
          <Ionicons name="bag" size={24} color="black" />
          {items > 0 && (
            <View style={styles.notificationBubble}>
              <Text style={styles.notificationText}>{items}</Text>
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
    backgroundColor: '#f2f2f2',
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