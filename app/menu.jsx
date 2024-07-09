import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Button, Dimensions } from 'react-native';
import colors from '../themes/theme';
import { useRouter } from 'expo-router';
import Header from '../components/menu/header';

const { height } = Dimensions.get('window');

const sections = [
  { section: 'Drinks', image: require('../assets/images/icon.png') },
  { section: 'Burritos', image: require('../assets/images/icon.png') },
  { section: 'Tacos', image: require('../assets/images/icon.png') },
  { section: 'Desserts', image: require('../assets/images/icon.png') },
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

  return (
    <>
      <Header />
      {/* <Button title="Toggle Menu" onPress={toggleMenu} /> */}
      <ScrollView style={styles.container}>
        {visible && (
          <Animated.View
            style={[
              styles.animatedView,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
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
                  <Image source={section.image} style={styles.image} />
                  <Text style={styles.sectionText}>{section.section}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 20,
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 10,
    color: colors.primary,
  },
  animatedView: {
    flex: 1,
  },
});

export default Menu;