import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const FullWidthImage = ({ source }) => {
  const windowWidth = Dimensions.get('window').width;
  const [imageHeight, setImageHeight] = useState(400);

  const onImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    const scaleFactor = windowWidth / width;
    const calculatedHeight = height * scaleFactor;
    setImageHeight(Math.min(calculatedHeight, 400));
  };

  return (
    <View style={[styles.container, { height: imageHeight }]}>
      <Image
        source={source}
        style={[styles.image, { width: windowWidth, height: imageHeight }]}
        resizeMode="cover"
        onLoad={onImageLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
});

export default FullWidthImage;