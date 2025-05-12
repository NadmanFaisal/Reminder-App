import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import alert from '../../components/Alert';
import ReminderLogo from '@/components/AppLogo';
import InputField from '@/components/InputField';
import SubmissionButton from '@/components/Button';
import OAuthButton from '@/components/OAuthButton';
import { loginUser } from '@/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const loginPress = async () => {
    console.log('Log in button pressed!')
    if(email.trim() === '') {
      alert('Email field cannot be empty.')
      return
    }
    if(password === '') {
      alert('Password field cannot be empty.')
      return
    }
    try {
      const response = await loginUser(email, password)
      if(response.status === 200) {
        console.log('Logged in Succesfully!')
        console.log(response.data.token)
        await AsyncStorage.setItem('token', response.data.token)
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
        <ReminderLogo />
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