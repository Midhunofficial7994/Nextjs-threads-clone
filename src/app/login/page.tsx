'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axiosInstance from '../../../axios/axiosInstance';
import Form from '../../../components/Form/Form';



export const loginUser = async (userData: { username: string; password: string }) => {
       
  try {
      const res = await axiosInstance.post('/users/login', userData);
      return res.data;
  } catch (error) {
      console.log(error);
       
  }  
};

const LoginPage:React.FC = ()=>{




  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center items-center">
    
      <div className="absolute inset-x-0 top-0 h-[60vh]"> 
        <Image
          src="/assets/bg.webp" 
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />     
      </div>

    <Form/>

  </div>
  );
};

export default LoginPage;



                  