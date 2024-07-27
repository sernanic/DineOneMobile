import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '@/components/section/SectionHeader';
import items from '@/data/foodItems';
import allSubSections from '@/data/subSections';
import SectionItem from '@/components/section/sectionItem';
import SearchInput from '@/components/general/SearchInput';
import HorizontalSubsectionList from '@/components/section/HorizontalSubsectionList';

const { height } = Dimensions.get('window');

function getRelevantSubsections(sectionItemList, subsections) {
    const allSubsection = { id: 0, name: 'All', section: 'All' };
    // Extract subsection IDs from sectionItemList
    const subsectionIds = new Set(
        sectionItemList.map(item => item.subsectionId)
    );

    // Filter subsections based on the extracted IDs
    const filteredSubsections = subsections.filter(subsection =>
        subsectionIds.has(subsection.id)
    );

    const subSectionToShow = [allSubsection, ...filteredSubsections];

    return subSectionToShow;
}

const Section = () => {
    const router = useRouter();
    const { section } = useLocalSearchParams();
    const sectionItems = items[section] || [];
    const [searchText, setSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [subSections, setSubSections] = useState([]);
    const [selectedSubsection, setSelectedSubsection] = useState(null); 
    const [hasLoaded, setHasLoaded] = useState(false);

    // Ref to track if relevantSubsections has been set
    const hasSetSubSections = useRef(false);

    // Reset ref when the component mounts or section changes
    useEffect(() => {
        hasSetSubSections.current = false;
        setSelectedSubsection(null); // Reset selectedSubsection on section change
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
        if (!hasSetSubSections.current) {
            const relevantSubsections = getRelevantSubsections(sectionItems, allSubSections);
            setSubSections(relevantSubsections);
            hasSetSubSections.current = true;
        }
    }, [sectionItems]);

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
        <View style={{ padding: 5, backgroundColor: '#fff' }}>
            <Header title={section} handleExit={handleExit} />
            {/* TODO: make name Dynamic */}
            <Text style={styles.profileNameStyle}>Hi Nicolas</Text>
            <Text style={styles.FindYourFoodStyle}>Find Your Food</Text>
            <SearchInput searchValue={searchText}
                onSearchChange={setSearchText} isShowFilterIcon={true} />

            <HorizontalSubsectionList
                subsections={subSections}
                onSelectSubsection={setSelectedSubsection}
            />
            
            <FlatList
                style={{ paddingTop: 10 }}
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
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 20
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
        color: 'green'
    }
});

export default Section;