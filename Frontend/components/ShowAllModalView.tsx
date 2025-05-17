// components/ReminderModal.tsx

import React from 'react'
import { Modal, View, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import DoneCancelButton from './DoneCancelButton'
import { Reminder } from "@/components/Reminders";

type ShowAllModalProps = {
    objects: {
        reminderId: string;
        title: string;
        description: string;
        completed?: boolean,
    }[],
    token: string;
    visible?: boolean;
    onClose: () => void;
    onDone?: () => void;
};
  

export const ShowAllModalView = (props: ShowAllModalProps) => {
  return (
    
  )
}

const styles = StyleSheet.create({
    
})

