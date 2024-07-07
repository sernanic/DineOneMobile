import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const sections = [
  { name: 'Drinks' },
  { name: 'Burritos' },
  { name: 'Tacos' },
  { name: 'Desserts' },
];

const Menu = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => router.push(`/${section.name.toLowerCase()}`)}
        >
          <Text style={styles.text}>{section.name}</Text>
        </TouchableOpacity>
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

export default Menu;