import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchInput = ({ searchValue, onSearchChange, isShowFilterIcon }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer}>
                <Ionicons name="search" size={20} color="#000" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="search food..."
                value={searchValue}
                onChangeText={onSearchChange}
            />
            {isShowFilterIcon && (
                
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name="options-outline" size={20} color="#000" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        margin: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    iconContainer: {
        padding: 5,
    },
});

export default SearchInput;