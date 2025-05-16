import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet, Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import { router } from 'expo-router';
import { validateMe } from "@/api/auth";
import IntroBox from "@/components/IntroBox";
import AddButton from "@/components/AddButton";
import DoneCancelButton from "@/components/DoneCancelButton";
import { BoxedInputField, DateInputField, TimeinputField } from "@/components/InputField";
import DateTimePicker from '@react-native-community/datetimepicker';
import alert from "@/components/Alert";

import { createReminder } from "@/api/reminder";

const HomeScreen = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    
    const [modalVisible, setModalVisible] = useState(false)
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    
    const [displayDate, setDisplayDate] = useState(new Date())
    const [displayTime, setDisplayTime] = useState(new Date())
    
    const [remindDate, setRemindDate] = useState(new Date())
    const [remindTime, setRemindTime] = useState(new Date())


    useEffect(() => {
        const getData = async () => {
          try {
            const tokenData = await AsyncStorage.getItem('token')
            console.log('Token:', tokenData, 'at index.tsx')
      
            const response = await validateMe(tokenData)
            console.log(response.data)
            if(tokenData) {
                setToken(tokenData)
            }
            if(response.data.username) {
                setEmail(response.data.email)
                setUsername(response.data.username)
            }
          } catch (err: any) {
            console.log('Token validation failed:', err.message)
            await AsyncStorage.removeItem('token')
            router.dismissTo('/login')
          }
        }
        getData()
    }, [])

    const signOut = async () => {
        await AsyncStorage.removeItem("token");
        router.dismissTo('/login')
    }

    const postReminder = async () => {
        try {
            const mergedDateTime = new Date(remindDate)
            mergedDateTime.setHours(remindTime.getHours())
            mergedDateTime.setMinutes(remindTime.getMinutes())
            mergedDateTime.setSeconds(0)
            mergedDateTime.setMilliseconds(0)

            const response = createReminder(description, email, false, false, (new Date()), (new Date()), mergedDateTime, token)
            if(response) {
                console.log(response)
                setModalVisible(false)
            }
        } catch (err: any) {
            alert("Creating reminder failed", err.message || "Something went wrong");
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible) }}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setShowDatePicker(false); setShowTimePicker(false); setModalVisible(false) }}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setShowDatePicker(false); setShowTimePicker(false) }}>
                            <View style={styles.modalView}>
                                <View style={styles.modalButtonContainer}>
                                    <DoneCancelButton text="Cancel" onPress={() => setModalVisible(!modalVisible)} />
                                    <DoneCancelButton text="Done" 
                                        onPress={() => postReminder()}
                                    />
                                </View>

                                <View style={styles.titleContainer}>
                                    <BoxedInputField type="Title" value={title} onChangeValue={setTitle} securedTextEntry={false} />
                                </View>

                                <View style={styles.descriptionContainer}>
                                    <BoxedInputField type="Description" value={description} onChangeValue={setDescription} securedTextEntry={false} height={100} textAlignVertical="top" multiline={true} />
                                </View>

                                <View style={styles.dateAndTimeContainer}>
                                    <DateInputField type="Date" onPress={() => { setShowDatePicker(true); setShowTimePicker(false) }} value={displayDate.toISOString().split('T')[0]} securedTextEntry={false} width={120} />
                                    <TimeinputField type="Time" onPress={() => { setShowTimePicker(true); setShowDatePicker(false) }} value={displayTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} securedTextEntry={false} width={120} />
                                </View>

                                <View style={styles.dateTimePickerContainer}>
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={remindDate}
                                            mode="date"
                                            display="spinner"
                                            themeVariant="light"
                                            onChange={(event, remindDate) => { 
                                                setShowDatePicker(false)
                                                if (remindDate) {
                                                    setRemindDate(remindDate)
                                                    setDisplayDate(remindDate)
                                                }
                                            }}
                                        />
                                    )}

                                    {showTimePicker && (
                                        <DateTimePicker
                                            value={remindTime}
                                            mode="time"
                                            display="spinner"
                                            themeVariant="light"
                                            onChange={(event, selectedTime) => {
                                                setShowTimePicker(false)
                                                if (selectedTime) {
                                                    const mergedDateTime = new Date(remindDate)
                                                    mergedDateTime.setHours(selectedTime.getHours())
                                                    mergedDateTime.setMinutes(selectedTime.getMinutes())
                                                    mergedDateTime.setSeconds(0)
                                                    mergedDateTime.setMilliseconds(0)
                                            
                                                    setRemindTime(mergedDateTime)
                                                    setDisplayTime(mergedDateTime)
                                                }
                                            }}
                                        />
                                    )}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.introContainer}>
                <IntroBox text={`Welcome, ${username}`}/>
                <Pressable onPress={signOut}><Text>Sign Out</Text></Pressable>
                <Text>{}</Text>
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

    //==============================================================

    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '15%',
        width: '100%',
    },
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '25%',
        width: '100%',
    },
    dateAndTimeContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '15%',
        width: '100%',
        justifyContent: 'space-between',
    },
    dateTimePickerContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '35%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default HomeScreen