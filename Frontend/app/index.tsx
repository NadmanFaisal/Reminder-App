import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignupScreen from './signup';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './home';

const IndexPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('isLoggedIn')
      console.log(data, 'at index.tsx')
      setIsLoggedIn(data === 'true')
    }
    getData()
  }, [])

  const loadScreen = () => {
    if(isLoggedIn) {
      return (
        <HomeScreen setIsLoggedIn={setIsLoggedIn}/>
      )
    } else {
      return (
        <SignupScreen setIsLoggedIn={setIsLoggedIn}/>
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loadScreen()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFBDE',
      flex: 1,
    },
});

export default IndexPage;