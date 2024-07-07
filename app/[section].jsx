import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { Easing } from 'react-native-reanimated';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import BoxWithImage from '../components/section/SectionImage';
import Header from '../components/section/SectionHeader';

const items = {
  drinks: [
    { name: 'Coke' },
    { name: 'Pepsi' },
    { name: 'Lemonade' },
  ],
  burritos: [
    { name: 'Beef Burrito' },
    { name: 'Chicken Burrito' },
    { name: 'Vegetarian Burrito' },
  ],
  tacos: [
    { name: 'Beef Taco' },
    { name: 'Chicken Taco' },
    { name: 'Fish Taco' },
  ],
  desserts: [
    { name: 'Chocolate Cake' },
    { name: 'Ice Cream' },
    { name: 'Apple Pie' },
    { name: 'Chocolate Cake' },
    { name: 'Ice Cream' },
    { name: 'Apple Pie' },
    { name: 'Chocolate Cake' },
    { name: 'Ice Cream' },
    { name: 'Apple Pie' },
    { name: 'Chocolate Cake' },
    { name: 'Ice Cream' },
    { name: 'Apple Pie' },
  ],
};

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
          <View key={index} style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
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
  item: {
    padding: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});

export default Section;