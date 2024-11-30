import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import MapView, { Marker } from 'react-native-maps';
import useMerchantData from '../../hooks/useMerchantData';

export type LocationDrawerRef = BottomSheetModal;

interface Restaurant {
  merchantId: string;
  name: string;
  imageUrl: string | null;
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  } | null;
}

interface LocationDrawerProps {
  onClose?: () => void;
}

const LocationDrawer = forwardRef<LocationDrawerRef, LocationDrawerProps>((props, ref) => {
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [sortedRestaurants, setSortedRestaurants] = useState<(Restaurant & { distance: number })[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<(Restaurant & { distance: number }) | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const mapRef = useRef<MapView>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  
  // Fetch merchants data
  const { merchants, isLoading: isMerchantsLoading } = useMerchantData(10); // TODO: Replace with actual clientId

  const sortRestaurantsByDistance = useCallback((userLocation: Location.LocationObject, merchantsList: Restaurant[]) => {
    if (!userLocation || !merchantsList?.length) return;
    
    const restaurantsWithDistance = merchantsList
      .filter(merchant => merchant.location?.coordinates) // Only include merchants with location
      .map(merchant => ({
        ...merchant,
        distance: getDistance(
          { 
            latitude: userLocation.coords.latitude, 
            longitude: userLocation.coords.longitude 
          },
          { 
            latitude: merchant.location!.coordinates.latitude, 
            longitude: merchant.location!.coordinates.longitude 
          }
        ) / 1609.34 // Convert meters to miles
      }))
      .sort((a, b) => a.distance - b.distance);

    setSortedRestaurants(restaurantsWithDistance);
  }, []);

  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setLocationLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLocationLoading(false);
    }
  }, []);

  // Initial location permission request
  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  // Update sorted restaurants when location or merchants change
  useEffect(() => {
    if (currentLocation && merchants?.length) {
      sortRestaurantsByDistance(currentLocation, merchants);
    }
  }, [currentLocation, merchants, sortRestaurantsByDistance]);

  const isLoading = locationLoading || isMerchantsLoading;

  const focusLocation = (restaurant: Restaurant & { distance: number }) => {
    mapRef.current?.animateToRegion({
      latitude: restaurant.location!.coordinates.latitude,
      longitude: restaurant.location!.coordinates.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }, 1000);
    setSelectedRestaurant(restaurant);
  };

  const renderLocationItem = (merchant: Restaurant & { distance: number }) => (
    <View key={merchant.merchantId} style={styles.locationItem}>
      <Image
        source={{ uri: merchant.imageUrl || 'https://via.placeholder.com/100' }}
        style={styles.locationImage}
      />
      
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{merchant.name}</Text>
        <Text style={styles.locationDistance}>{`${merchant.distance.toFixed(1)} mi`}</Text>
        <Text style={styles.locationAddress}>{merchant.location?.address || 'Address not available'}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => {
          focusLocation(merchant);
        }}
      >
        <Text style={styles.selectButtonText}>SELECT</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={2}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      onDismiss={props.onClose}
    >
      <View style={styles.drawerContent}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <View style={styles.mapContainer}>
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                  latitude: currentLocation?.coords.latitude ?? 41.3137,
                  longitude: currentLocation?.coords.longitude ?? -74.1205,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
              >
                {currentLocation && (
                  <Marker
                    coordinate={{
                      latitude: currentLocation.coords.latitude,
                      longitude: currentLocation.coords.longitude,
                    }}
                    title="You are here"
                    pinColor="blue"
                  />
                )}
                {sortedRestaurants.map((merchant) => (
                  merchant.location?.coordinates && (
                    <Marker
                      key={merchant.merchantId}
                      coordinate={{
                        latitude: merchant.location.coordinates.latitude,
                        longitude: merchant.location.coordinates.longitude,
                      }}
                      title={merchant.name}
                    />
                  )
                ))}
              </MapView>
            </View>
            
            {selectedRestaurant && (
              <View style={styles.selectedLocationContainer}>
                <View style={styles.selectedLocationInfo}>
                  <Text style={styles.selectedLocationName}>
                    {selectedRestaurant.name}
                  </Text>
                  <Text style={styles.selectedLocationAddress}>
                    {selectedRestaurant.location?.address || 'Address not available'}
                  </Text>
                  {selectedRestaurant.distance && (
                    <Text style={styles.selectedLocationDistance}>
                      {`${selectedRestaurant.distance.toFixed(1)} mi`}
                    </Text>
                  )}
                </View>
                <TouchableOpacity 
                  style={styles.selectButtonLarge}
                  onPress={() => {
                    // Handle selection
                    props.onClose?.();
                  }}
                >
                  <Text style={styles.selectButtonTextLarge}>SELECT</Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.cityTitle}>Nearby Locations</Text>
            <ScrollView style={styles.locationsList}>
              {sortedRestaurants.map(location => renderLocationItem(location))}
            </ScrollView>
          </>
        )}
      </View>
    </BottomSheetModal>
  );
});

LocationDrawer.displayName = 'LocationDrawer';

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#F5F5F5',
  },
  drawerContent: {
    flex: 1,
    padding: 16,
  },
  cityTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
  mapContainer: {
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  selectedLocationContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedLocationInfo: {
    flex: 1,
  },
  selectedLocationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  selectedLocationAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  selectedLocationDistance: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  selectButtonLarge: {
    backgroundColor: '#E8E3DD',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginLeft: 16,
  },
  selectButtonTextLarge: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LocationDrawer;