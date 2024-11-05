import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  useReducedMotion,
} from 'react-native-reanimated';
import Colors from '../../../constants/Colors';

const Dot = ({x, index, size}) => {
  const isReducedMotion = useReducedMotion();

  const animatedDotStyle = useAnimatedStyle(() => {
    if (isReducedMotion) {
      return {
        width: x.value === index * size ? 20 : 10,
        opacity: x.value === index * size ? 1 : 0.5,
      };
    }

    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [10, 20, 10],
      Extrapolation.CLAMP,
    );
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });
  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    height: 5,
    backgroundColor: Colors.primary,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});