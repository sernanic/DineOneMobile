import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default _layout = () => {
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <Tabs tabBar={props => <TabBar {...props} />} initialRouteName="my-child" backBehavior="history">
                    <Tabs.Screen name="index" options={{ headerShown: false, title: "home" }} />
                    <Tabs.Screen name="menu" options={{ headerShown: false, title: "menu" }} />
                    <Tabs.Screen name="orders" options={{ headerShown: false, title: "orders" }} />
                    <Tabs.Screen name="rewards" options={{ headerShown: false, title: "rewards" }} />
                    <Tabs.Screen name="[section]/index" options={{ headerShown: false, title: 'Section' }} />
                    <Tabs.Screen name="[section]/[sectionItem]" options={{ headerShown: false, title: 'Section Item' }} />    
                    <Tabs.Screen name="cart" options={{ headerShown: false, title: "cart" }} />
                </Tabs>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}