import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for the icons
import useCartStore from '@/store/cartStore';
import Colors from '@/constants/Colors';
const Header = ({ title, handleExit }) => {
  const router = useRouter();
  const {items} = useCartStore()
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color:'#0A2533'}]}>          
          {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
        </Text>
      </View>
      <View style={styles.placeholderButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: "15%",
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    elevation: 4,
  },
  backButton: {
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholderButton: {
    width: 44, // Same width as the back button
    padding: 10,
  },
  // ... other existing styles ...
});

export default Header;