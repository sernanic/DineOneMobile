import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from '@rneui/themed';
import Header from '@/components/home/header';

const dummyStores = [
  {
    id: 1,
    name: "Downtown Bistro",
    address: "123 Main St, Downtown",
    rating: 4.8,
    distance: "0.8 mi",
    status: "Open",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    hours: "9:00 AM - 10:00 PM"
  },
  {
    id: 2,
    name: "Riverside Restaurant",
    address: "456 River Road",
    rating: 4.6,
    distance: "1.2 mi",
    status: "Open",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=500",
    hours: "10:00 AM - 11:00 PM"
  },
  {
    id: 3,
    name: "Garden Café",
    address: "789 Park Avenue",
    rating: 4.9,
    distance: "1.5 mi",
    status: "Closed",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500",
    hours: "8:00 AM - 9:00 PM"
  },
];

const StoreCard = ({ store }) => (
  <TouchableOpacity style={styles.storeCard}>
    <Image
      source={{ uri: store.image }}
      style={styles.storeImage}
    />
    <View style={styles.storeInfo}>
      <View style={styles.storeHeader}>
        <Text style={styles.storeName}>{store.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" type="material" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{store.rating}</Text>
        </View>
      </View>
      
      <Text style={styles.storeAddress}>{store.address}</Text>
      
      <View style={styles.storeFooter}>
        <View style={styles.storeDetail}>
          <Icon name="schedule" type="material" size={16} color="#666" />
          <Text style={styles.detailText}>{store.hours}</Text>
        </View>
        <View style={styles.storeDetail}>
          <Icon name="place" type="material" size={16} color="#666" />
          <Text style={styles.detailText}>{store.distance}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: store.status === 'Open' ? '#E8F5E9' : '#FFEBEE' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: store.status === 'Open' ? '#2E7D32' : '#C62828' }
          ]}>{store.status}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const Stores = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header title="Our Stores" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon name="search" type="material" size={24} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search stores..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView 
          style={styles.storesList}
          showsVerticalScrollIndicator={false}
        >
          {dummyStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  storesList: {
    flex: 1,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeImage: {
    width: '100%',
    height: 200,
  },
  storeInfo: {
    padding: 16,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#000',
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  storeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Stores; 