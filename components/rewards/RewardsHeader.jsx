import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for the icons
import useCartStore from '@/store/cartStore';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

// TODO: try to center the exit button a little more 

const Header = ({ title, handleExit }) => {
    const router = useRouter();
    const { items } = useCartStore()

    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
            }}>
                <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity style={styles.touchableArea}>
                <Ionicons name="bag" size={24} color="black" />
                {items > 0 && (
                    <View style={styles.notificationBubble}>
                        <Text style={styles.notificationText}>{items}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        elevation: 4,
    },
    backButton: {
        marginRight: 16,
        padding: 10,
    },
    exitButton: {
        marginLeft: 'auto',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    touchableArea: {
        position: 'relative',
        padding: 10,
    },

});

export default Header;