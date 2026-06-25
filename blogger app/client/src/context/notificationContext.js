import { createContext, useContext, useReducer } from 'react'

const initialState = { text: null, type: null }

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { text: action.text, type: action.notifType }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, initialState)

  const setNotification = (text, notifType) => {
    dispatch({ type: 'SET_NOTIFICATION', text, notifType })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationReducer = () => useContext(NotificationContext)
