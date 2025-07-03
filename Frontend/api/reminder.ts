import api from "./api"

/**
 * Create reminder using HTTP requests to the backend.
 * @param title Title of the reminder
 * @param description Description of the reminder
 * @param userEmail User's email for whom the reminder is to be created
 * @param completed Boolean indicating whether the reminder will remain 
 * as completed/incompleted in the backend
 * @param deleted Boolean indicating whether the reminder will remain 
 * as deleted or not in the backend
 * @param createdAt Time of creation of the reminder
 * @param lastModified Latest date when the reminder was modified
 * @param remindAt Date and time when the reminder is to be triggered
 * @param token Token for authenticating the user
 * @returns Response object from the backend
 */
export async function createReminder(title: string, description: string, userEmail: string, completed: boolean, deleted: boolean, createdAt: Date, lastModified: Date, remindAt: Date, token: string) {
  try {
    const response = await api.post('/ReminderService/CreateReminder', {
      title, description, userEmail, completed, deleted, createdAt, lastModified, remindAt
    }, { headers: { 'Authorization': `Bearer ${token}` } }
  )
  return response
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Reminder creation failed due to an unknown error.';
    throw new Error(message);
  }
}

/**
 * Fetch the user's reminders from the backend
 * @param email Email of the specific user to get the specific reminders
 * @param token Token for authenticating the user
 * @returns Response object from the backend
 */
export async function getUserReminders(email: string, token: string) {
  try {
    const response = await api.get('/ReminderService/GetUserReminders', {
      params: {
        userEmail: email,
      },
      headers: { 'Authorization': `Bearer ${token}` }
    },
  )
    return response
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `Could not fetch user's reminders`
    throw new Error(message)
  }
}

/**
 * Fetches a particular reminder from the backend
 * @param reminderId The particular reminder's unique ID
 * @param token Token for authenticating the user
 * @returns Response object from the backend
 */
export async function getReminder(reminderId: string, token: string) {
  try {
    const response = await api.get('/ReminderService/GetReminder', {
      params: {
        reminderId: reminderId
      },
      headers: { 'Authorization': `Bearer ${token}` }
    }
  )
    return response
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `Could not get reminder.`
    throw new Error(message)
  }
}

/**
 * Patch the reminder's completed status to true/false
 * @param reminderId The particular reminder's unique ID
 * @param token Token for authenticating the user
 * @returns Response object from the backend
 */
export async function updateReminderCompleteStatus(reminderId: string, token: string) {
  try {
    const response = await api.patch('/ReminderService/UpdateCompleteStatus', {
      reminderId,
    },
    { headers: { 'Authorization': `Bearer ${token}` } }
  )
    return response
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `Could not update reminder complete status`
    throw new Error(message)
  }
}

/**
 * Update the fields of the reminder in the backend
 * @param reminderId Unique ID of the reminder to be updated
 * @param title Title of the reminder
 * @param description Description of the reminder
 * @param remindAt Date and time for triggering the reminder
 * @param token Token for authorizing the user
 * @returns Response object from the backend
 */
export async function updateReminder(reminderId: string, title: string, description: string, remindAt: Date, token: string) {
  try {
    const response = await api.patch('ReminderService/UpdateReminder', {
      reminderId, title, description, remindAt
    },
    { headers: { 'Authorization': `Bearer ${token}` }
  })
  return response
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `Could not update reminder.`
    throw new Error(message)
  }
}

/**
 * Delete the reminder from the backend
 * @param reminderId The particular reminder's unique ID
 * @param token Token for authorizing the user
 * @returns Response object from the backend
 */
export async function deleteReminder(reminderId: string, token: string) {
  try {
    const response = await api.patch('/ReminderService/ChangeReminderDeleteStatus', {
      reminderId,
    },
    { headers: { 'Authorization': `Bearer ${token}` } }
  )
    return response
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `Could not delete reminder`
    throw new Error(message)
  }
}