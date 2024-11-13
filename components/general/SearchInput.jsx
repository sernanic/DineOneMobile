import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const SearchInput = ({ searchValue, onSearchChange, isShowFilterIcon }) => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchIconWrapper}>
                <Ionicons name="search" size={22} color={Colors.primary} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Search food..."
                placeholderTextColor="#9EA3AE"
                value={searchValue}
                onChangeText={onSearchChange}
            />
            {isShowFilterIcon && (
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: '#E6EBF2',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchIconWrapper: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        color: '#1A1D1E',
        paddingVertical: 12,
        paddingRight: 12,
    },
    filterButton: {
        padding: 12,
        marginRight: 8,
        backgroundColor: '#F5F6FA',
        borderRadius: 12,
    },
});

export default SearchInput;