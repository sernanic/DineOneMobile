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
    const [searchText, setSearchText] = useState('');
    const { sectionItems, subSections, selectedSubsection, filteredItems } = useMenuData(section);

    const handleSearch = (text) => {
        setSearchText(text);
        if (selectedSubsection && selectedSubsection.id !== 0) {
            return sectionItems.filter(item => 
                item.name.toLowerCase().includes(text.toLowerCase()) &&
                item.subsectionId === selectedSubsection.id
            );
        }
        return sectionItems.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
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
        paddingTop: 15
    }
});

export default MenuScreen;
