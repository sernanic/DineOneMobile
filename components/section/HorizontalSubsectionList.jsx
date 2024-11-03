import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

const HorizontalSubsectionList = ({ subsections, onSelectSubsection }) => {
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (subsections.length > 0 && selectedId === null) {
            setSelectedId(subsections[0].id);
            onSelectSubsection(subsections[0]);
        }
    }, [subsections, selectedId, onSelectSubsection]);

    const handleSelectSubsection = (item) => {
        setSelectedId(item.id);
        onSelectSubsection(item);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.subsectionItem,
                item.id === selectedId ? styles.selectedItem : styles.unselectedItem
            ]}
            onPress={() => handleSelectSubsection(item)}
        >
            <Text style={[
                styles.subsectionText,
                item.id === selectedId ? styles.selectedText : styles.unselectedText
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