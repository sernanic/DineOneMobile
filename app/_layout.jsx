import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva';
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

export default _layout = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Tabs
            initialRouteName="my-child"
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
              headerShown: true, title: 'Section Item',
              tabBarButton: () => null
            }} />
          </Tabs>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ApplicationProvider>
  )
}

