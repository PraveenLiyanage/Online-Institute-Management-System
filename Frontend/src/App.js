import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import FeedbackHome from './pages/FeedbackHome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import AppointmentHome from './pages/AppointmentHome'
import Mainhome from './pages/MainHome'
import Footer from './components/Footer'
import NoticeHome from './pages/NoticeHome'
import AdminFeedbackHome from './pages/AdminFeedbackHome'
import AdminAppointmentHome from './pages/AdminAppointmentHome'
import AdminMainhome from './pages/Adminmainhome'
import TimetableHome from './pages/TimetableHome'
import StudentNoticeHome from './pages/StudentNoticeHome'
import Studenttimetable from './pages/Studenttimetable'
import TicketShow from './pages/TicketShow';
import Home from './pages/ModuleHome'
import Moduleview  from './pages/ModuleView'
function App() {
  
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Mainhome /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/FeedbackHome" 
              element={user ? <FeedbackHome /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/AppointmentHome" 
              element={user ? <AppointmentHome /> : <Navigate to="/login" />} 
            />
            
             <Route 
              path="/MainHome" 
              element={<Mainhome />} 
            />
            <Route
              path="/NoticeHome" 
              element={<NoticeHome />}
              />

            <Route
              path="/AdminFeedbackHome"
              element={<AdminFeedbackHome />}
            />

            <Route
              path="/AdminAppointmentHome"
              element={<AdminAppointmentHome />}
            />

            <Route
              path="/Adminmainhome"
              element={<AdminMainhome />}
            />
            <Route
              path="/TimetableHome" 
              element={<TimetableHome />}
            />
            <Route
              path="/StudentNoticeHome" 
              element={<StudentNoticeHome />}
            />
             <Route
              path="/Studenttimetable" 
              element={<Studenttimetable />}
            />
            
            <Route
            path="/TicketShow"
            element={ <TicketShow />}

          />
          <Route
              path = "/ModuleHome"
              element = {<Home />}
            />
             
           
            <Route
              path = "/ModuleView"
              element = {<Moduleview />}
            />
          
          
       </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
