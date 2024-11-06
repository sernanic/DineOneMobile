import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GeneralHeader from '@/components/general/header';
import FeaturedCard from '@/components/home/FeaturedCard';
import EditorChoiceItem from '@/components/home/EditorChoiceItem';
import { featuredItems, defaultImage } from '@/constants/mockData';

const Menu = () => {
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
                <Ionicons name={getGreetingIcon()} size={24} color="#666" />
                <Text style={styles.greeting}>{getGreeting()}</Text>
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
            <EditorChoiceItem 
              title="Easy homemade beef burger"
              image={defaultImage}
            />
            <EditorChoiceItem 
              title="Blueberry with egg for breakfast"
              image={defaultImage}
            />
            <EditorChoiceItem 
              title="Toast with egg for breakfast"
              image={defaultImage}
            />
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