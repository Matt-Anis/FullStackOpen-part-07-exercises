import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary
    fallback={
      <div>
        <h2>Something went wrong :(</h2>
        <span>please report bug</span>
      </div>
    }
  >
    <Router>
      <App />
    </Router>
  </ErrorBoundary>,
)
