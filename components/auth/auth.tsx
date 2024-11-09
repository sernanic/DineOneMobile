import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import { supabase } from './supabase'
import { Button, Input } from '@rneui/themed'
import { useAuthStore } from '@/store/authStore';
import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MERCHANT_ID, CLIENT_ID,API_BASE_URL } from '@/constants/Config';
import axios from 'axios';
import { useCustomerStore } from '@/store/customerStore';
import { useCustomerData } from '@/hooks/useCustomerData';

type RootStackParamList = {
  index: undefined;
  SignUp: undefined;
  // ... add other screens as needed
};

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { session, setSession } = useAuthStore(state => ({
    session: state.session,
    setSession: state.setSession,
  }));
  const { fetchCustomerData } = useCustomerData();

  async function signInWithEmail() {
    setLoading(true)
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("error",error)
      if (error) {
        Alert.alert(error.message)
        return
      }

      if (!session) {
        throw new Error('No session data available');
      }

      const { data: customerData, error: customerError } = await fetchCustomerData(session.user.id);
      
      if (customerError) {
        Alert.alert('Error', customerError);
        return;
      }

      setSession(session);
      useCustomerStore.getState().setCustomer(customerData);
      navigation.navigate('index');
      
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.backText}>back!</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter your mail/phone number"
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#ddd', size: 20 }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize={'none'}
            containerStyle={styles.inputWrapper}
            inputContainerStyle={styles.inputField}
            inputStyle={styles.inputText}
          />

          <Input
            placeholder="Enter your password"
            leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ddd', size: 20 }}
            rightIcon={{ 
              type: 'font-awesome', 
              name: 'eye', 
              color: '#ddd', 
              size: 20,
              onPress: () => {/* Toggle password visibility */} 
            }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize={'none'}
            containerStyle={styles.inputWrapper}
            inputContainerStyle={styles.inputField}
            inputStyle={styles.inputText}
          />
        </View>

        <View style={styles.rememberContainer}>
          <View style={styles.checkboxContainer}>
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </View>

        <Button 
          title="Sign in" 
          disabled={loading}
          onPress={() => signInWithEmail()}
          buttonStyle={styles.signInButton}
          titleStyle={styles.buttonText}
          loading={loading}
        />

        <Text style={styles.orText}>Or</Text>

        <Button 
          icon={{
            name: 'google',
            type: 'font-awesome',
            size: 18,
            color: '#757575',
          }}
          title="Continue with google"
          buttonStyle={styles.googleButton}
          titleStyle={styles.googleButtonText}
          type="outline"
        />

        <View style={styles.footerContainer}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <Text 
            style={styles.createAccountText} 
            onPress={() => navigation.navigate('SignUp')}
          >
            Create an account
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  headerContainer: {
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    color: Colors.primary,
    fontWeight: '600',
  },
  backText: {
    fontSize: 32,
    color: '#000',
    fontWeight: '600',
    marginTop: -5,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 8,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    paddingHorizontal: 0,
    marginBottom: 15,
  },
  inputField: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 0,
  },
  inputText: {
    fontSize: 14,
    color: '#333',
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    color: '#757575',
    fontSize: 14,
  },
  forgotPassword: {
    color: '#2089dc',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#757575',
    marginVertical: 20,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  googleButtonText: {
    color: '#757575',
    fontSize: 16,
    marginLeft: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  noAccountText: {
    color: '#757575',
    fontSize: 14,
  },
  createAccountText: {
    color: Colors.primary,
    fontSize: 14,
  },
})
