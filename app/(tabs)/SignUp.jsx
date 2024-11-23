import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { supabase } from '@/components/auth/supabase'
import { Button, Input } from '@rneui/themed'
import { useAuthStore } from '@/store/authStore'
import Colors from '@/constants/Colors'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useCustomerStore } from '@/store/customerStore'

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const { setSession } = useAuthStore(state => ({ setSession: state.setSession }))
  const { setCustomer } = useCustomerStore(state => ({ setCustomer: state.setCustomer }))
  
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }
  })
  const navigation = useNavigation()
  const clientId = 10
  const merchantId = '6JDE8MZSA6FJ1'
  // Get password value for comparison
  const password = watch('password')

  async function onSubmit(data) {
    setLoading(true)
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })
      
      if (error) {
        if (error.message.includes("Database error saving new user")) {
          Alert.alert("Sign Up Error", "There was an issue creating your account. Please try again later or contact support.")
        } else {
          Alert.alert("Sign Up Error", error.message)
        }
      } else if (!session) {
        Alert.alert("Sign Up Successful", "Please check your inbox for email verification!")
      } else {
        try {
          const customerData = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            merchantId: merchantId,
            clientId: clientId,
            authUUID: session.user.id
          }
          
          const response = await axios.post(
            `http://127.0.0.1:4000/api/v1/client/${clientId}/merchant/${merchantId}/customers`,
            customerData
          )
          if (response.status === 200 || response.status === 201) {
            setCustomer(response.data.customer)
            setSession(session)
            navigation.navigate('index')
          } else {
            throw new Error('Failed to create customer profile')
          }
        } catch (customerError) {
          console.error("Error creating customer:", customerError)
          Alert.alert(
            "Account Created",
            "Your account was created but there was an issue setting up your profile. Please try logging in."
          )
        }
      }
    } catch (error) {
      console.error("Unexpected error during sign up:", error)
      Alert.alert("Sign Up Error", "An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Create</Text>
          <Text style={styles.backText}>Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: 'First name is required'
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="First Name"
                leftIcon={{ type: 'font-awesome', name: 'user', color: '#ddd', size: 20 }}
                onChangeText={onChange}
                value={value}
                containerStyle={styles.inputWrapper}
                inputContainerStyle={styles.inputField}
                inputStyle={styles.inputText}
                errorMessage={errors.firstName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            rules={{
              required: 'Last name is required'
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Last Name"
                leftIcon={{ type: 'font-awesome', name: 'user', color: '#ddd', size: 20 }}
                onChangeText={onChange}
                value={value}
                containerStyle={styles.inputWrapper}
                inputContainerStyle={styles.inputField}
                inputStyle={styles.inputText}
                errorMessage={errors.lastName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter your email"
                leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#ddd', size: 20 }}
                onChangeText={onChange}
                value={value}
                autoCapitalize={'none'}
                containerStyle={styles.inputWrapper}
                inputContainerStyle={styles.inputField}
                inputStyle={styles.inputText}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Create password"
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ddd', size: 20 }}
                rightIcon={{ 
                  type: 'font-awesome', 
                  name: 'eye', 
                  color: '#ddd', 
                  size: 20,
                  onPress: () => {/* Toggle password visibility */} 
                }}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                autoCapitalize={'none'}
                containerStyle={styles.inputWrapper}
                inputContainerStyle={styles.inputField}
                inputStyle={styles.inputText}
                errorMessage={errors.password?.message}
                textContentType="none"
                autoComplete="off"
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirm password"
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ddd', size: 20 }}
                rightIcon={{ 
                  type: 'font-awesome', 
                  name: 'eye', 
                  color: '#ddd', 
                  size: 20,
                  onPress: () => {/* Toggle password visibility */} 
                }}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                autoCapitalize={'none'}
                containerStyle={styles.inputWrapper}
                inputContainerStyle={styles.inputField}
                inputStyle={styles.inputText}
                errorMessage={errors.confirmPassword?.message}
                textContentType="none"
                autoComplete="off"
              />
            )}
          />
        </View>

        <Button 
          title="Sign up" 
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
          buttonStyle={styles.signInButton}
          titleStyle={styles.buttonText}
          loading={loading}
        />

        <View style={styles.footerContainer}>
          <Text style={styles.noAccountText}>Already have an account? </Text>
          <Text 
            style={styles.createAccountText}
            onPress={() => navigation.navigate('SignIn')}
          >
            Sign in
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