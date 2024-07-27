import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const HorizontalSubsectionList = ({ subsections, onSelectSubsection }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelectSubsection = (item) => {
        setSelectedId(item.id);  // Update the selected ID
        onSelectSubsection(item);  // Notify parent about the selection
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.subsectionItem // Change background color based on selection
            ]}
            onPress={() => handleSelectSubsection(item)}
        >
            <Text style={[
                styles.subsectionText,
                { color: item.id === selectedId ? '#007BFF' : 'gray' }  // Change text color based on selection
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
        width:'95%'
    },
    subsectionItem: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
    },
    subsectionText: {
        fontSize: 17,
    },
});

export default HorizontalSubsectionList;