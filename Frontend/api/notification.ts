import api from "./api";

export async function getUserNotifications(email: string, token: string) {
    try {
      const response = await api.get('/NotificationService/GetUserNotifications', {
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
        `Could not fetch user's notifications`
      throw new Error(message)
    }
}