import React from 'react'
import { useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import AllDoctors from './pages/AllDoctors'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import DoctorInfo from './components/DoctorInfo'
import BookAppointment from './components/BookAppointment'
import MyAppointments from './pages/MyAppointments'
import Completed from "./components/Completed"
import InCompleteAppointmetns from './components/IncompleteAppointments' 
import DoctorSignup from './pages/DoctorSignup'
import DoctorLogin from './pages/DoctorLogin'



const appRouter = createBrowserRouter([
  {
    path:'/',element:<Home/>
},{
  path:'/about',element:<About/>
},{
  path:'/contact',element:<Contact/>
},{
  path:'/alldoctors',element:<AllDoctors/>
},{
  path:'/login',element:<Login/>
},{
  path:'/signup',element:<Signup/>
},
{
  path:'/doctorsignup',element:<DoctorSignup/>
},{
  path:'/doctorlogin',element:<DoctorLogin/>
},{
  path:'/doctorinfo',element:<DoctorInfo/>
},{
  path:'/bookappointment',element:<BookAppointment/>
},{
  path:'/myappointments',element:<MyAppointments/>
},{
  path:'/completedappointments',element:<Completed/>
},{
  path:'/incompletedappointments',element:<InCompleteAppointmetns/>
}
]);


const App = () => {
  
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App