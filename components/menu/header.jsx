import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for the icons

const Header = () => {
  const router = useRouter();
  const handleExit = () => {
    router.push('/');
  }
  return (
    <View style={styles.header}>
      <Text style={styles.title}></Text>
      <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    elevation: 4,
  },
  backButton: {
    marginRight: 16,
    padding:10,
  },
  exitButton: {
    marginLeft: 'auto',
    padding:10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});

export default Header;