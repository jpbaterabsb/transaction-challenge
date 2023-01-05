import { Router } from './router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App (): React.ReactElement {
  return (<>
  <Router/>
  <ToastContainer />
  </>)
}

export default App
