import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '../../components/parallaxScrollView';

const SectionItemScreen = () => {
  const router = useRouter();
  const { sectionItem } = useLocalSearchParams();
    console.log("hello",sectionItem)
  const item = getItemById(sectionItem); // Replace with your logic to get the item details by ID

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <ParallaxScrollView style={{flex:1}} parallaxHeaderHeight={250} backgroundColor={'red'}>
        <View style={{height:500}}>
            <Text>Details page</Text>
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

const getItemById = (id) => {
  // Replace with your logic to fetch item details by ID
  // This is just a placeholder function
  return {
    name: "Sample Item",
    price: "$10.00",
    calories: "200",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  calories: {
    fontSize: 18,
  },
});

export default SectionItemScreen;