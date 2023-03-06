import React from 'react'
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../components/Navbar';

function GuestLayout() {
  return (
    <>  
    <ResponsiveAppBar />  
    <Outlet />
    </>
  )
}

export default GuestLayout;