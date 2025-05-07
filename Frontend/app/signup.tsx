import { StyleSheet, View, Text } from 'react-native';
import ReminderLogo from '@/components/AppLogo';
import InputField from '@/components/InputField';
import SubmissionButton from '@/components/Button';
import OAuthButton from '@/components/OAuthButton';

const SignupLayout = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <ReminderLogo />
      </View>
      <View style={styles.userInputContainer}>
        <InputField type='email'/>
        <InputField type='username' />
        <InputField type='password' />
      </View>


      <View style={styles.submissionContainer}>
        <SubmissionButton text={'Sign up'}/>
        
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

export default SignupLayout;