// CustomDrawerContent.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation, useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoutButton from '@/components/auth/logoutButton'

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const navigation = useNavigation();
    const router = useRouter()
    const pathname = usePathname();
    const { top, bottom } = useSafeAreaInsets();

    const drawerItems = [
        { label: 'Profile', path: '/(tabs)/profile' },
        { label: 'Home', path: '/(tabs)/' },
        
        { label: 'Menu', path: '/(tabs)/menu' },
        { label: 'Rewards', path: '/(tabs)/rewards' },
        { label: 'Cart', path: '/(tabs)/cart' },
    ];

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                {drawerItems.map((item) => (
                    <DrawerItem
                        key={item.path}
                        label={({ focused }) => (
                            <Text style={[
                                styles.drawerItemText,
                                focused && styles.activeDrawerItemText
                            ]}>
                                {item.label}
                            </Text>
                        )}
                        onPress={() => router.navigate(item.path)}
                        focused={pathname === item.path}
                        activeBackgroundColor='red'
                        activeTintColor="white"
                    />
                ))}
            </DrawerContentScrollView>
            <View style={{
                borderTopColor: 'red',
                borderTopWidth: 1,
                padding: 20,
                paddingBottom: 20 + bottom
            }}>
                <LogoutButton />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    profileSection: {
        marginBottom: 20,
    },
    profileText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    drawerItems: {
        flex: 1,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    drawerItemText: {
        fontSize: 16,
    },
    activeDrawerItemText: {
        color: 'white',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    logoutText: {
        fontSize: 16,
        marginLeft: 10,
        color: Colors.primary,
    },
    footer: {

    }
});

export default CustomDrawerContent;