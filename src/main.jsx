import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TasksProvider } from './Context/TasksContext.jsx'
import { SearchProvider } from './Context/SearchContext.jsx'
import { NotificationProvider } from './Context/NotificationContext.jsx'
import App from './App.jsx'
import "./index.css"
import { Provider } from 'react-redux'
import { store } from './store/index.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<BrowserRouter>
    <TasksProvider>
      <SearchProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </SearchProvider>
    </TasksProvider>
  </BrowserRouter>
  </Provider>
)
