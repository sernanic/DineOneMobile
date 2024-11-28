import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import Header from '@/components/home/header'

const ProfileItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.profileItemContent}>
      <Icon name={icon} type="material" size={24} color="#000" />
      <Text style={styles.profileItemText}>{title}</Text>
    </View>
    <Icon name="chevron-right" type="material" size={24} color="#000" />
  </TouchableOpacity>
);

const Profile = () => {
  const router = useRouter();

  return (
    <>
      <Header title="Profile" />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Information</Text>
        <View style={styles.section}>
          <ProfileItem
            icon="store"
            title="Stores"
            onPress={() => router.push('/stores')}
          />
        </View>

        <Text style={styles.sectionTitle}>My Account</Text>
        <View style={styles.section}>
          <ProfileItem
            icon="receipt"
            title="Orders"
            onPress={() => router.push('/orders')}
          />
          <ProfileItem
            icon="credit-card"
            title="Payment Details"
            onPress={() => router.push('/payment-details')}
          />
          <ProfileItem
            icon="edit"
            title="Edit Profile"
            onPress={() => router.push('/edit-profile')}
          />
        </View>

        <TouchableOpacity 
          style={styles.signOutContainer}
          onPress={() => {
            Alert.alert(
              "Sign Out",
              "Are you sure you want to sign out?",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                { 
                  text: "Sign Out", 
                  onPress: () => supabase.auth.signOut(),
                  style: "destructive"
                }
              ]
            );
          }}
        >
          <View style={styles.signOutButton}>
            <Icon name="logout" type="material" size={24} color="#FF3B30" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#000',
  },
  signOutContainer: {
    marginTop: 'auto',
    marginBottom: 100,
    paddingHorizontal: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B30',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  signOutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Profile;