import {Routes,Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import CreateProfile from './Components/CreateProfile'
import Login from './Components/Login'
import ForgotPassword from './Components/ForgotPassword'
import CreateProfileStep1 from './Components/CreateProfileStep1'
import CreateProfileStep2 from './Components/CreateProfileStep2'
import CreateProfileStep3 from './Components/CreateProfileStep3'
import Analytics from './Components/Analytics'
import KnowledgeGraph from './Components/KnowledgeGraph'
import Settings from './Components/Settings'
import RevisionPlanner from './Components/RevisionPlanner'
import LearningPath from './Components/LearningPath'
import Resources from './Components/Resources'
import UploadMaterial from './Components/UploadMaterial'
import CreateProfileStep4 from './Components/CreateProfileStep4'
import CreateProfileStep5 from './Components/CreateProfileStep5'
import CreateProfileStep6 from './Components/CreateProfileStep6'
import CreateProfileStep7 from './Components/CreateProfileStep7'
import ProfileComplete from './Components/ProfileComplete'
import StudentDashboard from './Components/StudentDashboard'
import StudyAssistant from './Components/StudyAssistant'
import DignosticQuiz from './Components/DiagnosticQuiz'
import RequireAuth from './Components/RequireAuth'
function App() {


  return (
    <>
   <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<CreateProfile />} />
       <Route path="/login" element={<Login />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<RequireAuth />}>
       <Route path="/create-profile1" element={<CreateProfileStep1/>} />
       <Route path="/create-profile2" element={<CreateProfileStep2/>} />
       <Route path="/create-profile3" element={<CreateProfileStep3/>} />
       <Route path='/create-profile4' element={<CreateProfileStep4/>}/>
       <Route path='/create-profile5' element={<CreateProfileStep5/>}/>
       <Route path='/create-profile6' element={<CreateProfileStep6/>}/>
       <Route path='/create-profile7' element={<CreateProfileStep7/>}/>
       <Route path='/profile-complete' element={<ProfileComplete/>}/>
       <Route path='/dashboard' element={<StudentDashboard/>}/>
       <Route path='/study-assistant' element={<StudyAssistant/>}/>
       <Route path='/diagnostic-quiz' element={<DignosticQuiz/>}/> 

       <Route path='/analytics' element={<Analytics/>}/>
       <Route path='/knowledge-graph' element={<KnowledgeGraph/>}/>
       <Route path='/settings' element={<Settings/>}/>
      <Route path='/revision-planner' element={<RevisionPlanner/>}/>
      <Route path='/learning-path' element={<LearningPath/>}/>
      <Route path='/resources' element={<Resources/>}/>
      <Route path="/upload-material" element={<UploadMaterial />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
