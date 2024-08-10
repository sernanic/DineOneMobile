import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';


const FullWidthImage = ({ source,onBackPress }) => {
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
      {/* <View style={[styles.icon, styles.roundButton]}>
        <Ionicons name="chevron-back-outline" size={30} color="white"  />
      </View> */}

      <TouchableOpacity style={[styles.icon]} onPress={onBackPress}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </BlurView>
      </TouchableOpacity>

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
  icon: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // Optional, to ensure the blur effect is round
  },
});

export default FullWidthImage;