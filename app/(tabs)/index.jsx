import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Button, Dimensions,SafeAreaView } from 'react-native';
import Colors from "@/constants/Colors"
import { useRouter } from 'expo-router';
import Header from '@/components/home/header';
import { Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import GeneralHeader from '@/components/general/header';

import CustomImageCarousal from '@/components/general/carousal/customImageCoursal'

const { height } = Dimensions.get('window');

const sections = [
  { section: 'Drinks', image: require('@/assets/images/icon.png') },
  { section: 'Burritos', image: require('@/assets/images/icon.png') },
  { section: 'Tacos', image: require('@/assets/images/icon.png') },
  { section: 'Desserts', image: require('@/assets/images/icon.png') },
];

const defaultImage = require('../../assets/images/image-product-1-landscape.jpg');

const featuredItems = [
  {
    id: 1,
    title: "Asian White Noodle with Extra Seafood",
    chef: { name: "James Spader", avatar: defaultImage },
    duration: "20 Min",
    image: defaultImage
  },
  {
    id: 2,
    title: "Spicy Mexican-Style Street Tacos",
    chef: { name: "Maria Rodriguez", avatar: defaultImage },
    duration: "25 Min",
    image: defaultImage
  },
  {
    id: 3,
    title: "Mediterranean Grilled Salmon Bowl",
    chef: { name: "Alex Chen", avatar: defaultImage },
    duration: "30 Min",
    image: defaultImage
  },
  {
    id: 4,
    title: "Classic Italian Margherita Pizza",
    chef: { name: "Giorgio Romano", avatar: defaultImage },
    duration: "35 Min",
    image: defaultImage
  }
];

const FeaturedCard = ({ title, chef, duration, image = defaultImage }) => (
  <View style={styles.featuredCard}>
    <Image source={image} style={styles.featuredImage} />
    <View style={styles.featuredContent}>
      <Text style={styles.featuredTitle}>{title}</Text>
      <View style={styles.chefRow}>
        <Image source={chef.avatar} style={styles.chefAvatar} />
        <Text style={styles.chefName}>{chef.name}</Text>
        <View style={styles.durationContainer}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </View>
    </View>
  </View>
);

const EditorChoiceItem = ({ title, image = defaultImage }) => (
  <TouchableOpacity style={styles.editorChoiceItem}>
    <Image source={image} style={styles.editorChoiceImage} />
    <Text style={styles.editorChoiceTitle}>{title}</Text>
    <View style={styles.arrowContainer}>
      <AntDesign name="arrowright" size={20} color="white" />
    </View>
  </TouchableOpacity>
);

const Menu = () => {
  const router = useRouter();
  const HEADER_HEIGHT = 0;

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
      <View style={{ padding: 5, backgroundColor: '#fff' }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: 0, paddingBottom: 220 }
        ]}
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
              title={item.title}
              chef={item.chef}
              duration={item.duration}
              image={item.image}
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
      </>  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
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
  featuredCard: {
    width: 300,
    height: 200,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  featuredTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  chefRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chefAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  chefName: {
    color: 'white',
    fontSize: 14,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  duration: {
    color: 'white',
    marginLeft: 4,
  },
  editorChoiceContainer: {
    paddingHorizontal: 20,
  },
  editorChoiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editorChoiceImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  editorChoiceTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#042628',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;