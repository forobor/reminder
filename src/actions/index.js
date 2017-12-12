import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from "../constants"

export const addReminder = (text, date) => {
    return {
        type: ADD_REMINDER,
        text,
        date
    }
}

export const deleteReminder = id => {
    return {
        type: DELETE_REMINDER,
        id
    }
}

export const clearReminders = () => {
    return {
        type: CLEAR_REMINDERS,
    }
}