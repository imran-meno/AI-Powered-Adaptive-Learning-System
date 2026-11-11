import {Routes,Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import CreateProfile from './Components/CreateProfile'
import Login from './Components/Login'
function App() {


  return (
    <>
   <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<CreateProfile />} />
       <Route path="/login" element={<Login />} />
      
    </Routes>
    </>
  )
}

export default App
