import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

const tabs = [
  { name: 'HOME', route: '/' },
  { name: 'MENU', route: '/menu' },
  { name: 'REWARDS', route: '/rewards' },
  { name: 'CART', route: '/cart' },
];

export default function CustomTabBar() {
  const router = useRouter();
  const currentPath = usePathname();
  const tabWidth = width / tabs.length;

  const lineWidth = useSharedValue(0);

  const lineStyle = useAnimatedStyle(() => ({
    width: lineWidth.value,
  }));

  const [tabWidths, setTabWidths] = React.useState({});

  const handleTextLayout = (event, index) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths((prev) => ({ ...prev, [index]: width }));
  };

  React.useEffect(() => {
    const newLineWidth = tabWidths[tabs.findIndex(tab => tab.route === currentPath)] || 0;
    lineWidth.value = withTiming(newLineWidth, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
  }, [currentPath, tabWidths]);

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab.name}
          style={[styles.tab, { width: tabWidths[index] || 'auto' }]}
          onPress={() => {
            router.push(tab.route);
            lineWidth.value = 0;
          }}
        >
          <Text
            style={[
              styles.tabText,
              currentPath === tab.route && styles.activeTabText
            ]}
            onLayout={(event) => handleTextLayout(event, index)}
          >
            {tab.name}
          </Text>
          {currentPath === tab.route && (
            <Animated.View style={[styles.activeLine, lineStyle]} />
          )}
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
    height: 100,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginBottom: 0,
    paddingHorizontal: 5, // Add some padding to ensure the line starts under the first letter
  },
  activeTabText: {
    color: Colors.primary,
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    left: 0, // Start from the left edge of the text
    height: 3,
    backgroundColor: Colors.primary,
  },
});