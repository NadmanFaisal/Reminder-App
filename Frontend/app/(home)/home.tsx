import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import { View, SafeAreaView, Pressable, StyleSheet, ScrollView, Modal, Image, Platform } from "react-native";
import { router } from 'expo-router';
import { validateMe } from "@/api/auth";
import IntroBox from "@/components/IntroBox";
import AddButton from "@/components/AddButton";
import alert from "../../components/Alert";
import { CreateReminderModal } from "@/components/CreateReminderModalView";
import { Reminder } from "@/components/Reminders";
import { createReminder, getUserReminders, updateReminderCompleteStatus, getReminder, updateReminder, deleteReminder } from "@/api/reminder";
import { getUserNotifications, createNotification, deleteNotification, updateNotification } from "@/api/notification";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from "expo-constants";

import ShowAllButton from "@/components/ShowAllButton";
import DoneCancelButton from "@/components/DoneCancelButton";
import NoReminderImage from "../../assets/images/no-reminders.png"
import SettingsImage from "../../assets/images/settings-icon.svg"

// To avoid errors when passing reminderId as keys to a map
type ReminderObject = {
    reminderId: string;
    title: string;
    description: string;
    completed?: boolean;
};

// To avoid errors when passing as keys to a map
type NotificationObject = {
    notificationId: string;
    title: string;
    description: string;
    notifyTime: Date;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const HomeScreen = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    // const [reminders, setReminders] = useState<ReminderObject[]>([])
    const [completedReminders, setCompletedReminders] = useState<ReminderObject[]>([]);
    const [incompletedReminders, setIncompletedReminders] = useState<ReminderObject[]>([]);

    const [token, setToken] = useState('')
    
    const [createReminderModalVisible, setCreateReminderModalVisible] = useState(false)
    const [showAllModalVisible, setShowAllModalVisible] = useState(false)

    const [selectedReminderId, setSelectedReminderId] = useState('')

    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );
    const notificationListener = useRef<Notifications.EventSubscription | null>(null);
    const responseListener = useRef<Notifications.EventSubscription | null>(null);

    /**
     * Set of notifications that has alreadt been scheduled. 
     * It is a 'Set' data structured as sets store only unique 
     * elements.
     */
    const triggeredNotifications = useRef<Set<string>>(new Set());
    
    const [currentDate, setCurrentDate] = useState('');

    /** 
     * List of the specific user's notification, 
     * fetched from the backend.
    */ 
    const [userNotifications, setUserNotifications] = useState<NotificationObject[]>([])

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

    /**
     * This useEffect is responsible for creating a list of 
     * scheduled notifications, given a list of notification 
     * called 'userNotifications'. This use effect takes 
     * place when the component mounts, whenever there is a 
     * change/update in userNotifications.
     */
    useEffect(() => {

        console.log('Use effect triggered')

        // For each notification in user notifications, 
        userNotifications.forEach((notification) => {

            /** 
             * If a notification with a specific noti ID is not 
             * present in the triggeredNotificatinos set, then 
             * the notification ID is added to the set of 
             * triggeredNotifications, and a push noti is scheduled.
            */
            if(!triggeredNotifications.current.has(notification.notificationId)) {
                triggeredNotifications.current.add(notification.notificationId);
                schedulePushNotification(notification.title, notification.description, notification.notifyTime)
                console.log('notif set')
            }
        })
        
    }, [userNotifications])

    /**
     * This useEffect is responsible for registering notifications 
     * as push notifications. This use effect takes place only once, 
     * when the component mounts. 
     */
    useEffect(() => {

        // Request permission and retrieve Expo push token
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        // For Android: fetch existing notification channels
        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }

        /** Listen for incoming notifications while the app is 
         * in the foreground.
         */ 
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        /**
         * Listen for user's interaction with a notification 
         * (tap, dismiss, etc.)
         */
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        // Cleanup listeners when the component unmounts
        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        }, 
    []);

    /**
     * Schedules a push notification to be delivered at a specific 
     * time
     * @param notiTitle Title of the notification
     * @param description Description of the notification
     * @param notifyTime Date and time for when the notification is to be triggered
     */
    async function schedulePushNotification(notiTitle: string, description: string, notifyTime: Date) {
      await Notifications.scheduleNotificationAsync({

        // Content of the notification
        content: {
          title: notiTitle,
          body: description,
          data: { data: 'goes here', test: { test1: 'more data' } },
        },

        /**When to trigget the notification, and the 
         * trigger type
         */
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: new Date(notifyTime),
        },
      });
    }
      
    /**
     * Register the device for push notifications and 
     * retrieves  the Expo push token.
     * 
     * In android, it sets up a notification channel, 
     * which is required for push permissions to work properly.
     * 
     * In pyysical devices, it requests for notification permissions, 
     * and retrieves the Expo push token.
     * @returns Expo push token as string, or error if registration fails
     */
    async function registerForPushNotificationsAsync() {
        let token;

        // Setup android notification channel
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('myNotificationChannel', {
                name: 'A channel is needed for the permissions prompt to appear',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        // Notification works only in physical devices and not simulators
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }

            try {
                const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
                if (!projectId) {
                    throw new Error('Project ID not found');
                }
                token = (
                    await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(token);
            }
            catch (e) {
                token = `${e}`;
            }
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
    }  

    /**
     * The useEffect is responsible for retrieving the token 
     * from the asyncStorage, and validating it with the backend 
     * to ensure the correct session of the user, and redirecting 
     * the user to the required screens. 
     * 
     * The use effect takes place once only when the component 
     * mounts.
     */
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

    /**
     * This useEffect is responsible for fetching the 
     * current user's reminders, and sorting them according 
     * to their completed status. 
     * 
     * This useEffect takes place only whenever there is a change 
     * in the valus of the following- email, token, and refreshkey
     * when the component mounts.
     */
    useEffect(() => {
        const fetchUserReminders = async () => {

            /** 
             * If there is no email or token, then this 
             * method does not take place
             */
            if (!email || !token) return
            try {
                console.log(email)
                const response = await getUserReminders(email, token)
                if(response.data) {
                    const sortedReminders = response.data.sort(
                        (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    );
    
                    /**
                     * Filters the reminders according to their completed 
                     * status.
                     */
                    const completed = sortedReminders.filter((r: any) => r.completed === true);
                    const incompleted = sortedReminders.filter((r: any) => !r.completed);

                    setCompletedReminders(completed)
                    setIncompletedReminders(incompleted)
                    console.log(`User's reminders received:`, response.data)
                }
            } catch (err: any) {
                console.log('Reminders could not be fetched:', err.message)
            }
        }
        fetchUserReminders()
    }, [email, token, refreshKey])

    /**
     * This useEffect is responsible for fetching the user's 
     * notifications from the backend using the user's email, 
     * and token. 
     * 
     * This method takes place when there is change in value of
     * email, token, and refreshKey.
     */
    useEffect(() => {
        const fetchUserNotifications = async () => {
            if (!email || !token) return
            try {
                console.log(email)
                const response = await getUserNotifications(email, token)
                if(response.data) {
                    setUserNotifications(response.data)
                    console.log('Notifications received: ', response.data)
                }
            } catch (err: any) {
                console.log('Notifications could not be fetched:', err.message)
            }
        }
        fetchUserNotifications()
    }, [email, token, refreshKey])

    const resetReminderModalFields = () => {
        setSelectedReminderId('')
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

            const reminderResponse = await createReminder(title, description, email, false, false, (new Date()), (new Date()), mergedDateTime, token)
            if(!reminderResponse) {
                alert("Creating reminder failed");
                return
            }

            const notificationResponse = await createNotification(reminderResponse.data.reminderId, reminderResponse.data.title, reminderResponse.data.userEmail, reminderResponse.data.description, false, reminderResponse.data.remindAt, token)
            
            if (!notificationResponse) {
                alert("Reminder created, but notification failed. Delete reminder and try again");
                return;
            }

            setCreateReminderModalVisible(false);
            resetReminderModalFields();
            setRefreshKey((prev) => prev + 1);
        } catch (err: any) {
            alert("Creating reminder failed", err.message || "Something went wrong");
        }
    }

    const changeReminderCompletedStatus = async (reminderId: string) => {
        try {
            const response = await updateReminderCompleteStatus(reminderId, token)
            if(response.status !== 200) {
                alert("Changing reminder status failed")
                return
            }
            const notificationResponse = await deleteNotification(reminderId, token)
            
            if(notificationResponse.status !== 200) {
                alert('Notification status changing failed')
                return
            }

            console.log('Reminder completed status updated')
            setRefreshKey(prev => prev + 1)
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
                
                setSelectedReminderId(data.reminderId)
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
    
        console.log("Fields have changed. Patch time.");

        try {
            await Notifications.cancelAllScheduledNotificationsAsync()
            triggeredNotifications.current.clear()

            const response = await updateReminder(selectedReminderId, title, description, mergedCurrentRemindAt, token)
            if(response.status === 200) {
                console.log('Reminder updated successfully!')

                const response2 = await updateNotification(selectedReminderId, title, description, mergedCurrentRemindAt, token)
                if(response2) {
                    if (email && token) {
                        const notiResponse = await getUserNotifications(email, token);
                        if (notiResponse.data) {
                            setUserNotifications([...notiResponse.data]);
                            console.log('Notifications refreshed after patch.');
                        }
                    }
                }

                setRefreshKey(prev => prev + 1);
            }
        } catch (err: any) {
            alert("Updating reminder", err.message || "Something went wrong");
        }
        
        resetReminderModalFields();
        setViewReminderModalVisible(false);
    };

    const deleteCurrentReminder = async (reminderId: string) => {
        try {
            console.log('delete pressed', reminderId)
            const response = await deleteReminder(reminderId, token)
            if(response.status !== 200) {
                alert("Deleting reminder failed")
                return
            }
            const notificationResponse = await deleteNotification(reminderId, token)

            if(notificationResponse.status !== 200) {
                alert("Deleting notification failed")
                return
            }

            console.log('Reminder deleted.')
            setRefreshKey(prev => prev + 1)
        } catch (err: any) {
            alert("Deleting reminder failed", err.message || "Something went wrong");
        }
    }

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
                                            onDelete={() => deleteCurrentReminder(reminder.reminderId)}
                                        />
                                    ))
                                )}
                            </ScrollView>
                        </View>

                    </View>
                </View>
            </Modal>

            <View style={styles.introContainer}>
                <View style={styles.leftIntroContainer}>

                </View>
                <View style={styles.middleIntroContainer}>
                    <IntroBox text={`Welcome, ${username}`} width={'100%'}/>
                </View>
                <View style={styles.rightIntroContainer}>
                    <Pressable style={styles.settingsContainer} onPress={() => { console.log('Settings pressed'); router.push('/(settings)/settings') } }>
                        <SettingsImage width={'50%'} height={'50%'} />
                    </Pressable>
                </View>
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
                                onDelete={() => deleteCurrentReminder(reminder.reminderId)}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
    },
    leftIntroContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '15%'
    },
    middleIntroContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        width: '70%'
    },
    rightIntroContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '15%'
    },
    settingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        width: '100%'
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