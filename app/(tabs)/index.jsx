import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '@/components/home/header';
import { useRouter } from 'expo-router';


const Home = () => {
  const router = useRouter();

  return (
    <>
    <Header title={"test"}  />
    <ImageBackground 
      source={require('../../assets/images/backgroundImage.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.itemContainer}>
        <Text style={styles.sectionText}>hello</Text>
      </View>
    </ImageBackground>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    height: '40%',
    width: '85%',
    backgroundColor:'#fff',
    borderRadius:20,
    marginTop:200,
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Home;