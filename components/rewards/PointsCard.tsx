import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface PointsCardProps {
  points: number;
}

const PointsCard: React.FC<PointsCardProps> = ({ points }) => {
  return (
    <View style={styles.crumbsCard}>
      <View style={styles.crumbsContent}>
        <View>
          <Text style={styles.crumbsTitle}>My Points</Text>
          <Text style={styles.crumbsCount}>{points}</Text>
          <View style={styles.earnBadge}>
            <Ionicons name="diamond-outline" size={16} color={Colors.primary} />
            <Text style={styles.earnText}>Earn 10 for every $1</Text>
          </View>
          <Text style={styles.yearText}>0 Points earned in 2024</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PointsCard; 