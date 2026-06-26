import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
// import { NotificationProvider } from './context/notificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './context/userContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary
    fallback={
      <div>
        <h2>Something went wrong :(</h2>
        <span>please report bug</span>
      </div>
    }
  >
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        {/* <NotificationProvider>*/}{' '}
        <Router>
          <App />
        </Router>
        {/* </NotificationProvider>*/}
      </UserContextProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
)
