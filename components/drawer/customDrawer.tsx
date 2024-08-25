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
        { label: 'Home', path: '/(tabs)/', icon: 'home' },
        { label: 'Menu', path: '/(tabs)/menu', icon: 'restaurant' },
        { label: 'Rewards', path: '/(tabs)/rewards', icon: 'gift' },
        { label: 'Cart', path: '/(tabs)/cart', icon: 'cart' },
        { label: 'Profile', path: '/(tabs)/profile', icon: 'person' },
    ];

    return (
        <View style={{flex:1}}>
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    <View style={styles.imagePlaceholder} />
                </View>
                <Text style={styles.nameText}>Nick</Text>
            </View>
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                {drawerItems.map((item) => (
                    <DrawerItem
                        key={item.path}
                        label={({ focused }) => (
                            <View style={styles.drawerItemContent}>
                                <Ionicons 
                                    name={item.icon as any} 
                                    size={24} 
                                    color={focused ? 'white' : 'black'} 
                                    style={styles.drawerItemIcon}
                                />
                                <Text style={[
                                    styles.drawerItemText,
                                    focused && styles.activeDrawerItemText
                                ]}>
                                    {item.label}
                                </Text>
                            </View>
                        )}
                        onPress={() => router.navigate(item.path)}
                        focused={pathname === item.path}
                        activeBackgroundColor='red'
                        activeTintColor="white"
                    />
                ))}
            </DrawerContentScrollView>
            <View style={{
                borderTopColor: Colors.primary,
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
    drawerItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerItemIcon: {
        marginRight: 10,
    },
    drawerItemText: {
        fontSize: 24,
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

    },
    profileContainer: {
        alignItems: 'center',
        paddingTop: 70,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        marginBottom: 10,
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: 'gray',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        // color: Colors.darkGray,
    },
});

export default CustomDrawerContent;