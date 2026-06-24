import { Alert } from '@mui/material'
import { useNotification } from '../store/notificationStore'

const AppNotification = () => {
  const { text, type } = useNotification()
  if (text === null) {
    return null
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}>
      {text}
    </Alert>
  )
}

export default AppNotification
