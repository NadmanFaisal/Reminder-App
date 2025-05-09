import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import alert from '../components/Alert';
import ReminderLogo from '@/components/AppLogo';
import InputField from '@/components/InputField';
import SubmissionButton from '@/components/Button';
import OAuthButton from '@/components/OAuthButton';
import signupUser from '@/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'

type SignupScreenProps = {
  setIsLoggedIn: (value: boolean) => void;
};

const SignupScreen = ({ setIsLoggedIn }: SignupScreenProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const signUpPress = async () => {
    console.log('Sign up button pressed!')
    if(email.trim() === '') {
      alert('Email field cannot be empty.')
      return
    }
    if(username === '') {
      alert('Username field cannot be empty.')
      return
    }
    if(password === '') {
      alert('Password field cannot be empty.')
      return
    }
    try {
      const response = await signupUser(email, username, password)
      if(response.status === 201) {
        console.log('Signed up Succesfully!')
        console.log(response.data.token)
        await AsyncStorage.setItem('token', response.data.token)
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        setIsLoggedIn(true)
      }
    } catch (error: any) {
      console.log(error.message)
      alert("Signup Failed", error.message || "Something went wrong");
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <ReminderLogo />
      </View>
      <View style={styles.userInputContainer}>
        <InputField type='email' value={email} onChangeValue={setEmail} securedTextEntry={false} />
        <InputField type='username' value={username} onChangeValue={setUsername} securedTextEntry={false} />
        <InputField type='password' value={password} onChangeValue={setPassword} securedTextEntry={true} />
      </View>


      <View style={styles.submissionContainer}>
        <SubmissionButton text={'Sign up'} onPress={signUpPress} />
        
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>
        
        <OAuthButton text='Sign up' />
      </View>
    </View>
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

export default SignupScreen;