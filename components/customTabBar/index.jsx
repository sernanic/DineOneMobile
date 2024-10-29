import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const tabs = [
  { name: 'Home', route: '/', icon: 'home' },
  { name: 'Menu', route: '/menu', icon: 'food' },
  { name: 'Rewards', route: '/rewards', icon: 'star' },
  { name: 'Cart', route: '/cart', icon: 'cart' },
];

export default function CustomTabBar() {
  const router = useRouter();
  const currentPath = usePathname();
  const tabWidth = width / tabs.length * 1.2;
  console.log(tabWidth);

  const animatedWidth = useSharedValue(0);
  const activeIndex = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: activeIndex.value === 1 
      ? animatedWidth.value * 1.2  // Increased width only for Menu (1)
      : activeIndex.value === 2 
        ? animatedWidth.value * 1.2  // Keeping the existing width for Rewards (2)
        : animatedWidth.value,  // Default width for Home (0) and other tabs
    position: 'absolute',
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    left: (activeIndex.value * tabWidth) + (tabWidth - tabWidth * 0.8) / 2 - 
      (activeIndex.value === 1 ? 45 : 0) -  // Added offset for Menu
      (activeIndex.value > 1 ? 30 + (activeIndex.value - 1) * 15 : 0) - 
      (activeIndex.value === tabs.length - 1 ? 35 : 0) - 
      (activeIndex.value === 2 ? 25 : 0),
  }));

  React.useEffect(() => {
    const newActiveIndex = tabs.findIndex(tab => tab.route === currentPath);
    activeIndex.value = newActiveIndex;
    
    animatedWidth.value = 0;
    
    animatedWidth.value = withTiming(tabWidth * 0.8, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [currentPath]);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle} />
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab.name}
          style={[
            styles.tab,
          ]}
          onPress={() => router.push(tab.route)}
        >
          <View style={styles.tabContent}>
            <MaterialCommunityIcons
              name={tab.icon}
              size={24}
              color={currentPath === tab.route ? '#fff' : '#000'}
              style={currentPath === tab.route ? styles.activeTabIcon : styles.tabIcon}
            />
            {currentPath === tab.route && (
              <Text
                style={[
                  styles.tabText,
                  currentPath === tab.route && styles.activeTabText
                ]}
              >
                {tab.name}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 40,
    borderRadius: 30,
    width: '95%',
    alignSelf: 'center',
    overflow: 'hidden', 
    //shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 8,
    // elevation: 8,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 1,
    width: width / tabs.length,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tabIcon: {
    marginRight: 0,
  },
  activeTabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
});