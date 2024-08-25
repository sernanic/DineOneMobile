import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from './RewardsBottomSheet';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons

interface RewardItemProps {
  item: {
    id: string;
    points: number;
    title: string;
    description: string;
    imgsrc: string;    
  };
  currentPoints: number; // Add currentPoints to the interface
}

const RewardItem: React.FC<RewardItemProps> = ({ item, currentPoints }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = (item: any) => {
    if (item.points <= currentPoints) {
      bottomSheetRef.current?.present();
    }
  };

  return (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.container}>
        {item.points <= currentPoints && (
          <BottomSheet ref={bottomSheetRef} rewardItem={item} />
        )}

        <View style={styles.leftContent}>
          <Image
            source={require('../../assets/images/image-product-1-landscape.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.rightContent}>
          <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.points}>{item.points} points</Text>
          </View>
          {item.points > currentPoints && (
            <Ionicons name="lock-closed" size={20} color="gray" style={styles.lockIcon} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: 'white',
    // borderRadius: 8,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    // marginVertical: 8,
    // marginHorizontal: 16,
    borderBottomColor:'#E0E0E0',
    borderBottomWidth:1,
  },
  leftContent: {
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  rightContent: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  points: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  lockIcon: {
    marginLeft: 8,
  },
});

export default RewardItem;