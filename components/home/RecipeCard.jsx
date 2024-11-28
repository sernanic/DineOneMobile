import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const RecipeCard = ({ title, image, price, calories, isNew }) => {
  return (
    <View style={styles.recipeCard}>
      <View style={styles.recipeImageContainer}>
        <Image
          source={image}
          style={styles.recipeImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.heartButton}>
          <Text style={styles.heartIcon}>♡</Text>
        </TouchableOpacity>
        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>New</Text>
          </View>
        )}
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>{title}</Text>
        <View style={styles.recipeMetaContainer}>
          <Text style={styles.recipePriceText}>${price.toFixed(2)}</Text>
          {calories && <Text style={styles.recipeMetaText}>• {calories} kcal</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: 'white',
    borderRadius: 24,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    margin: 4,
  },
  recipeImageContainer: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  recipeImage: {
    width: '100%',
    height: 128,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heartIcon: {
    fontSize: 18,
    color: '#666',
  },
  recipeInfo: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1F2937',
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipePriceText: {
    color: '#97C4B8',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  recipeMetaText: {
    color: '#6B7280',
    fontSize: 12,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#97C4B8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default RecipeCard;
