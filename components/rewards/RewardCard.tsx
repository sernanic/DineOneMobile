import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RewardItem } from '@/types/rewards';

interface RewardCardProps {
  item: RewardItem;
}

const RewardCard: React.FC<RewardCardProps> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.rewardItem}>
      <View style={styles.rewardImageContainer}>
        {item.imgsrc ? (
          <Image 
            source={{ uri: item.imgsrc }}
            style={styles.rewardImage}
          />
        ) : (
          <Ionicons name="gift-outline" size={30} color="#666" />
        )}
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

const styles = StyleSheet.create({
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

export default RewardCard; 