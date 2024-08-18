import { View, Text, Image, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import React, { useRef } from 'react';
import Header from '../../components/rewards/RewardsHeader';
import foodRewards from '@/data/foodRewards';
import RewardItem from '../../components/rewards/RewardItemCard';
import { useRouter } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAuthStore } from '@/store/authStore';
import withAuth from '@/components/auth/withAuth';


interface FoodReward {
    id: string;          // Assuming each reward has a unique ID
    points: number;      // Points associated with the reward
    title: string;       // Title of the reward
    description: string; // Description of the reward
    imgsrc: string;      // Image source URL or path
  }
  
  

// Component Function
const Rewards: React.FC = () => {
  const router = useRouter();

  const handleExit = () => {
    router.push('/');
  };

  const { session, setSession } = useAuthStore((state) => ({
    session: state.session,
    setSession: state.setSession,
  }));

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  console.log("this is rewards",session);

  if (session == null) {
    openModal();
  }

  let points = 10;

  // Render item function for FlatList
  const renderItem: ListRenderItem<FoodReward> = ({ item }) => <RewardItem item={item}  />;

  return (
    <View>
      <Header title="Rewards" handleExit={handleExit} />
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 15 }}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with actual image source
          style={styles.image}
        />
        <View>
          <Text style={{ fontSize: 24, marginTop: 10 }}>
            You've got
          </Text>
          <Text style={{ fontSize: 24, fontWeight: '700' }}>{points} POINTS</Text>
        </View>
      </View>
      <View style={{ marginTop: 10, height: 630 }}>
        <FlatList
          data={foodRewards}
          keyExtractor={(item) => item.title} // Assuming title is unique; adjust if needed
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
});

export default withAuth(Rewards);