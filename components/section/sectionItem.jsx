// MenuItem.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SectionItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item.id)}>
      <Image
        source={require('../../assets/images/react-logo.png')} // Replace with your image source
        style={styles.itemImage}
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={styles.priceCaloriesContainer}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <Text style={styles.itemCalories}>{item.calories}</Text>
        </View>
      </View>
      {item.selected && (
        <View style={styles.selectedIndicator}>
          <View style={styles.checkmark} />
        </View>
      )}
    </TouchableOpacity>
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
    selectedIndicator: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkmark: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'blue',
      },
  });

export default SectionItem;