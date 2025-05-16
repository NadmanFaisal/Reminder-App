import api from "./api"

export async function createReminder(description: string, email: string, completed: boolean, deleted: boolean, createdAt: Date, lastModified: Date, remindAt: Date, token: string) {
    try {
        const response = await api.post('/ReminderService/CreateReminder', {
            description, completed, deleted, createdAt, lastModified, remindAt
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