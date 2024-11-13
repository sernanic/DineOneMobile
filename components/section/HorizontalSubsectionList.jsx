import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

const HorizontalSubsectionList = ({ subsections, selectedSubsection, onSelectSubsection }) => {
    useEffect(() => {
        if (subsections.length > 0 && !selectedSubsection) {
            onSelectSubsection(subsections[0]);
        }
    }, [subsections, selectedSubsection, onSelectSubsection]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.subsectionItem,
                item.id === selectedSubsection?.id ? styles.selectedItem : styles.unselectedItem
            ]}
            onPress={() => onSelectSubsection(item)}
        >
            <Text style={[
                styles.subsectionText,
                item.id === selectedSubsection?.id ? styles.selectedText : styles.unselectedText
            ]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={subsections}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        width: '100%',
        backgroundColor: '#f5f5f7',
        borderRadius: 24,
        marginVertical: 12,
        paddingHorizontal: 8
    },
    subsectionItem: {
        marginHorizontal: 6,
        height: 44,
        paddingHorizontal: 20,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    selectedItem: {
        backgroundColor: Colors.primary,
        minWidth: 100,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    unselectedItem: {
        backgroundColor: '#FFFFFF',
        minWidth: 100,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    subsectionText: {
        fontSize: 14,
        letterSpacing: 0.3,
        fontWeight: '600',
    },
    selectedText: {
        color: '#fff',
    },
    unselectedText: {
        color: '#444444',
    },
});

export default HorizontalSubsectionList;