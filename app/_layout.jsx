import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva';

export default _layout = () => {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Tabs tabBar={props => <TabBar {...props} />} initialRouteName="my-child" backBehavior="history">
              <Tabs.Screen name="index" options={{ headerShown: false, title: "home" }} />
              <Tabs.Screen name="menu" options={{ headerShown: false, title: "menu" }} />
              <Tabs.Screen name="orders" options={{ headerShown: false, title: "orders" }} />
              <Tabs.Screen name="rewards" options={{ headerShown: false, title: "rewards" }} />
              <Tabs.Screen name="[section]/index" options={{ headerShown: false, title: 'Section' }} />
              <Tabs.Screen name="[section]/[sectionItem]" options={{ headerShown: true, title: 'Section Item' }} />    
              {/* <Tabs.Screen name="cart" options={{ headerShown: false, title: "cart" }} /> */}
            </Tabs>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ApplicationProvider>
    )
}

