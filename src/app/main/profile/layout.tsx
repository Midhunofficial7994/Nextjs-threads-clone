import Profile from '../../../../components/profile/Profile'
import React from 'react'


function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
      <Profile/>
      </div>
      <div className='top-0'>
     
      </div>
      <div className="mt-16"> 
        
        {children}
      </div>
    </div>
  )
}

export default Layout