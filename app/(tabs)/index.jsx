/**
 * Main Menu screen component
 * Displays categories, popular items, and featured content
 */
import React, { useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  Text,
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';

import GeneralHeader from '@/components/general/header';
import Categories from '@/components/home/Categories';
import PopularItems from '@/components/home/PopularItems';
import Features from '@/components/features/Features';

import { useCustomerStore } from '@/store/customerStore';
import { useCustomerData } from '@/hooks/useCustomerData';
import { useAuthStore } from '@/store/authStore';
import { usePopularItems } from '@/hooks/usePopularItems';
import useMenuData from '@/hooks/useMenuData';

import Colors from '@/constants/Colors';

const Menu = () => {
  // Get menu sections data
  const { allSubSections } = useMenuData();
  const router = useRouter();
  const { popularItems, isLoading, error } = usePopularItems();
  const customer = useCustomerStore((state) => state?.customer || {});
  const { fetchCustomerData } = useCustomerData();
  const session = useAuthStore((state) => state.session);

  // Fetch customer data when session is available
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
          <Categories categories={allSubSections} />
          <PopularItems 
            items={popularItems}
            isLoading={isLoading}
            error={error}
          />
          <View style={[styles.featuredContainer, styles.popularContainer]}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>Features</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.featuredScroll}
            >
              <Features />
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
  featuredContainer: {
    marginTop: 24,
  },
  featuredScroll: {
    paddingLeft: 20,
  },
  popularContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 16,
    color: Colors.text,
  },
});

export default Menu;