import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GeneralHeader from '@/components/general/header';
import FeaturedCard from '@/components/home/FeaturedCard';
import EditorChoiceItem from '@/components/home/EditorChoiceItem';
import { featuredItems, defaultImage } from '@/constants/mockData';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Config';
import { useCustomerStore } from '@/store/customerStore';
import { useCustomerData } from '@/hooks/useCustomerData';
import { useAuthStore } from '@/store/authStore';
import { useGreeting } from '@/hooks/useGreeting';
import { usePopularItems } from '@/hooks/usePopularItems';


const Menu = () => {
  const { greeting, greetingIcon } = useGreeting();
  const { popularItems, isLoading, error } = usePopularItems();
  const customer = useCustomerStore((state) => state?.customer || {});
  const { fetchCustomerData } = useCustomerData();
  const session = useAuthStore((state) => state.session);
  useEffect(() => {
    const getCustomerData = async () => {
      if (session?.user?.id && !customer?.firstName) {
        const { data, error } = await fetchCustomerData(session.user.id);
        if (data && !error) {
          useCustomerStore.setState({ customer: data });
        }
      }
    };
    
    getCustomerData();
  }, [session, customer?.firstName, fetchCustomerData]); 

  const renderPopularItems = useMemo(() => {
    if (isLoading) return <ActivityIndicator size="large" />;
    if (error) return <Text style={styles.errorText}>Error: {error}</Text>;
    if (popularItems.length === 0) return <Text>No popular items available</Text>;

    return popularItems.map((item) => (
      <EditorChoiceItem 
        key={item.itemId}
        title={item.name}
        image={item.images?.[0]?.imageUrl ? { uri: item.images[0].imageUrl } : defaultImage}
        price={item.price}
      />
    ));
  }, [popularItems, isLoading, error]);

  return (
    <>
      <GeneralHeader title="Home" />
      <View style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View>
              <View style={styles.greetingRow}>
                <Ionicons name={greetingIcon} size={24} color="#666" />
                <Text style={styles.greeting}>{greeting}</Text>
              </View>
              <Text style={styles.userName}>{customer?.firstName || 'Guest'} {customer?.lastName || ''}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Featured</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.featuredScroll}
          >
            {featuredItems.map((item) => (
              <FeaturedCard 
                key={item.id}
                {...item}
              />
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Popular Items</Text>
          <View style={styles.editorChoiceContainer}>
            {renderPopularItems}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 220,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  featuredScroll: {
    paddingLeft: 20,
  },
  editorChoiceContainer: {
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Menu;