import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions,Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { Easing } from 'react-native-reanimated';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import BoxWithImage from '../components/section/SectionImage';
import Header from '../components/section/SectionHeader';
import items  from '../data/foodItems';
import SectionItem from '../components/section/sectionItem';


const { height } = Dimensions.get('window');

const Section = () => {
  const router = useRouter();
  const { section } = useLocalSearchParams();
  const sectionItems = items[section] || [];
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handlePress = (itemId) => {
    // Logic to handle item selection
    // For example, toggle `selected` state in items array
    const updatedItems = sectionItems.map(item => ({
      ...item,
      selected: item.id === itemId ? !item.selected : item.selected
    }));
    console.log("id",itemId)
    // Update state or re-render to reflect the selection change
    // setState({ sectionItems: updatedItems }); // Assuming using useState hook
  };

  const handleExit = () => {
    router.push('/');
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Header title={section} handleExit={handleExit} />
      <ScrollView>
        <BoxWithImage
          imageSource={require('../assets/images/react-logo.png')} // or {uri: 'https://example.com/your-image.jpg'}
          boxStyle={styles.customBoxStyle} // Optional custom styles
          imageStyle={styles.customImageStyle} // Optional custom styles
        />
        {sectionItems.map((item, index) => (
          <SectionItem key={index} item={item} onPress={handlePress} />
        ))}
      </ScrollView>
    </Animated.View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxWithImage: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceCaloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  calories: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemTextContainer: {
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
  },
  itemCalories: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
  },
});

export default Section;