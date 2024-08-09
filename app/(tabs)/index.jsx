import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import Header from '../../components/home/header';
import { useRouter } from 'expo-router';
import useCartStore from '../../store/cartStore';


const Home = () => {
  const router = useRouter();
  const {items} = useCartStore()

  return (
    <>
    <Header title={"test"} cartItemsCount={items}  />
    <View style={styles.itemContainer}>
          <Text style={styles.sectionText}></Text>
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