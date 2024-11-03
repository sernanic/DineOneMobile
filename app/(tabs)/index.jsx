import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Button, Dimensions,SafeAreaView } from 'react-native';
import Colors from "@/constants/Colors"
import { useRouter } from 'expo-router';
import Header from '@/components/home/header';
import { Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

import CustomImageCarousal from '@/components/general/carousal/customImageCoursal'

const { height } = Dimensions.get('window');

const sections = [
  { section: 'Drinks', image: require('@/assets/images/icon.png') },
  { section: 'Burritos', image: require('@/assets/images/icon.png') },
  { section: 'Tacos', image: require('@/assets/images/icon.png') },
  { section: 'Desserts', image: require('@/assets/images/icon.png') },
];

const Menu = () => {
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const data2 = [
    {
      image: require('../../assets/images/image-product-1-landscape.jpg'),
    },
    {
      image: require('../../assets/images/image-product-1-landscape.jpg'),
    },
    {
      image: require('../../assets/images/image-product-1-landscape.jpg'),
    },
    {
      image: require('../../assets/images/image-product-1-landscape.jpg'),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor:'#fff'}}>
      <Header />
      
      <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
        <Text style={styles.greetingText}>{getGreeting()}</Text>
        <Text style={{marginLeft:'8%',fontSize:'20px',fontWeight:'700'}}>Featured</Text>
        <View style={styles.carouselContainer}>
          <CustomImageCarousal data={data2} autoPlay={true} pagination={true} />
        </View>
        <Text style={{marginLeft:'8%',fontSize:'20px',fontWeight:'700',marginBottom:10}}>Categories</Text>
        {sections.map((section, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => router.push({
                  pathname: '/[section]',
                  params: { section: section.section.toLowerCase() }
                })}
              >
                <View key={index} style={styles.itemContainer}>
                    <Image source={require('../../assets/images/image-product-1-landscape.jpg')} style={styles.image} />
                    <Text style={styles.sectionText}>{section.section}</Text>
                    <View style={styles.arrowContainer}>
                    <AntDesign name="arrowright" size={16} color="white" />
                    </View>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10
  },
  item: {
    padding: 5,
    paddingLeft: 15,
    marginBottom: 5, // Added margin bottom for more spacing between rows
  },
  text: {
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '98%',
    position: 'relative',
    // iOS shadow
    shadowColor: 'rgba(6, 51, 54, 0.10)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 16,
    // Android elevation
    elevation: 5,
    height:100
  },
  image: {
    width: 100,
    height: 84,
    resizeMode: 'cover',
    marginRight: 20,
    borderRadius:16
  },
  sectionText: {
    fontSize: 24,
    marginLeft: 10,
    color: "black",
    fontWeight:'600'
  },
  animatedView: {
    flex: 1,
  },
  text: {textAlign: 'center', color: 'black', marginBottom: 10},
  carouselContainer: {
    marginBottom: 0,
    backgroundColor:'#fff',
    paddingTop:20
  },
  arrowContainer: {
    position: 'absolute',
    right: 0,
    top: "50%",
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#042628',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  greetingText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Menu;