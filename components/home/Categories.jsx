import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

/**
 * Categories component displaying horizontal scrollable category pills
 * @param {Object} props
 * @param {Array} props.categories - Array of category objects
 */
const Categories = ({ categories }) => {
  const router = useRouter();

  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionHeader}>Categories</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        <TouchableOpacity style={[styles.categoryPill, styles.categoryPillActive]}>
          <Text style={[styles.categoryText, styles.categoryTextActive]}>All</Text>
        </TouchableOpacity>
        {categories?.length > 0 && categories
          .filter(section => section.name.toLowerCase() !== 'all')
          .map((section) => (
            <TouchableOpacity 
              key={section.id} 
              style={styles.categoryPill}
              onPress={() => router.push({
                pathname: '/menu',
                params: { section: section.name.toLowerCase() }
              })}
            >
              <Text style={styles.categoryText}>{section.name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 16,
    color: Colors.text,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.lightGrey,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 16,
    color: Colors.mediumDark,
  },
  categoryTextActive: {
    color: Colors.light.background,
  },
});

export default Categories;
