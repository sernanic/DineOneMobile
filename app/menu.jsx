import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import colors from '../themes/theme';
import { useRouter } from 'expo-router';
import Header from '../components/menu/header';

const sections = [
    { section: 'Drinks', image: require('../assets/images/icon.png') },
    { section: 'Burritos', image: require('../assets/images/icon.png') },
    { section: 'Tacos', image: require('../assets/images/icon.png') },
    { section: 'Desserts', image: require('../assets/images/icon.png') },
  ];

const Menu = () => {
  const router = useRouter();

  return (
    <>
    <Header/>
    <ScrollView style={styles.container}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => router.push({
            pathname:'/[section]',
            params:{section: section.section.toLowerCase()}
          })}
        >
          <View key={index} style={styles.itemContainer}>
          <Image source={section.image} style={styles.image} />
          <Text style={styles.sectionText}>{section.section}</Text>
        </View>
        </TouchableOpacity>
      ))}
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
    paddingLeft:15,
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
    color:colors.primary
  },
});

export default Menu;