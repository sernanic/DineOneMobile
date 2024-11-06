import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeaturedCard = ({ title, chef, duration, image }) => (
  <View style={styles.featuredCard}>
    <Image source={image} style={styles.featuredImage} />
    <View style={styles.featuredContent}>
      <Text style={styles.featuredTitle}>{title}</Text>
      <View style={styles.chefRow}>
        <Image source={chef.avatar} style={styles.chefAvatar} />
        <Text style={styles.chefName}>{chef.name}</Text>
        <View style={styles.durationContainer}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  featuredCard: {
    width: 300,
    height: 200,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  featuredTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  chefRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chefAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  chefName: {
    color: 'white',
    fontSize: 14,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  duration: {
    color: 'white',
    marginLeft: 4,
  },
});

export default FeaturedCard; 