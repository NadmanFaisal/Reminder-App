import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet, Modal } from "react-native";
import { router } from 'expo-router';
import { validateMe } from "@/api/auth";
import IntroBox from "@/components/IntroBox";
import AddButton from "@/components/AddButton";
import DoneCancelButton from "@/components/DoneCancelButton";
import { BoxedInputField } from "@/components/InputField";

type logInProp = {
    tokenData: string | null
}

const HomeScreen = ({ tokenData }: logInProp) => {
    const [username, setUsername] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const [date, setDate] = useState('')
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [remindDate, setRemindDate] = useState('')
    const [remindTime, setRemindTime] = useState('')

    useEffect(() => {
        const getData = async () => {
          try {
            const tokendData = await AsyncStorage.getItem('token')
            console.log('Token:', tokendData, 'at index.tsx')
      
            const response = await validateMe(tokendData)
            console.log(response.data)
            if(response.data.username) {
              setUsername(response.data.username)
            }
          } catch (err: any) {
            console.log('Token validation failed:', err.message)
            await AsyncStorage.removeItem('token')
          }
        }
        getData()
      }, [])
    const signOut = async () => {
        await AsyncStorage.removeItem("token");
        router.dismissTo('/signup')
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.modalButtonContainer}>
                        <DoneCancelButton text="Cancel" onPress={() => setModalVisible(!modalVisible)} />
                        <DoneCancelButton text="Done" />
                    </View>

                    <View style={styles.titleContainer}>
                        <BoxedInputField type="Title" value={title} onChangeValue={setTitle} securedTextEntry={false} />
                    </View>
                    
                    <View style={styles.descriptionContainer}>
                        <BoxedInputField type="Description" value={description} onChangeValue={setDescription} securedTextEntry={false} height={230} textAlignVertical="top" multiline={true} />
                    </View>

                    <View style={styles.dateAndTimeContainer}>
                        <BoxedInputField type="Date" value={remindDate} onChangeValue={setRemindDate} securedTextEntry={false} width={120} />
                        <BoxedInputField type="Time" value={remindTime} onChangeValue={setRemindTime} securedTextEntry={false} width={120} />
                    </View>
                  </View>


                </View>

            </Modal>

            <View style={styles.introContainer}>
                <IntroBox text={`Welcome, ${username}`}/>
                <Pressable onPress={signOut}><Text>Sign Out</Text></Pressable>
            </View>

            <View style={styles.calendarContainer}>
                <View style={styles.monthContainer}></View>

                <View style={styles.dayContainer}></View>

                <View style={styles.addButtonContainer}>
                    <AddButton onPress={() => setModalVisible(true)}/>
                </View>
            </View>

            <View style={styles.reminderContainer}>


            </View>

            <View style={styles.showAllContainer}>

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
    introContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
    },
    calendarContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%'
    },
    monthContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '35%',
        width: '100%'
    },
    dayContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '35%',
        width: '100%'
    },
    addButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: '3%',
        height: '30%',
        width: '100%'
    },
    reminderContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%'
    },
    showAllContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%'
    },

    //====================== MODAL VIEW ============================

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: '100%',
        height: '65%', 
        backgroundColor: '#FFFBDE',
        borderRadius: 15,
        borderTopWidth: 4,
        alignItems: 'center',
        padding: 15
    },
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        justifyContent: 'space-between',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '15%',
        width: '100%',
    },
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '50%',
        width: '100%',
    },
    dateAndTimeContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '15%',
        width: '100%',
        justifyContent: 'space-between',
    }
})

export default HomeScreen