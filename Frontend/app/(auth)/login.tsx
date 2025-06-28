/**
 * Log in page is used for logging in users 
 * into the system. This page features manual 
 * email and password input, which are used to 
 * validate users in the DB. The page also features 
 * OAuth log in. Upon successful user validation, 
 * the backend provides a JWT token, which is used 
 * to authorize all the API calls made by the 
 * particular user.
 */

import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import alert from '../../components/Alert';
import IntroBox from '@/components/IntroBox';
import { InputField } from '@/components/InputField';
import { SubmissionButton } from '@/components/Buttons';
import OAuthButton from '@/components/OAuthButton';
import { loginUser } from '@/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router'

const LoginScreen = () => {

  // Used to hold the email value of the user from the input forms
  const [email, setEmail] = useState('');

  // Used to hold the password value of the user from the input forms
  const [password, setPassword] = useState('');
  
  /** 
   * Responsible for validating whether the user exists 
   * in the DB. Upon validation, the backend returns a 
   * token, which is placed in the async storage. The 
   * token is later used for authorization whevener the 
   * user makes an API call to the backend.
  */
  const loginPress = async () => {
    console.log('Log in button pressed!')

    // Validates the email format. Throws error is incorrect
    if(email.trim() === '') {
      alert('Email field cannot be empty.')
      return
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Email is invalid.')
      return
    }

    // Password field cannot be empty
    if(password === '') {
      alert('Password field cannot be empty.')
      return
    }
    try {

      // API call to the backend responsible for logging in
      const response = await loginUser(email, password)
      if(response.status === 200) {

        // Removes the previous invalid token
        await AsyncStorage.removeItem("token");
        console.log('Logged in Succesfully!')
        console.log(response.data.token)

        // Sets the new token in the async storage
        await AsyncStorage.setItem('token', response.data.token)

        // Redirects to home screen
        router.dismissTo('/home')
      }
    } catch (error: any) {
      console.log(error.message)
      alert("Login Failed", error.message || "Something went wrong");
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <IntroBox text="Reminder App" />
      </View>
      <View style={styles.userInputContainer}>
        <InputField type='email' value={email} onChangeValue={setEmail} securedTextEntry={false} />
        <InputField type='password' value={password} onChangeValue={setPassword} securedTextEntry={true} />
      </View>

      <View style={styles.submissionContainer}>
        <SubmissionButton text={'Log in'} onPress={loginPress} />
        
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>
        
        <OAuthButton text='Log in' />
        <Text style={styles.loginLink} onPress={() => {router.replace('/(auth)/signup')}}>Don&apos;t have an account? Sign up!</Text>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFBDE',
      flex: 1,
    },
    logoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '25%',
    },
    userInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '35%',
    },
    submissionContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '40%',
      width: '100%'
    },
    loginLink: {
      paddingTop: '5%',
      color: '#B7B7B7'
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      width: '80%',
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: 'black',
    },
    orText: {
      marginHorizontal: 10,
      fontSize: 14,
      color: '#000',
    },
});

export default LoginScreen;