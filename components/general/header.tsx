import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import LocationDrawer, { LocationDrawerRef } from './locationDrawer';


const MenuIcon = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.line, styles.longLine]} />
      <View style={[styles.line, styles.mediumLine]} />
      <View style={[styles.line, styles.shortLine]} />
    </View>
  );
};


const Header = ({ title }) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<LocationDrawerRef>(null);

  const handleLocationPress = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            accessibilityLabel="Open menu"
            accessibilityRole="button"
          >
            <MenuIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={handleLocationPress}
          accessibilityLabel="Change location"
          accessibilityRole="button"
        >
          <Ionicons name="location-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <LocationDrawer ref={bottomSheetRef} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    padding: 16,
    paddingTop: 48,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.3,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuButton: {
    padding: 4,
  },
  locationButton: {
    padding: 8,
  },
  container: {
    width: 32,
    height: 32,
    justifyContent: 'space-around',
    padding: 4,
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 1.5,
  },
  longLine: {
    width: '100%',
  },
  mediumLine: {
    width: '75%',
  },
  shortLine: {
    width: '50%',
  },
});

export default Header;
