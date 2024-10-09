'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks/useAppDispatch';
import { fetchUser } from '../../../store/reducers/userSlice';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();   
  const router = useRouter();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = users.find((user) => user.username === username);
    if (user) {
      localStorage.setItem('userId', user._id);
      router.push('/main');
    } else {
      router.push('/signup');                 
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-x-0 top-0 h-[60vh]"> {/* Adjusted height to make image smaller */}
        <Image
          src="/assets/bg.webp" // Ensure this path is correct
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />     
      </div>

      {/* Login Form */}
      <div className="relative w-full max-w-xs p-4 backdrop-blur-lg bg-black bg-opacity-60 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username, Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-1.5 border border-gray-600 rounded-lg bg-gray-800 text-white text-sm focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}

            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-1.5 border border-gray-800 rounded-lg bg-gray-800 text-white text-sm focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-1.5 bg-white text-black text-sm rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center mt-4">
          <div className="w-1/4 h-px bg-gray-400"></div>
          <p className="px-2 text-gray-400 text-sm">or</p>
          <div className="w-1/4 h-px bg-gray-400"></div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-2 text-center">
          <Link href="/signup">
            <button className="w-full py-1.5 bg-transparent border-2 border-white text-white text-sm rounded-lg hover:bg-white hover:text-black transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
