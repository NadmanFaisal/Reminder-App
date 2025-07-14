/**
 * A Modal view component, which is used as a 
 * screen to take inputs for details for anything 
 * related to a reminder. This modal view is used 
 * as a screen to create new reminders, or to 
 * patch existing reminders. 
 */

import React from 'react'
import { Modal, View, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { BoxedInputField, DateInputField, TimeinputField } from './InputField'
import DoneCancelButton from './DoneCancelButton'
import DateTimePicker from '@react-native-community/datetimepicker'

type CreateReminderProps = {
  visible?: boolean;
  onClose: () => void;
  onDone?: () => void;
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  displayDate: Date;
  displayTime: Date;
  showDatePicker: boolean;
  showTimePicker: boolean;
  setShowDatePicker: (val: boolean) => void;
  setShowTimePicker: (val: boolean) => void;
  remindDate: Date;
  setRemindDate: (val: Date) => void;
  remindTime: Date;
  setRemindTime: (val: Date) => void;
  setDisplayDate: (val: Date) => void;
  setDisplayTime: (val: Date) => void;
  };
  

export const CreateReminderModal = (props: CreateReminderProps) => {
  return (
    <Modal animationType="slide" transparent visible={props.visible} onRequestClose={props.onClose}>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); props.onClose(); }}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalView}>
              <View style={styles.modalButtonContainer}>
                <DoneCancelButton text="Cancel" onPress={props.onClose} />
                <DoneCancelButton text="Done" onPress={props.onDone} />
              </View>

              <View style={styles.titleContainer}>
                <BoxedInputField type="Title" value={props.title} onChangeValue={props.setTitle} securedTextEntry={false} />
              </View>

              <View style={styles.descriptionContainer}>
                <BoxedInputField type="Description" value={props.description} onChangeValue={props.setDescription} securedTextEntry={false} height={100} textAlignVertical="top" multiline />
              </View>

              <View style={styles.dateAndTimeContainer}>
                <DateInputField type="Date" onPress={() => { props.setShowDatePicker(true); props.setShowTimePicker(false); }} value={props.displayDate.toISOString().split('T')[0]} securedTextEntry={false} width={120} />
                <TimeinputField type="Time" onPress={() => { props.setShowTimePicker(true); props.setShowDatePicker(false); }} value={props.displayTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} securedTextEntry={false} width={120} />
              </View>

              <View style={styles.dateTimePickerContainer}>
                {props.showDatePicker && (
                  <DateTimePicker
                    value={props.remindDate}
                    mode="date"
                    display="spinner"
                    themeVariant='light'
                    onChange={(event, date) => {
                        props.setShowDatePicker(false)
                      if (date) {
                        props.setRemindDate(date)
                        props.setDisplayDate(date)
                      }
                    }}
                  />
                )}
                {props.showTimePicker && (
                  <DateTimePicker
                    value={props.remindTime}
                    mode="time"
                    display="spinner"
                    themeVariant='light'
                    onChange={(event, time) => {
                        props.setShowTimePicker(false)
                      if (time) {
                        const updated = new Date(props.remindDate)
                        updated.setHours(time.getHours())
                        updated.setMinutes(time.getMinutes())
                        updated.setSeconds(0)
                        updated.setMilliseconds(0)
                        props.setRemindTime(updated)
                        props.setDisplayTime(updated)
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
  )
}

const styles = StyleSheet.create({
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

