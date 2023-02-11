import React from 'react'
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>Welcome { user?.name} to home page</div>
  )
}

export default Home;