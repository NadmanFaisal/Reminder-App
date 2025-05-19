import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet, ScrollView, Modal, Image } from "react-native";
import { router } from 'expo-router';
import { validateMe } from "@/api/auth";
import IntroBox from "@/components/IntroBox";
import AddButton from "@/components/AddButton";
import alert from "../../components/Alert";
import { CreateReminderModal } from "@/components/CreateReminderModalView";
import { Reminder } from "@/components/Reminders";
import { createReminder, getUserReminders, updateReminderCompleteStatus, getReminder, updateReminder } from "@/api/reminder";
import ShowAllButton from "@/components/ShowAllButton";
import DoneCancelButton from "@/components/DoneCancelButton";
import NoReminderImage from "../../assets/images/no-reminders.png"

// To avoid errors when passing reminderId as keys to a map
type ReminderObject = {
    reminderId: string;
    title: string;
    description: string;
    completed?: boolean;
};

const HomeScreen = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [reminders, setReminders] = useState<ReminderObject[]>([])
    const [completedReminders, setCompletedReminders] = useState<ReminderObject[]>([]);
    const [incompletedReminders, setIncompletedReminders] = useState<ReminderObject[]>([]);

    const [token, setToken] = useState('')
    
    const [createReminderModalVisible, setCreateReminderModalVisible] = useState(false)
    const [showAllModalVisible, setShowAllModalVisible] = useState(false)

    const [reminderId, setReminderId] = useState('')

    // ========== VARIABLES TO KEEP TRACK OF CHANGES ==========

    const [originalTitle, setOriginalTitle] = useState('')
    const [originalDescription, setOriginalDescription] = useState('')

    const [originalRemindDate, setoriginalRemindDate] = useState(new Date())
    const [originalRemindTime, setoriginalRemindTime] = useState(new Date())

    // ========================================================

    const [viewReminderModalVisible, setViewReminderModalVisible] = useState(false)
    
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
            if (!email || !token) return
            try {
                console.log(email)
                const response = await getUserReminders(email, token)
                if(response.data) {
                    const sortedReminders = response.data.sort(
                        (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    );
    
                    const completed = sortedReminders.filter((r: any) => r.completed === true);
                    const incompleted = sortedReminders.filter((r: any) => !r.completed);

                    setCompletedReminders(completed)
                    setIncompletedReminders(incompleted)
                    setReminders(sortedReminders)
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

    const resetReminderModalFields = () => {
        setReminderId('')
        setTitle('')
        setDescription('')
        setDisplayDate(new Date())
        setDisplayTime(new Date())
        setRemindDate(new Date())
        setRemindTime(new Date())

        // ========== VARIABLES TO KEEP TRACK OF CHANGES ==========

        setOriginalTitle('');
        setOriginalDescription('');
        setoriginalRemindDate(new Date());
        setoriginalRemindTime(new Date());

        // ========================================================
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
                setViewReminderModalVisible(false)
                resetReminderModalFields()
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
    }

    const fetchReminder = async (reminderId: string) => {
        console.log('get reminder pressed')
        try {
            const response = await getReminder(reminderId, token)
            if(response.status === 200) {
                const data = response.data;
                const reminderDate = new Date(data.remindAt);
                
                setReminderId(data.reminderId)
                setTitle(data.title);
                setDescription(data.description);
                setRemindDate(reminderDate);
                setRemindTime(reminderDate);
                setDisplayDate(reminderDate);
                setDisplayTime(reminderDate);

                setOriginalTitle(data.title)
                setOriginalDescription(data.description)
                setoriginalRemindDate(reminderDate)
                setoriginalRemindTime(reminderDate)

                setViewReminderModalVisible(true);
            }
        } catch (err: any) {
            alert("Getting reminder failed", err.message || "Something went wrong");
        }
    }

    const patchReminder = async () => {
        const mergedCurrentRemindAt = new Date(remindDate);
        mergedCurrentRemindAt.setHours(remindTime.getHours());
        mergedCurrentRemindAt.setMinutes(remindTime.getMinutes());
        mergedCurrentRemindAt.setSeconds(0);
        mergedCurrentRemindAt.setMilliseconds(0);
    
        const mergedOriginalRemindAt = new Date(originalRemindDate);
        mergedOriginalRemindAt.setHours(originalRemindTime.getHours());
        mergedOriginalRemindAt.setMinutes(originalRemindTime.getMinutes());
        mergedOriginalRemindAt.setSeconds(0);
        mergedOriginalRemindAt.setMilliseconds(0);
    
        const hasChanged = title !== originalTitle || description !== originalDescription || mergedCurrentRemindAt.getTime() !== mergedOriginalRemindAt.getTime();
    
        if (!hasChanged) {
            alert("No changes made to this reminder.");
            setViewReminderModalVisible(false)
            return;
        }
    
        console.log("Fields have changed. Patchine.");

        try {
            const response = await updateReminder(reminderId, title, description, mergedCurrentRemindAt, token)
            if(response.status === 200) {
                console.log('Patched successfully!')
                setRefreshKey(prev => prev + 1);
            }
        } catch (err: any) {
            alert("Updating reminder", err.message || "Something went wrong");
        }
        
        resetReminderModalFields();
        setViewReminderModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>

            <CreateReminderModal
                visible={createReminderModalVisible}
                onClose={() => {setCreateReminderModalVisible(false); resetReminderModalFields()}}
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

            <CreateReminderModal
                visible={viewReminderModalVisible}
                onClose={() => {setViewReminderModalVisible(false); resetReminderModalFields()}}
                onDone={patchReminder}
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

            <Modal animationType="slide" transparent visible={showAllModalVisible} onRequestClose={() => setShowAllModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={styles.modalButtonContainer}>
                            <DoneCancelButton text="Done" onPress={() => setShowAllModalVisible(false)} />
                        </View>

                        <View style={styles.modalReminderContainer}>
                            <ScrollView style={{ flex: 1 }}>
                                {completedReminders.length === 0 ? (
                                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
                                        <Image
                                            source={NoReminderImage}
                                            style={{ width: 200, height: 200, resizeMode: 'contain' }}
                                        />
                                    </View>
                                ) : (
                                    completedReminders.map((reminder) => (
                                        <Reminder
                                            key={reminder.reminderId}
                                            object={reminder}
                                            onPress={() => changeReminderCompletedStatus(reminder.reminderId)}
                                        />
                                    ))
                                )}
                            </ScrollView>
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
                    <AddButton onPress={() => setCreateReminderModalVisible(true)}/>
                </View>
            </View>

            <View style={styles.reminderContainer}>
                <ScrollView style={{ flex: 1 }}>
                    {incompletedReminders.length === 0 ? (
                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
                            <Image
                                source={NoReminderImage}
                                style={{ width: 200, height: 200, resizeMode: 'contain' }}
                            />
                        </View>
                    ) : (
                        incompletedReminders.map((reminder) => (
                            <Reminder
                                key={reminder.reminderId}
                                object={reminder}
                                onPress={() => changeReminderCompletedStatus(reminder.reminderId)}
                                onTextBoxPress={() => fetchReminder(reminder.reminderId)}
                                onDelete={() => console.log('Deleted')}
                            />
                        ))
                    )}
                </ScrollView>
            </View>


            <View style={styles.showAllContainer}>
                <ShowAllButton width={'20%'} onPress={() => setShowAllModalVisible(true)} />
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
        paddingRight: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '5%'
    },

    // ==========================================================

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
        justifyContent: 'flex-end',
    },
    modalReminderContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '90%',
        width: '100%'
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