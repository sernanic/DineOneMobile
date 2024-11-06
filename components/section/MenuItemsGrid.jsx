import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SectionItem from './sectionItem';

const MenuItemsGrid = ({ filteredItems }) => {
    const pairs = [];
    for (let i = 0; i < filteredItems.length; i += 2) {
        pairs.push(filteredItems.slice(i, i + 2));
    }

    return (
        <FlatList
            data={pairs}
            contentContainerStyle={{ paddingBottom: 350 }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    {item.map((subItem, subIndex) => (
                        <View 
                            style={[
                                styles.item, 
                                item.length === 1 && { marginRight: 'auto' }
                            ]} 
                            key={subIndex}
                        >
                            <SectionItem item={subItem} index={subIndex}/>
                        </View>
                    ))}
                    {item.length === 1 && <View style={styles.item} />}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        margin: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    }
});

export default MenuItemsGrid; 