import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export type Ref = BottomSheetModal;

const dummyLocations = [
  {
    id: 1,
    name: 'Woodbury Commons',
    distance: '10014.8 mi',
    address: '489 Red Apple Court, Unit K120, Central Valley',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    status: 'Closed',
    isFeatured: true
  },
  {
    id: 2,
    name: 'Broadway & W 91st St',
    distance: '10051.3 mi',
    address: '2461 Broadway, New York',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800',
    status: 'Open'
  },
  {
    id: 3,
    name: 'Broadway & W 86th',
    distance: '10051.5 mi',
    address: '2345 Broadway, New York',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800',
    status: 'No App Orders'
  },
  {
    id: 4,
    name: '88th & Madison',
    distance: '10051.9 mi',
    address: '1225 Madison Avenue, New York',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
    status: 'Open'
  }
];

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['90%'], []);
  const renderBackdrop = useCallback((props: any) => 
    <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, 
  []);
  const { dismiss } = useBottomSheetModal();

  const renderLocationItem = (location: any, isFeatured = false) => (
    <View key={location.id} style={isFeatured ? styles.featuredItem : styles.locationItem}>
      {isFeatured ? (
        <Image
          source={{ uri: location.image }}
          style={styles.featuredImage}
        />
      ) : (
        <Image
          source={{ uri: location.image }}
          style={styles.locationImage}
        />
      )}
      
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{location.name}</Text>
        <Text style={styles.locationDistance}>{location.distance}</Text>
        <Text style={styles.locationAddress}>{location.address}</Text>
        <Text style={[
          styles.locationStatus,
          location.status === 'Closed' && styles.closedStatus
        ]}>
          {location.status}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => {
          // Handle location selection
          dismiss();
        }}
      >
        <Text style={styles.selectButtonText}>SELECT</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.cityTitle}>New York</Text>
        
        {/* Featured Location */}
        {renderLocationItem(dummyLocations[0], true)}
        
        {/* Nearest Locations Section */}
        <Text style={styles.sectionTitle}>Nearest Locations</Text>
        <ScrollView style={styles.locationsList}>
          {dummyLocations.slice(1).map(location => renderLocationItem(location))}
        </ScrollView>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: Colors.grey,
    width: 60,
  },
  bottomSheetBackground: {
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  cityTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
    color: '#333',
  },
  featuredItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  locationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  locationImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  locationDistance: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  locationStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  closedStatus: {
    color: '#FF3B30',
  },
  selectButton: {
    backgroundColor: '#E8E3DD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginLeft: 12,
  },
  selectButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  locationsList: {
    flex: 1,
  },
});

export default BottomSheet;
