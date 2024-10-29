import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { setCookie } from '../../serverside/setCookie';
import { loginUser } from '@/app/login/page';
import Link from 'next/link';

const Form = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await loginUser({ username, password });

    if (user && user._id) {  
      const userId = user._id;
      await setCookie(userId);
      
      router.push('/main');
    }
  };

  return (
    <div className="relative p-4 backdrop-blur-lg bg-black bg-opacity-60 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username, Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-lg bg-[#181818] text-white text-sm focus:outline-none mb-2" 
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border  rounded-lg  bg-[#181818] text-white text-sm focus:outline-none mb-2"
        />

        <button
          type="submit"
          className="w-full py-2 bg-white text-black text-sm rounded-lg hover:bg-gray-200 transition duration-300"
        >
          Login
        </button>
      </form>

      <div className="flex items-center justify-center mt-4">
        <div className="w-1/4 h-px bg-gray-400"></div>
        <p className="px-2 text-gray-400 text-sm"><span></span>or</p>
        <div className="w-1/4 h-px bg-gray-400"></div>
      </div>

      <div className="mt-4 text-center">
        <Link href="/signup">
          <button className="w-full py-2 bg-transparent border-2 border-white text-white text-sm rounded-lg hover:bg-white hover:text-black transition duration-300">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Form;



  
