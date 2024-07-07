// pages/menu/[section].js
import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

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
  ],
};

const Section = () => {
  const { params } = useRouter();
  const section = params.section;
  const sectionItems = items[section] || [];

  return (
    <ScrollView style={styles.container}>
      {sectionItems.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});

export default Section;