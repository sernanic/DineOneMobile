import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo, useCallback, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import MapView, { Marker } from 'react-native-maps';
import useMerchantData from '@/hooks/useMerchantData';
import { useMerchantStore } from '@/store/merchantStore';
import { useAuthStore } from '@/store/authStore';
import { useCustomerData } from '@/hooks/useCustomerData';
import { useCustomerStore } from '@/store/customerStore';
import { supabase } from '@/components/auth/supabase';
import { styles } from './locationDrawer.styles';

// Types
export type LocationDrawerRef = BottomSheetModal;

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Restaurant {
  merchantId: string;
  name: string;
  imageUrl: string | null;
  location: {
    address: string;
    coordinates: Coordinates;
  } | null;
}

interface RestaurantWithDistance extends Restaurant {
  distance: number;
}

interface LocationDrawerProps {
  onClose?: () => void;
}

// Components
const RestaurantItem: React.FC<{
  merchant: RestaurantWithDistance;
  onSelect: (restaurant: RestaurantWithDistance) => void;
  isSelected: boolean;
}> = ({ merchant, onSelect, isSelected }) => (
  <TouchableOpacity
    style={[styles.locationItem, isSelected && styles.selectedLocation]}
    onPress={() => onSelect(merchant)}
  >
    <View style={styles.locationContent}>
      {merchant.imageUrl ? (
        <Image source={{ uri: merchant.imageUrl }} style={styles.merchantImage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{merchant.name}</Text>
        <Text style={styles.locationAddress}>
          {merchant.location?.address || 'Address not available'}
        </Text>
        <Text style={styles.distanceText}>
          {merchant.distance.toFixed(1)} miles away
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Custom Hook for Location Logic
const useLocationPermission = () => {
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);

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

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  return { currentLocation, locationLoading };
};

// Main Component
const LocationDrawer = forwardRef<LocationDrawerRef, LocationDrawerProps>((props, ref) => {
  const { currentLocation, locationLoading } = useLocationPermission();
  const [sortedRestaurants, setSortedRestaurants] = useState<RestaurantWithDistance[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantWithDistance | null>(null);
  const mapRef = React.useRef<MapView>(null);
  
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  
  const { merchants, isLoading: isMerchantsLoading } = useMerchantData(10);
  const { merchantId, setMerchantId } = useMerchantStore();
  const { session, setSession } = useAuthStore();
  const { updateCustomerMerchant } = useCustomerData();
  const setCustomer = useCustomerStore((state) => state.setCustomer);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    };

    initializeAuth();
  }, [setSession]);

  const sortRestaurantsByDistance = useCallback((
    userLocation: Location.LocationObject,
    merchantsList: Restaurant[]
  ) => {
    if (!userLocation || !merchantsList?.length) return;
    
    const restaurantsWithDistance = merchantsList
      .filter(merchant => merchant.location?.coordinates)
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

  useEffect(() => {
    if (currentLocation && merchants) {
      sortRestaurantsByDistance(currentLocation, merchants);
    }
  }, [currentLocation, merchants, sortRestaurantsByDistance]);

  const focusLocation = useCallback((restaurant: RestaurantWithDistance) => {
    if (!restaurant.location?.coordinates || !mapRef.current) return;

    mapRef.current.animateToRegion({
      latitude: restaurant.location.coordinates.latitude,
      longitude: restaurant.location.coordinates.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, []);

  useEffect(() => {
    if (merchantId && merchants) {
      const currentMerchant = merchants.find(m => m.merchantId === merchantId);
      if (currentMerchant && currentLocation) {
        const merchantWithDistance = {
          ...currentMerchant,
          distance: getDistance(
            { 
              latitude: currentLocation.coords.latitude, 
              longitude: currentLocation.coords.longitude 
            },
            { 
              latitude: currentMerchant.location!.coordinates.latitude, 
              longitude: currentMerchant.location!.coordinates.longitude 
            }
          ) / 1609.34 // Convert meters to miles
        };
        setSelectedRestaurant(merchantWithDistance);
        focusLocation(merchantWithDistance);
      }
    }
  }, [merchantId, merchants, currentLocation, focusLocation]);

  const handleRestaurantSelect = useCallback(async (restaurant: RestaurantWithDistance) => {
    setSelectedRestaurant(restaurant);
    focusLocation(restaurant);
    setMerchantId(restaurant.merchantId);

    if (session?.user) {
      try {
        const updatedCustomer = await updateCustomerMerchant(session.user.id, restaurant.merchantId);
        setCustomer(updatedCustomer);
      } catch (error) {
        console.error('Error updating customer merchant:', error);
      }
    }

    if (props.onClose) {
      props.onClose();
    }
  }, [session, setMerchantId, updateCustomerMerchant, setCustomer, props.onClose, focusLocation]);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    []
  );

  if (locationLoading || isMerchantsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={2}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <View style={styles.drawerContainer}>
        {currentLocation && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {sortedRestaurants.map((restaurant) => (
              restaurant.location?.coordinates && (
                <Marker
                  key={restaurant.merchantId}
                  coordinate={restaurant.location.coordinates}
                  title={restaurant.name}
                />
              )
            ))}
          </MapView>
        )}

        {selectedRestaurant && (
          <View style={styles.selectedMerchantContainer}>
            <View style={styles.selectedMerchantContent}>
              {selectedRestaurant.imageUrl ? (
                <Image 
                  source={{ uri: selectedRestaurant.imageUrl }} 
                  style={styles.selectedMerchantImage} 
                />
              ) : (
                <View style={styles.selectedMerchantPlaceholder} />
              )}
              <View style={styles.selectedMerchantInfo}>
                <Text style={styles.selectedMerchantName}>{selectedRestaurant.name}</Text>
                <Text style={styles.selectedMerchantAddress}>
                  {selectedRestaurant.location?.address || 'Address not available'}
                </Text>
                <Text style={styles.selectedMerchantDistance}>
                  {selectedRestaurant.distance.toFixed(1)} miles away
                </Text>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Locations</Text>
        </View>
        
        <ScrollView style={styles.locationsList}>
          {sortedRestaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.merchantId}
              merchant={restaurant}
              onSelect={handleRestaurantSelect}
              isSelected={selectedRestaurant?.merchantId === restaurant.merchantId}
            />
          ))}
        </ScrollView>
      </View>
    </BottomSheetModal>
  );
});

LocationDrawer.displayName = 'LocationDrawer';

export default LocationDrawer;