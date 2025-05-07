import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignupLayout from './signup';

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignupLayout />
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

export default home;