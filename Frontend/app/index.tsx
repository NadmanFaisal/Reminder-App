import SignupScreen from './(auth)/signup';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { validateMe } from '@/api/auth';

const IndexPage = () => {  
  useEffect(() => {
    const getData = async () => {
      try {
        const tokendData = await AsyncStorage.getItem('token')
        console.log('Token:', tokendData, 'at index.tsx')
  
        const response = await validateMe(tokendData)
        console.log(response.data)
        if(response.data.token) {
          router.dismissTo('/home')
        }
      } catch (err: any) {
        console.log('Token validation failed:', err.message)
        // await AsyncStorage.removeItem('token')
      }
    }
    getData()
  }, [])

  return (
    <SignupScreen />
  )
}

export default IndexPage;