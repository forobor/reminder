import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from "../constants"
import {bake_cookie, read_cookie } from 'sfcookies'

let id = 0
const addReminder = (action) => {
    const { text, date } = action
    return {
        text: text,
        date: date,
        id: id++
    }
}

const deleteReminder = (state=[],id) =>{
    return state.filter(reminder => {
        return reminder.id !== id 
    })
}


const reminders = (state = [], action) => {
    let todos = null;
    state = read_cookie('todos')
    switch(action.type){
        case ADD_REMINDER:
            todos = [...state, addReminder(action)]
            bake_cookie('todos', todos)
            return todos
        case DELETE_REMINDER:
            todos = deleteReminder(state, action.id)
            bake_cookie('todos', todos)            
            return todos
        case CLEAR_REMINDERS:
            todos = []
            bake_cookie('todos', todos)            
            return todos            
        default:
            return state
    }
}

export default reminders