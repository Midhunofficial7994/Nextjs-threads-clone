import React from 'react';
import Navbar from '../../../components/sidebar/Navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center h-auto static bg-black">
      <div className="absolute left-0 top-0 h-full flex items-center">
        <Navbar />
      </div>
      {/* <div className="w-[640px] h-screen bg-white ext-center rounded-lg"> */}
        {children}               
      {/* </div> */}
    </div>
  );
}

export default Layout;
