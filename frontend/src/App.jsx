import React from 'react'
import SignUpform from './Components/pages/SignUpForm'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import User_Data from './Components/pages/User_Data'
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<SignUpform/>
    },
    {
      path:"/user_Data",
      element:<User_Data/>
    }
  ])
  return (
    <>
   <RouterProvider router={router}/>
    </>
  )
}

export default App