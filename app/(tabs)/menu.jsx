import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Button, Dimensions,SafeAreaView } from 'react-native';
import Colors from "@/constants/Colors"
import { useRouter } from 'expo-router';
import Header from '@/components/home/header';
import { Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(true);

  
  const toggleMenu = () => {
    if (visible) {
      // Slide down to hide
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    } else {
      // Reset position and slide up to show
      slideAnim.setValue(height);
      setVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
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
    <View style={{ flex: 1 }}>
      <Header />
      
      <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <Text style={{marginLeft:'8%',fontSize:'24px',fontWeight:'700'}}>Featured</Text>
      <View style={styles.carouselContainer}>
        <CustomImageCarousal data={data2} autoPlay={true} pagination={true} />
      </View>
      {sections.map((section, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => router.push({
                  pathname: '/[section]',
                  params: { section: section.section.toLowerCase() }
                })}
              >
                <View key={index}>
                  <Surface style={styles.itemContainer} elevation={1}>
                    <Image source={require('../../assets/images/image-product-1-landscape.jpg')} style={styles.image} />
                    <Text style={styles.sectionText}>{section.section}</Text>
                  </Surface>
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
    backgroundColor: '#f2f2f2',
    marginTop:10
  },
  item: {
    padding: 5,
    paddingLeft: 15,
  },
  text: {
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor:'white',
    borderRadius:8,
    width:'99%',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 20,
    borderRadius:4
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
    marginBottom: 20,
    backgroundColor:'#f2f2f2',
    paddingTop:20
  },

});

export default Menu;