import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import foodRewards from '@/data/foodRewards';

interface RewardItem {
  id: string;
  points: number;
  title: string;
  description: string;
  imgsrc: string;
}

const RewardItem: React.FC<{ item: RewardItem }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.rewardItem}>
      <View style={styles.rewardImageContainer}>
        <Image 
          source={{ uri: item.imgsrc }} 
          style={styles.rewardImage}
          // Add a default placeholder while image loads
          // defaultSource={require('@/assets/images/placeholder.png')}
        />
      </View>
      <View style={styles.rewardInfo}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <Text style={styles.rewardPoints}>{item.points} Points</Text>
        <Text style={styles.rewardDescription}>{item.description}</Text>
      </View>
      <Ionicons name="lock-closed" size={24} color="#666" style={styles.lockIcon} />
    </TouchableOpacity>
  );
};

const RewardsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('Redeem');
  const crumbs = 0;
  const tabs = ['Redeem', 'Status', 'Earn', 'Cash'];


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={styles.tierContainer}>
          <Text style={styles.tierText}>Bronze</Text>
          <Ionicons name="diamond-outline" size={24} color="black" />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {/* {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))} */}
      </View>

      {/* Crumbs Card */}
      <View style={styles.crumbsCard}>
        <View style={styles.crumbsContent}>
          <View>
            <Text style={styles.crumbsTitle}>My Points</Text>
            <Text style={styles.crumbsCount}>{crumbs}</Text>
            <View style={styles.earnBadge}>
              <Ionicons name="diamond-outline" size={16} color={Colors.primary} />
              <Text style={styles.earnText}>Earn 10 for every $1</Text>
            </View>
            <Text style={styles.yearText}>0 Points earned in 2024</Text>
          </View>
          {/* <Image 
            source={require('@/assets/images/noun-trophy-7345753.png')}
            style={styles.trophyImage}
          /> */}
        </View>
      </View>

      {/* Redeem Section */}
      <ScrollView 
        style={styles.redeemSection}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.redeemTitle}>Redeem</Text>
        <View style={styles.rewardsList}>
          {foodRewards.map((item) => (
            <RewardItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 16,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  tierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tierText: {
    fontSize: 18,
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  crumbsCard: {
    margin: 16,
    padding: 20,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    marginTop: 35,
  },
  crumbsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trophyImage: {
    width: 100,
    height: 100,
    opacity: 0.9,
  },
  crumbsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  crumbsCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  earnBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 20,
    gap: 8,
    marginBottom: 12,
  },
  earnText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  yearText: {
    color: 'white',
    opacity: 0.8,
  },
  redeemSection: {
    flex: 1,
    padding: 16,
  },
  redeemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rewardsList: {
    gap: 16,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  rewardImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  rewardPoints: {
    fontSize: 16,
    color: '#666',
  },
  rewardDescription: {
    fontSize: 16,
    color: '#666',
  },
  lockIcon: {
    marginLeft: 16,
  },
});

export default RewardsScreen;