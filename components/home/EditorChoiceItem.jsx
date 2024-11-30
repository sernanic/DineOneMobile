import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const EditorChoiceItem = ({ title, image, price, isNew = false }) => {
  return (
    <TouchableOpacity style={styles.container}>
      {isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newText}>NEW</Text>
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.calories}>Cal.: 930-1100</Text>
      <Text style={styles.price}>${(price / 100).toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: 8,
    borderRadius: 6,
    padding: 8,
  },
  newBadge: {
    top: 8,
    left: 8,
    padding: 2,
  },
  newText: {
    marginLeft: 2,
    fontSize: 10,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  calories: {
    fontSize: 12,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
  }
});

export default EditorChoiceItem; 