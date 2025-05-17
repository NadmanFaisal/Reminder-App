import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet, ScrollView } from "react-native";
import { router } from 'expo-router';
import { validateMe } from "@/api/auth";
import IntroBox from "@/components/IntroBox";
import AddButton from "@/components/AddButton";
import alert from "../../components/Alert";
import { CreateReminderModal } from "@/components/ModalView";
import { Reminder } from "@/components/Reminders";
import { createReminder, getUserReminders, updateReminderCompleteStatus } from "@/api/reminder";

const HomeScreen = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [reminders, setReminders] = useState([])
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

    const [refreshKey, setRefreshKey] = useState(0);


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
        getData();
    }, [])

    useEffect(() => {
        const fetchUserReminders = async () => {
            try {
                console.log(email)
                const response = await getUserReminders(email, token)
                if(response.data) {
                    const latestReminders = response.data.sort(
                        (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    );
                    setReminders(latestReminders)
                    console.log(response.data)
                }
            } catch (err: any) {
                console.log('Reminders could not be fetched:', err.message)
            }
        }
        fetchUserReminders()
    }, [email, token, refreshKey])

    const signOut = async () => {
        await AsyncStorage.removeItem("token");
        router.dismissTo('/login')
    }

    const postReminder = async () => {
        try {
            if(title === '') {
                alert('Title cannot be empty.')
                return
            }

            const mergedDateTime = new Date(remindDate)
            mergedDateTime.setHours(remindTime.getHours())
            mergedDateTime.setMinutes(remindTime.getMinutes())
            mergedDateTime.setSeconds(0)
            mergedDateTime.setMilliseconds(0)

            const response = await createReminder(title, description, email, false, false, (new Date()), (new Date()), mergedDateTime, token)
            if(response) {
                console.log(response)
                setModalVisible(false)
                setRefreshKey(prev => prev + 1)
            }
        } catch (err: any) {
            alert("Creating reminder failed", err.message || "Something went wrong");
        }
    }

    const changeReminderCompletedStatus = async (reminderId: string) => {
        console.log('completed', reminderId)
        try {
            const response = await updateReminderCompleteStatus(reminderId, token)
            if(response.status === 200) {
                console.log('Reminder completed status updated')
                setRefreshKey(prev => prev + 1)
            }
        } catch (err: any) {
            alert("Changing reminder status failed", err.message || "Something went wrong");
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>

            <CreateReminderModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onDone={postReminder}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                displayDate={displayDate}
                displayTime={displayTime}
                showDatePicker={showDatePicker}
                showTimePicker={showTimePicker}
                setShowDatePicker={setShowDatePicker}
                setShowTimePicker={setShowTimePicker}
                remindDate={remindDate}
                setRemindDate={setRemindDate}
                remindTime={remindTime}
                setRemindTime={setRemindTime}
                setDisplayDate={setDisplayDate}
                setDisplayTime={setDisplayTime}
            />


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
                <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                    {reminders.map((reminder) => (
                        <Reminder key={reminder.reminderId} object={reminder} onPress={() => changeReminderCompletedStatus(reminder.reminderId)}/>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.showAllContainer}>
                <Text>Show all</Text>
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
        height: '25%'
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
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '45%'
    },
    showAllContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '5%'
    },

})

export default HomeScreen