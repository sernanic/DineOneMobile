import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import Header from '../components/home/header';
import { useRouter } from 'expo-router';


const Home = () => {
  const router = useRouter();

  return (
    <>
    <Header title={"test"} cartItemsCount={12}  />
    <View style={styles.itemContainer}>
          <Text style={styles.sectionText}>helllo</Text>
        </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Home;