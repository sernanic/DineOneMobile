import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import RewardCard from '@/components/rewards/RewardCard';
import PointsCard from '@/components/rewards/PointsCard';
import { useRewards } from '@/hooks/useRewards';

const RewardsScreen: React.FC = () => {
  const [activeTab] = React.useState('Redeem');
  const userPoints = 0;
  const { rewards, isLoading, error } = useRewards();

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
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : rewards.length === 0 ? (
            <Text style={styles.noRewardsText}>No rewards available</Text>
          ) : (
            rewards.map((item:any) => (
              <RewardCard key={item.id} item={item} />
            ))
          )}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  noRewardsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default RewardsScreen;