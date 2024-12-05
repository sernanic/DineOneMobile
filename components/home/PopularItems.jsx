import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import EditorChoiceItem from './EditorChoiceItem';
import { defaultImage } from '@/constants/mockData';
import Colors from '@/constants/Colors';

/**
 * PopularItems component displaying popular menu items
 * @param {Object} props
 * @param {Array} props.items - Array of popular items
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.error - Error message if any
 */
const PopularItems = ({ items, isLoading, error }) => {
  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;
  if (!items?.length) return <Text>No popular items available</Text>;

  return (
    <View style={styles.popularContainer}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeader}>Popular Now</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.popularItemsScroll}
      >
        {items.map((item) => (
          <EditorChoiceItem 
            key={item.itemId}
            title={item.name}
            image={item.images?.[0]?.imageUrl ? { uri: item.images[0].imageUrl } : defaultImage}
            price={item.price}
            isNew={item.isNew}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  popularContainer: {
    marginTop: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 16,
    color: Colors.text,
  },
  viewAll: {
    color: Colors.primary,
  },
  popularItemsScroll: {
    paddingLeft: 20,
  },
  errorText: {
    color: Colors.primary,
    marginLeft: 20,
  },
});

export default PopularItems;
