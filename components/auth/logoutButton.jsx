import React from 'react';
import { Button, View, Alert } from 'react-native';
import { supabase } from './supabase'; // Ensure you have your Supabase client setup here
import { useAuthStore } from '@/store/authStore';

const LogoutButton = () => {
  const { setSession } = useAuthStore(state => ({
    setSession: state.setSession,
  }));

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error', `Error logging out: ${error.message}`);
    } else {
      setSession(null);
      Alert.alert('Success', 'Logged out successfully');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutButton;