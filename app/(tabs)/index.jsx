import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GeneralHeader from '@/components/general/header';
import FeaturedCard from '@/components/home/FeaturedCard';
import EditorChoiceItem from '@/components/home/EditorChoiceItem';
import { featuredItems, defaultImage } from '@/constants/mockData';
import { API_BASE_URL } from '@/constants/Config';
import { useCustomerStore } from '@/store/customerStore';
import { useCustomerData } from '@/hooks/useCustomerData';
import { useAuthStore } from '@/store/authStore';
import { usePopularItems } from '@/hooks/usePopularItems';
import useMenuData from '@/hooks/useMenuData';

const Menu = () => {
  const { allSubSections } = useMenuData();
  
  console.log("allSubSections", allSubSections)

  const router = useRouter();
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
    if (!popularItems?.length) return <Text>No popular items available</Text>;

    return popularItems.map((item) => (
      <EditorChoiceItem 
        key={item.itemId}
        title={item.name}
        image={item.images?.[0]?.imageUrl ? { uri: item.images[0].imageUrl } : defaultImage}
        price={item.price}
        isNew={item.isNew}
      />
    ));
  }, [popularItems, isLoading, error]);

  const renderMenuSections = () => (
    <>
      <View style={styles.menuHeaderContainer}>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity 
          style={styles.fullMenuButton}
          onPress={() => router.push('/menu')}
        >
          <Ionicons name="book-outline" size={24} color="#000" />
          <Text style={styles.fullMenuText}>Full Menu</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuSectionsContainer}
      >
        {allSubSections?.length > 0 && allSubSections
          .filter(section => section.name.toLowerCase() !== 'all')
          .map((section) => (
            <TouchableOpacity 
              key={section.id} 
              style={styles.menuSectionItem}
              onPress={() => router.push({
                pathname: '/menu',
                params: { section: section.name.toLowerCase() }
              })}
            >
              <Image 
                source={
                  section.image 
                    ? { uri: section.image }
                    : require('@/assets/images/image-product-1-landscape.jpg')
                } 
                style={styles.sectionIcon} 
              />
              <Text style={styles.sectionText}>{section.name.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </>
  );

  return (
    <>
      <GeneralHeader title="Home" />
      <View style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
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

          
          {renderMenuSections()}

          <Text style={styles.sectionTitle}>Popular Items</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.popularItemsScroll}
          >
            {renderPopularItems}
          </ScrollView>
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
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  featuredScroll: {
    paddingLeft: 20,
  },
  popularItemsScroll: {
    paddingLeft: 20,
  },
  menuSectionsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  menuSectionItem: {
    width: 120,
    marginBottom: 12,
    alignItems: 'center',
    height: 130,
    position: 'relative',
  },
  sectionIcon: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  sectionText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
    color: '#000',
  },
  menuHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  fullMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  fullMenuText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Menu;