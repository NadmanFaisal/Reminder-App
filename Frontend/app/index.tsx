import SignupScreen from './(signup)/signup';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const IndexPage = () => {  
  useEffect(() => {
    const getData = async () => {
      const tokendData = await AsyncStorage.getItem('token')
      console.log('Token:', tokendData, 'at index.tsx')
      if(tokendData) {
        router.dismissTo('/home')
      }
    }
    getData()
  }, [])

  return (
    <SignupScreen />
  )
}

export default IndexPage;