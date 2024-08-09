import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Header from '../../components/rewards/RewardsHeader'
import foodRewards from '@/data/foodRewards';
import RewardItem from '../../components/rewards/RewardItemCard';
import { useRouter } from 'expo-router';

export default Rewards = () => {
    const router = useRouter();

    const handleExit = () => {
        router.push('/');
    };

    let points = 10
    console.log(foodRewards)
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
                    </Text >
                    <Text style={{ fontSize: 24, fontWeight: '700' }}>{points} POINTS</Text>
                </View>

            </View>
            <View style={{marginTop:10,height:630}}>
                <FlatList
                    data={foodRewards}
                    keyExtractor={(item) => item.title} // Assuming title is unique, else use another unique identifier
                    renderItem={({ item }) => <RewardItem item={item} 
                    contentContainerStyle={{ paddingBottom: 500 }}
/>}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
})