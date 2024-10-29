'use client';
import React, { useEffect, useState } from 'react';
import ProfileImage from '../ProfileImage';
import Link from 'next/link';
import { useAppDispatch,useAppSelector } from '../../hooks/hooks/useAppDispatch';
import { fetchUser } from '../../store/reducers/userSlice';
import EditProfile from '../editProfile/editProfile';


const Profile = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const [name, setName] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>('');
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [userBio, setUserBio] = useState<string>('');

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setName(user.name || '');
                setUserName(user.username || '');
                setProfilePic(user.profilePic || '');
                setUserBio(user.bio || '');
            }
        }
    }, [users]);

    const handleEditProfileOpen = () => {
        setIsEditModalOpen(true);
    };

    const handleEditProfileClose = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className="w-full bg-transparent">
            <EditProfile isOpen={isEditModalOpen} onClose={handleEditProfileClose} />
            
            <h1 className="h-[60px] flex items-center justify-center text-white text-xl bg-transparent z-[1000]">
                Profile
            </h1>

            <div className="bg-[#181818] rounded-2xl h-full">
              
                <div className="flex justify-between items-center h-[140px] w-full p-5">
                    <div className="text-white">
                        <h1 className="text-xl font-semibold">{name}</h1>
                        <span className="text-gray-400 mt-2">{username}</span>
                        <p className="text-gray-300 mt-3">
                            {userBio}  
                        </p>
                    </div>
                    <div className="w-[80px] h-[80px] mr-2.5">
                        <ProfileImage
                            altText="Profile"
                            profilePic={profilePic}
                            className="w-8 h-8  rounded-full"
                        />
                    </div>
                </div>

             
                <div className="bg-[#181818] px-4">
                    
                        <div  className="border border-gray-600 rounded-2xl p-2.5 cursor-pointer hover:bg-gray-100  hover:text-black transition-colors text-center text-white w"
                        onClick={handleEditProfileOpen}>
                        Edit Profile
                        </div>
                </div>

                {/* <div className="flex justify-between items-center p-5">
                    <Link 
                        href={'/main/UserProfile/threads'} 
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        Threads
                    </Link>
                    <Link 
                        href={'/main/UserProfile/reply'}
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        Replies
                    </Link>
                    <Link 
                        href={'/main/UserProfile/repost'}
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        Reposts
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default Profile;