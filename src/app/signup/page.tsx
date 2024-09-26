'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { setUsername, setEmail, setPassword, setConfirmPassword, signupUser, setName, setPhone } from '../../../store/reducers/signupSlice';
import { useRouter } from 'next/navigation';

const Signup: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { name, phone, username, email, password, confirmPassword, status, error } = useSelector((state: RootState) => state.signup);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signupUser({ name, username, email, password, phone }));
    } else {
      console.log('Passwords do not match');
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      router.push('/login');
    }
  }, [status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            className="w-full bg-[#333] text-white placeholder-gray-500 p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            className="w-full bg-[#333] text-white placeholder-gray-500 p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="w-full bg-[#333] text-white placeholder-gray-500 p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => dispatch(setPhone(e.target.value))}
            className="w-full bg-[#333] text-white placeholder-gray-500 p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="w-full bg-[#333] text-white placeholder-gray-500 p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            className="w-full bg-[#333] text-white placeholder-gray-500 p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-500"
          >
            Sign Up
          </button>
        </form>

        {status === 'failed' && <p className="text-red-500 text-center mt-4">Error: {error}</p>}
        
        <p className="text-gray-400 text-center mt-4">
          Already have an account? <a href="/login" className="text-white hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
