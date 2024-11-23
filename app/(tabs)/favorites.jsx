import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchInput from '@/components/general/SearchInput';
import Header from '@/components/general/header';
import MenuItemsGrid from '@/components/section/MenuItemsGrid';
import { useState, useEffect } from 'react';
import { useCustomerStore } from '@/store/customerStore';
import { CLIENT_ID, MERCHANT_ID } from '@/constants/Config';
import useMenuData from '@/hooks/useMenuData';
import { useFocusEffect } from '@react-navigation/native';
import { authenticatedRequest } from '@/utils/apiClient';

function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const { sectionItems, isLoading: isMenuLoading } = useMenuData('favorites');

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const fetchFavorites = async () => {
    try {
      const data = await authenticatedRequest(
        'get',
        `/api/v1/client/${CLIENT_ID}/merchant/${MERCHANT_ID}/customers/favorites`
      );
      setFavorites(data.favorites);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getFavoriteItems = () => {
    if (!favorites || !sectionItems) return [];
    
    // Create a Set of favorite itemIds for O(1) lookup
    const favoriteIds = new Set(favorites.map(fav => fav.itemId));
    
    // Filter sectionItems to only include items that are in favorites
    return sectionItems.filter(item => favoriteIds.has(item.itemId));
  };


  const handleSearch = (text) => {
    setSearchText(text);
    // Filter favorites based on search text if needed
  };

  const handleExit = () => {
    navigation.navigate('Home');
  };

  if (isLoading || isMenuLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <>
      <Header title='Favorites' handleExit={handleExit} />
      <View style={styles.container}>
        {/* <View style={styles.searchContainer}>
          <SearchInput 
            searchValue={searchText}
            onSearchChange={handleSearch} 
            isShowFilterIcon={false} 
          />
        </View> */}
        
        <MenuItemsGrid filteredItems={getFavoriteItems()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#fff'
  },
  searchContainer: {
    paddingTop: 15
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});

export default FavoritesScreen;
