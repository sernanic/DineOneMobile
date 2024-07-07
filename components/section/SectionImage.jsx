import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BoxWithImage = ({ imageSource, boxStyle, imageStyle }) => {
  return (
    <View style={[styles.box, boxStyle]}>
      <Image source={imageSource} style={[styles.image, imageStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default BoxWithImage;