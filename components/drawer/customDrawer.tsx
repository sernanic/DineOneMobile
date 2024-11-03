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
        { label: 'Profile', path: '/(tabs)/profile', icon: 'person' },
        { label: 'Home', path: '/(tabs)/', icon: 'home' },
        { label: 'Menu', path: '/(tabs)/menu', icon: 'restaurant' },
        { label: 'Rewards', path: '/(tabs)/rewards', icon: 'gift' },
        { label: 'Cart', path: '/(tabs)/cart', icon: 'cart' },
    ];

    const footerItems = [
        { label: 'Frequently asked questions', path: '/faq' },
        { label: 'Terms & conditions', path: '/terms' },
        { label: 'Privacy notice', path: '/privacy' },
        { label: 'Prohibited use policy', path: '/policy' },
        { label: 'Fees and limits', path: '/fees' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Hi Nick!</Text>
            </View>
            
            <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
                {drawerItems.map((item) => {
                    const isActive = pathname === item.path;
                    console.log(`Item ${item.label}:`, { path: item.path, isActive });
                    
                    return (
                        <TouchableOpacity
                            key={item.path}
                            style={[
                                styles.drawerItem,
                                isActive && styles.activeDrawerItem
                            ]}
                            onPress={() => router.navigate(item.path)}
                        >
                            <Ionicons 
                                name={item.icon as any} 
                                size={24} 
                                color={isActive ? 'white' : 'black'} 
                                style={styles.drawerItemIcon}
                            />
                            <Text style={[
                                styles.drawerItemText,
                                isActive && styles.activeDrawerItemText
                            ]}>
                                {item.label}
                            </Text>
                            <Ionicons 
                                name="chevron-forward" 
                                size={24} 
                                color={isActive ? 'white' : '#CCCCCC'} 
                                style={styles.chevron}
                            />
                        </TouchableOpacity>
                    );
                })}

                <View style={styles.footerContainer}>
                    {footerItems.map((item) => (
                        <TouchableOpacity
                            key={item.path}
                            style={styles.footerItem}
                            onPress={() => router.navigate(item.path)}
                        >
                            <Text style={styles.footerItemText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </DrawerContentScrollView>
            
            <View style={styles.logoutContainer}>
                <LogoutButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        padding: 20,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerText: {
        fontSize: 28,
        fontWeight: '600',
    },
    scrollContent: {
        paddingTop: 20,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    activeDrawerItem: {
        backgroundColor: Colors.primary,
    },
    drawerItemIcon: {
        marginRight: 15,
        width: 24,
    },
    drawerItemText: {
        fontSize: 16,
        flex: 1,
    },
    activeDrawerItemText: {
        color: 'white',
    },
    chevron: {
        marginLeft: 'auto',
    },
    footerContainer: {
        marginTop: 40,
        paddingHorizontal: 20,
    },
    footerItem: {
        paddingVertical: 10,
    },
    footerItemText: {
        fontSize: 14,
        color: '#666666',
    },
    logoutContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.primary,
        padding: 20,
    },
});

export default CustomDrawerContent;