import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RewardItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image
          source={{ uri: item.imgsrc }}
          style={styles.image}
        />
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.points}>{item.points} points</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  leftContent: {
    marginRight: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  rightContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  points: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
});

export default RewardItem;