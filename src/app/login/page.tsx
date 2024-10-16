'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks/useAppDispatch';
import { loginUser } from '../../../store/reducers/userSlice';
import InputField from '../../../components/Inputs/InputField';


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, status, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (status === 'succeeded' && user) {
        const userId = user._id;
      
        localStorage.setItem('userId', userId);
        router.push('/main');
    }   
}, [status, user, router]);
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    dispatch(loginUser({username,password}));
  };


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

       
        <div className="flex items-center justify-center mt-4">
          <div className="w-1/4 h-px bg-gray-400"></div>
          <p className="px-2 text-gray-400 text-sm">or</p>
          <div className="w-1/4 h-px bg-gray-400"></div>
        </div>

       
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



// 'use client';
// import React, { useState, useEffect } from 'react';
// import styles from '../../ui/login/LoginPage.module.scss';
// import Image from 'next/image';
// import bgPhoto from '../../public/assets/bg.webp';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch,useAppSelector } from '../../../hooks/hooks/useAppDispatch';
// import { loginUser } from '../../../store/reducers/userSlice';
// import InputField from '../../../components/Inputs/InputField';
// const LoginPage: React.FC = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const dispatch = useAppDispatch();
//     const router = useRouter();
//     const { user, status, error } = useAppSelector((state) => state.users);

//     useEffect(() => {
//         if (status === 'succeeded' && user) {
//             const userId = user;
           
//             localStorage.setItem('userId', userId);
//             router.push('/main');
//         }                 
//     }, [status, user, router]);

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         dispatch(loginUser({ username, password }));
        
//     };

//     return (
//         <>
//             <div className={styles.container}>
//                 <div className={styles.bgPhoto}>
//                     <Image
//                         src={bgPhoto}
//                         alt="Background Image"
//                         width={2000}
//                     />
//                 </div>
//             </div>
//             <div className={styles['login-container']}>
//                 <form onSubmit={handleSubmit} className={styles['login-form']}>
//                     <InputField
//                         type="text"
//                         placeholder="Username, Email"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <InputField
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button type="submit">Login</button>
//                 </form>
//                 {error && <p className={styles.errorMessage}>{error}</p>}
//                 <div className={styles.line}>
//                     <div className={styles.line1}></div>
//                     <p>or</p>
//                     <div className={styles.line2}></div>
//                 </div>
//                 <div className={styles.signUpContainer}>
//                     <Link href="/signup">
//                         <button className={styles.signUpButton}>Sign Up</button>
//                     </Link>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default LoginPage;