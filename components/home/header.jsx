import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector-icons

const Header = ({ title, cartItemsCount, handleAddToCart }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>

      <Text style={styles.title}></Text>
      <TouchableOpacity onPress={handleAddToCart} style={styles.touchableArea}>
        <Ionicons name="bag" size={24} color="black" />
        {cartItemsCount > 0 && (
          <View style={styles.notificationBubble}>
            <Text style={styles.notificationText}>{cartItemsCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    paddingTop:50,
    backgroundColor: '#fff',
    elevation: 4,
  },
  touchableArea: {
    position: 'relative', // Needed for positioning the notification bubble
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