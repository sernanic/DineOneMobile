// CustomDrawerContent.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoutButton from '@/components/auth/logoutButton'

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const navigation = useNavigation();
    const router = useRouter()
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                <DrawerItemList {...props} />
                <DrawerItem label={'Logout'} onPress={() => router.navigate('/(tabs)/profile')} />
                
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
        marginLeft: 10,
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