import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import Header from '@/components/home/header';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    notificationPreferences: {
      orderUpdates: true,
      specialOffers: true,
      newsletter: false,
    }
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile(prev => ({
        ...prev,
        avatar: result.assets[0].uri
      }));
    }
  };

  const toggleNotification = (key) => {
    setProfile(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [key]: !prev.notificationPreferences[key]
      }
    }));
  };

  return (
    <>
      <Header title="Edit Profile" />
      <ScrollView style={styles.container}>
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={handleImagePick}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: profile.avatar }}
                style={styles.avatar}
              />
              <View style={styles.avatarOverlay}>
                <Icon name="camera-alt" type="material" color="#fff" size={24} />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={profile.firstName}
              onChangeText={(text) => setProfile(prev => ({ ...prev, firstName: text }))}
              placeholder="Enter your first name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={profile.lastName}
              onChangeText={(text) => setProfile(prev => ({ ...prev, lastName: text }))}
              placeholder="Enter your last name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={profile.email}
              onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={profile.phone}
              onChangeText={(text) => setProfile(prev => ({ ...prev, phone: text }))}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          
          <TouchableOpacity 
            style={styles.preferenceItem}
            onPress={() => toggleNotification('orderUpdates')}
          >
            <Text style={styles.preferenceText}>Order Updates</Text>
            <Icon
              name={profile.notificationPreferences.orderUpdates ? 'toggle-on' : 'toggle-off'}
              type="font-awesome"
              size={24}
              color={profile.notificationPreferences.orderUpdates ? '#2E7D32' : '#666'}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.preferenceItem}
            onPress={() => toggleNotification('specialOffers')}
          >
            <Text style={styles.preferenceText}>Special Offers</Text>
            <Icon
              name={profile.notificationPreferences.specialOffers ? 'toggle-on' : 'toggle-off'}
              type="font-awesome"
              size={24}
              color={profile.notificationPreferences.specialOffers ? '#2E7D32' : '#666'}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.preferenceItem}
            onPress={() => toggleNotification('newsletter')}
          >
            <Text style={styles.preferenceText}>Newsletter</Text>
            <Icon
              name={profile.notificationPreferences.newsletter ? 'toggle-on' : 'toggle-off'}
              type="font-awesome"
              size={24}
              color={profile.notificationPreferences.newsletter ? '#2E7D32' : '#666'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Save Changes"
            buttonStyle={styles.saveButton}
            containerStyle={styles.buttonWrapper}
          />
          <Button
            title="Cancel"
            type="outline"
            buttonStyle={styles.cancelButton}
            containerStyle={styles.buttonWrapper}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  avatarSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  preferenceText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  buttonWrapper: {
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButton: {
    borderColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default EditProfile; 