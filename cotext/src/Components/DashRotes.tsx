import React from 'react'
import Sidebar from './Dashbord'
import { Outlet } from 'react-router-dom'

const DashRouter = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default DashRouter
