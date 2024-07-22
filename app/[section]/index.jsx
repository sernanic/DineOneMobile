import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { Easing } from 'react-native-reanimated';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import BoxWithImage from '@/components/section/SectionImage';
import Header from '@/components/section/SectionHeader';
import items from '@/data/foodItems';
import SectionItem from '@/components/section/sectionItem';
import { Ionicons } from '@expo/vector-icons';
import SearchInput from '../../components/general/SearchInput';


const { height } = Dimensions.get('window');

const Section = () => {
    const router = useRouter();
    const { section } = useLocalSearchParams();
    const sectionItems = items[section] || [];
    const [searchText, setSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        setFilteredItems(
            sectionItems.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase()) 
            )
        );
    }, [searchText, sectionItems]);


    const pairs = [];
    for (let i = 0; i < filteredItems.length; i += 2) {
        pairs.push(filteredItems.slice(i, i + 2));
    }





    const handleExit = () => {
        router.push('/');
    };


    return (
        <View style={{ padding: 5 }}>
            <Header title={section} handleExit={handleExit} />
            <SearchInput searchValue={searchText}
                onSearchChange={setSearchText} isShowFilterIcon={true} />
            <FlatList
                data={pairs}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        {item.map((subItem, subIndex) => (
                            <View style={styles.item} key={subIndex}>
                                <SectionItem item={subItem} />
                            </View>
                        ))}
                    </View>
                )}
            />

        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    boxWithImage: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
    },
    textContainer: {
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceCaloriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 16,
        color: 'green',
    },
    calories: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,

    },
    itemImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    itemTextContainer: {
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: 'green',
    },
    itemCalories: {
        fontSize: 12,
        color: 'gray',
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },

});

export default Section;