import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

export default function Layout() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Drawer>
            <Drawer.Screen
              name="(tabs)"
              options={{
                drawerLabel: "Home",
                title: "Home",
                headerShown: false,
              }}
            />
            {/* <Drawer.Screen
              name="profile"
              options={{
                drawerLabel: "Profile",
                title: "My Profile",
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="settings"
              options={{
                drawerLabel: "Settings",
                title: "Settings",
                headerShown: false,
              }}
            /> */}
          </Drawer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ApplicationProvider>
  );
}