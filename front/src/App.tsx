import { Router } from './routes/router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'

function App (): React.ReactElement {
  return (<>
    <RecoilRoot>
      <Router />
      <ToastContainer />
    </RecoilRoot>
  </>)
}

export default App
