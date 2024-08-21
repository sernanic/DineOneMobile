import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      backBehavior="history"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'index':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'menu':
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              break;
            case 'orders':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'rewards':
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            case 'cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="index" options={{ headerShown: false, title: "home" }} />
      <Tabs.Screen name="menu" options={{ headerShown: false, title: "menu" }} />
      <Tabs.Screen name="rewards" options={{ headerShown: false, title: "rewards" }} />
      <Tabs.Screen name="cart" options={{ headerShown: false, title: "cart" }} />
      <Tabs.Screen name="orders" options={{
        headerShown: false, title: "orders",
        tabBarButton: () => null
      }} />
      <Tabs.Screen name="[section]/index" options={{
            headerShown: false, title: 'Section',
            tabBarButton: () => null
        }} />
        <Tabs.Screen name="[section]/[sectionItem]" options={{
            headerShown: false, title: 'Section Item', animation: 'slide_from_right',
            tabBarButton: () => null
        }} />
        <Tabs.Screen name="profile" options={{
            headerShown: false, title: 'profile',
            tabBarButton: () => null
        }} />
    </Tabs>
  );
}

