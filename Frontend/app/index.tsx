/**
 * Index page is responsible for redirecting the user 
 * to either the home screen, or to the signup screen, 
 * depending on whether the JWT token is valid or 
 * exists.
 */

import SignupScreen from './(auth)/signup';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { validateMe } from '@/api/auth';

const IndexPage = () => {  

  /**
   * Responsible to do the following functions when 
   * the component mounts.
   */
  
  useEffect(() => {

    /**
     * Responsible for validating whether the token in 
     * async storage is valid or not. Makes an api call 
     * to the backend, which checks the validity of the 
     * JWT token. getData function is only run once.
     */
    const getData = async () => {
      try {
        const tokendData = await AsyncStorage.getItem('token')
        console.log('Token:', tokendData, 'at index.tsx')
  
        // API call to the backend responsible for validating token
        const response = await validateMe(tokendData)
        console.log(response.data)
        /**
         * Token is sent from the backend, indicating the token 
         * is valid.
         */
        if(response.data.token) {
          router.dismissTo('/home')
        }
      } catch (err: any) {
        console.log('Token validation failed:', err.message)
      }
    }
    getData()
  }, [])

  return (
    <SignupScreen />
  )
}

export default IndexPage;