import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchInput = ({ searchValue, onSearchChange, isShowFilterIcon }) => {
    return (
        <View style={styles.searchContainer}>
            <TouchableOpacity style={{padding: 5}}>
                <Ionicons name="search" size={20} color="#439D2C" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="search food..."
                value={searchValue}
                onChangeText={onSearchChange}
            />
            {isShowFilterIcon && (
                
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name="options-outline" size={20} color="#fff" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor:'#EEF9EB',
        marginLeft:15,
        marginRight:15,
        height:55
      },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontSize:18
    },
    iconContainer: {
        padding: 5,
        backgroundColor:'#439D2C',
        borderRadius:8
    },
});

export default SearchInput;