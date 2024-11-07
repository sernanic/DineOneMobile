import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GeneralHeader from '@/components/general/header';
import FeaturedCard from '@/components/home/FeaturedCard';
import EditorChoiceItem from '@/components/home/EditorChoiceItem';
import { featuredItems, defaultImage } from '@/constants/mockData';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { API_URL } from '@/constants/apiConfig';

// Custom hook for greeting logic
const useGreeting = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getGreetingIcon = () => {
    const greeting = getGreeting();
    return greeting === 'Good Evening' ? 'moon-outline' : 'sunny-outline';
  };

  return {
    greeting: getGreeting(),
    greetingIcon: getGreetingIcon(),
  };
};

// Custom hook for popular items
const usePopularItems = () => {
  const [popularItems, setPopularItems] = useState([]);

  const fetchPopularItems = async () => {
    try {
      const clientId = '10';
      const merchantId = '6JDE8MZSA6FJ1';
      const response = await axios.get(`http://127.0.0.1:4000/api/${clientId}/items/popular/${merchantId}`);
      
      const { items } = response.data;
      setPopularItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error('Error fetching popular items:', error);
      setPopularItems([]);
    }
  };

  useEffect(() => {
    fetchPopularItems();
  }, []);

  return popularItems;
};

const Menu = () => {
  const { greeting, greetingIcon } = useGreeting();
  const popularItems = usePopularItems();
  
  return (
    <>
      <GeneralHeader title="Home" />
      <View style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View>
              <View style={styles.greetingRow}>
                <Ionicons name={greetingIcon} size={24} color="#666" />
                <Text style={styles.greeting}>{greeting}</Text>
              </View>
              <Text style={styles.userName}>Alena Sabyan</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Featured</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.featuredScroll}
          >
            {featuredItems.map((item) => (
              <FeaturedCard 
                key={item.id}
                {...item}
              />
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Popular Items</Text>
          <View style={styles.editorChoiceContainer}>
            {popularItems.length > 0 ? (
              popularItems.map((item) => (
                <EditorChoiceItem 
                  key={item.itemId}
                  title={item.name}
                  image={item.images?.[0]?.imageUrl ? { uri: item.images[0].imageUrl } : defaultImage}
                  price={item.price}
                />
              ))
            ) : (
              <Text>No popular items available</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 220,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  featuredScroll: {
    paddingLeft: 20,
  },
  editorChoiceContainer: {
    paddingHorizontal: 20,
  },
});

export default Menu;