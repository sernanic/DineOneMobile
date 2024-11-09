import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import CustomTabBar from '@/components/customTabBar'; 

const { height: screenHeight } = Dimensions.get('window');
const tabBarHeight = screenHeight * 0.1; 

export default function RootLayout() {
  return (
    <View style={[styles.container]}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="menu" options={{ headerShown: false }} />
        <Stack.Screen name="rewards" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ headerShown: false }} />
        <Stack.Screen name="orders" options={{ headerShown: false }} />
        {/* <Stack.Screen name="[section]/index" options={{ headerShown: false }} */}
        <Stack.Screen 
          name="[section]/[sectionItem]" 
          options={{ headerShown: false, animation: 'slide_from_right' }} 
        />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="favorites" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        
      </Stack>
      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent'
  },
});