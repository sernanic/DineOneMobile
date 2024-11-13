import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SearchInput from '@/components/general/SearchInput';
import HorizontalSubsectionList from '@/components/section/HorizontalSubsectionList';
import Header from '@/components/general/header';
import MenuItemsGrid from '@/components/section/MenuItemsGrid';
import useMenuData from '@/hooks/useMenuData';

const MenuScreen = () => {
    const router = useRouter();
    const { section } = useLocalSearchParams();
    const [searchText, setLocalSearchText] = useState('');
    const { 
        sectionItems, 
        subSections, 
        selectedSubsection, 
        setSelectedSubsection, 
        filteredItems,
        setSearchText
    } = useMenuData(section);

    useEffect(() => {
        if (section && subSections.length > 0) {
            const sectionToSelect = subSections.find(
                sub => sub.name.toLowerCase() === section.toLowerCase()
            );
            if (sectionToSelect) {
                setSelectedSubsection(sectionToSelect);
            }
        }
    }, [section, subSections, setSelectedSubsection]);

    const handleSearch = (text) => {
        setLocalSearchText(text);
        setSearchText(text);
    };

    const handleExit = () => {
        router.push('/');
    };

    return (
        <>
            <Header title='Menu' handleExit={handleExit} />
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <SearchInput 
                        searchValue={searchText}
                        onSearchChange={handleSearch} 
                        isShowFilterIcon={true} 
                    />
                </View>
                
                <HorizontalSubsectionList
                    subsections={subSections}
                    selectedSubsection={selectedSubsection}
                    onSelectSubsection={setSelectedSubsection}
                />
                
                <MenuItemsGrid filteredItems={filteredItems} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#fff'
    },
    searchContainer: {
        paddingTop: 15,
        marginBottom: 15
    }
});

export default MenuScreen;
