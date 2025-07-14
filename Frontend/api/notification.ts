import api from "./api";

/**
 * Fetches all notifications for a specific user.
 * 
 * @param email - User's email to identify the notifications
 * @param token - Bearer token for authenticating the request
 * @returns Response from the backend containing the user's notifications
 */
export async function getUserNotifications(email: string, token: string) {
  try {
    const response = await api.get('/NotificationService/GetUserNotifications', {
      params: { userEmail: email },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `Could not fetch user's notifications`;
    throw new Error(message);
  }
}

/**
 * Creates a new notification associated with a reminder.
 * 
 * @param reminderId - ID of the reminder the notification is linked to
 * @param title - Title of the notification
 * @param userEmail - Email of the user creating the notification
 * @param description - Description or body content of the notification
 * @param deleted - Boolean indicating if the notification is marked as deleted
 * @param notifyTime - Date and time when the notification should trigger
 * @param token - Bearer token for authenticating the request
 * @returns Response from the backend containing the created notification details
 */
export async function createNotification(
  reminderId: string,
  title: string,
  userEmail: string,
  description: string,
  deleted: boolean,
  notifyTime: Date,
  token: string
) {
  try {
    const response = await api.post(
      '/NotificationService/CreateNotification',
      {
        reminderId,
        title,
        userEmail,
        description,
        deleted,
        notifyTime,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `Could not create notifications`;
    throw new Error(message);
  }
}

/**
 * Deletes a notification based on the associated reminder ID.
 * 
 * @param reminderId - ID of the reminder whose notification should be deleted
 * @param token - Bearer token for authenticating the request
 * @returns Response from the backend confirming deletion
 */
export async function deleteNotification(reminderId: string, token: string) {
  try {
    const response = await api.put('NotificationService/DeleteNotificationByReminderId', {
      reminderId
    }, 
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `Could not create notifications`;
    throw new Error(message);
  }
}

/**
 * Updates an existing notification's details.
 * 
 * @param reminderId - ID of the reminder associated with the notification
 * @param title - Updated title of the notification
 * @param description - Updated description of the notification
 * @param notifyTime - Updated trigger time for the notification
 * @param token - Bearer token for authenticating the request
 * @returns Response from the backend confirming the update
 */
export async function updateNotification(reminderId: string, title: string, description: string, notifyTime: Date, token: string) {
  try {
    const response = await api.put('/NotificationService/UpdateNotification', {
      reminderId, title, description, notifyTime
    }, { headers: { Authorization: `Bearer ${token}` } }
  )
  return response
  }catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `Could not update notifications`;
    throw new Error(message);
  }
}