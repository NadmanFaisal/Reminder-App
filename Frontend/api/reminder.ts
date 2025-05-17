import api from "./api"

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