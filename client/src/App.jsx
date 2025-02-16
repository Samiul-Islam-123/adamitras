import React from 'react'
import LandingPage from './views/public/LandingPage'
import RoutesManager from './RoutesManager'
import { UserButton } from '@clerk/clerk-react'

const App = () => {
  return (
    <>
      <div className=' w-full h-fit fixed top-0 left-0 flex items-center justify-between px-5 py-3'>
                <div></div>
                <div></div>
                <div>
                    <UserButton  />
                </div>
      </div>
      {/* <LandingPage /> */}
      <RoutesManager />
    </>
  )
}

export default App