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
        flexDirection: 'row',
        paddingVertical: 10,
        width:'95%',
        marginTop:15
    },
    subsectionItem: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
    },
    selectedItem: {
        backgroundColor: Colors.primary,
        minWidth:100,
        borderRadius:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center' 
    },
    unselectedItem: {
        backgroundColor: '#F1F5F5',
        minWidth:100,
        borderRadius:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center' 
    },
    subsectionText: {
        fontSize: 17,
    },
    selectedText: {
        color: '#fff',
    },
    unselectedText: {
        color: 'gray',
    },
});

export default HorizontalSubsectionList;