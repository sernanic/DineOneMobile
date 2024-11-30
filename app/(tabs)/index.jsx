import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Image, TextInput } from 'react-native';
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
import Colors from '@/constants/Colors';

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

  const renderCategories = () => (
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
        {allSubSections?.length > 0 && allSubSections
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

  const handleExit = () => {
    router.push('/');
  };

  return (
    <>
      <GeneralHeader title='Home' handleExit={handleExit} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >


          {renderCategories()}

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
              style={styles.popularItemsScroll}
            >
              {renderPopularItems}
            </ScrollView>
          </View>

          <View style={styles.featuredContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>Featured</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeBack: {
    fontSize: 16,
    color: Colors.medium,
  },
  guestName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 4,
  },
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 16,
    color: Colors.primary,
  },
  popularContainer: {
    marginTop: 24,
  },
  popularItemsScroll: {
    paddingLeft: 20,
  },
  featuredContainer: {
    marginTop: 24,
  },
  featuredScroll: {
    paddingLeft: 20,
  },
  errorText: {
    color: Colors.primary,
    marginLeft: 20,
  },
});

export default Menu;