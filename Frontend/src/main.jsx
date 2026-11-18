import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import App_State from './context/App_State.jsx'

createRoot(document.getElementById('root')).render(
  <App_State>
    <App />
  </App_State>,
)
