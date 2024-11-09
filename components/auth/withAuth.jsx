import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import Auth from './auth';
import { supabase } from './supabase';
import Colors from '@/constants/Colors';


const withAuth = (WrappedComponent) => {
  return () => {
    const { session, setSession } = useAuthStore(state => ({
      session: state.session,
      setSession: state.setSession,
    }));

    const [localSession, setLocalSession] = useState(session);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Update the local session state when the store session changes
      setLocalSession(session);
    }, [session]);

    useEffect(() => {
      // Check for any session updates (e.g., after signing in)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);
        setLocalSession(session); // Also update the local state immediately
        console.log("Session updated:", session); // Log the updated session
      });

      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }, []);

    useEffect(() => {
      // Delay before deciding whether to show the Auth component
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500); // 1 second delay

      return () => clearTimeout(timeout);
    }, []);

     // Log the local session value

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="${Colors.primary}" />
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!localSession) {
      return (
        <View style={{ flex: 1 }}>
          <Auth />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <WrappedComponent />
      </View>
    );
  };
};

export default withAuth;