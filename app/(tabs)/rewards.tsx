import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import foodRewards from '@/data/foodRewards';
import RewardCard from '@/components/rewards/RewardCard';
import PointsCard from '@/components/rewards/PointsCard';

const RewardsScreen: React.FC = () => {
  const [activeTab] = React.useState('Redeem');
  const userPoints = 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={styles.tierContainer}>
          <Text style={styles.tierText}>Bronze</Text>
          <Ionicons name="diamond-outline" size={24} color="black" />
        </View>
      </View>

      <PointsCard points={userPoints} />

      <ScrollView 
        style={styles.redeemSection}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.redeemTitle}>Redeem</Text>
        <View style={styles.rewardsList}>
          {foodRewards.map((item) => (
            <RewardCard key={item.id} item={item} />
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
});

export default RewardsScreen;