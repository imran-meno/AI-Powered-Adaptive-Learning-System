import {Routes,Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import CreateProfile from './Components/CreateProfile'
import Login from './Components/Login'
import ForgotPassword from './Components/ForgotPassword'
import CreateProfileStep1 from './Components/CreateProfileStep1'
import CreateProfileStep2 from './Components/CreateProfileStep2'
import CreateProfileStep3 from './Components/CreateProfileStep3'
function App() {


  return (
    <>
   <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<CreateProfile />} />
       <Route path="/login" element={<Login />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/create-profile1" element={<CreateProfileStep1/>} />
       <Route path="/create-profile2" element={<CreateProfileStep2/>} />
       <Route path="/create-profile3" element={<CreateProfileStep3/>} />
    </Routes>
    </>
  )
}

export default App
