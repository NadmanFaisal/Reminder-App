import api from "./api";

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