import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions,TouchableWithoutFeedback } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
// import Header from '@/components/section/SectionHeader';
import axios from 'axios'; // Make sure to install axios if you haven't already
import SectionItem from '@/components/section/sectionItem';
import SearchInput from '@/components/general/SearchInput';
import HorizontalSubsectionList from '@/components/section/HorizontalSubsectionList';
import Colors from '@/constants/Colors';
import Header from '@/components/general/header';


import {MotiView} from 'moti';
import {SafeAreaView} from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

const Section = () => {
    const router = useRouter();
    const { section } = useLocalSearchParams();
    const [sectionItems, setSectionItems] = useState([]);
    const [allSubSections, setAllSubSections] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [subSections, setSubSections] = useState([]);
    const [selectedSubsection, setSelectedSubsection] = useState(null); 
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:4000/api/10/categories/6JDE8MZSA6FJ1');
                const { categories } = response.data;
                // Transform categories to allSubSections format
                
                const transformedSubSections = categories.map(category => ({
                    id: category.categoryId,
                    name: category.name,
                    section: section
                }));
                
                // Add the "All" subsection at the beginning
                const allSubSectionsWithAll = [
                    { id: 0, name: 'All', section: 'All' },
                    ...transformedSubSections
                ];
                
                setAllSubSections(allSubSectionsWithAll);
                setSubSections(allSubSectionsWithAll); // Set all subsections directly

                // Transform items
                const transformedItems = categories.flatMap(category => 
                    category.items.map(item => ({
                        itemId: item.itemId,
                        name: item.name,
                        price: item.price,
                        images: item.images,
                        subsectionId: category.categoryId,
                        description: item.description
                    }))
                );
                setSectionItems(transformedItems);

                // Set initial filtered items
                setFilteredItems(transformedItems);

                setHasLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [section]);

    useEffect(() => {
        if (selectedSubsection && selectedSubsection.id !== 0) {
            setFilteredItems(
                sectionItems.filter(item => 
                    item.name.toLowerCase().includes(searchText.toLowerCase()) &&
                    item.subsectionId === selectedSubsection.id
                )
            );
            setHasLoaded(true);
        } else {
            setFilteredItems(
                sectionItems.filter(item =>
                    item.name.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }
    }, [searchText, selectedSubsection]);

    useEffect(() => {
        if (subSections.length > 0 && selectedSubsection === null) {
            setSelectedSubsection(subSections[0]);
        }
    }, [subSections]);

    const pairs = [];
    for (let i = 0; i < filteredItems.length; i += 2) {
        pairs.push(filteredItems.slice(i, i + 2));
    }

    const handleExit = () => {
        router.push('/');
    };

    return (
      <>
     
      <Header title='Menu' handleExit={handleExit} />
      <View style={{ padding: 5, backgroundColor: '#fff' }}>
            {/* TODO: make name Dynamic */}
            {/* <Text style={styles.profileNameStyle}>Hi Nicolas</Text>
            <Text style={styles.FindYourFoodStyle}>Find Your Food</Text> */}
            <View style={{paddingTop: 15}}>

            
            <SearchInput searchValue={searchText}
                onSearchChange={setSearchText} isShowFilterIcon={true} />
              </View>
            <HorizontalSubsectionList
                subsections={subSections}
                onSelectSubsection={setSelectedSubsection}
            />
                    

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
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        margin: 0,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',

    },
    FindYourFoodStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingLeft: 12
    },
    profileNameStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingLeft: 12,
        color: Colors.primary
    }
});

export default Section;
