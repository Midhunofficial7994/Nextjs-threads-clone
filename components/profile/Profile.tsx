'use client';
import React, { useEffect, useState } from 'react';
// import ProfileImage from '@/components/ProfileImage';
import ProfileImage from '../ProfileImage';
import Link from 'next/link';
import { useAppDispatch,useAppSelector } from '../../hooks/hooks/useAppDispatch';
import { fetchUser } from '../../store/reducers/userSlice';
import EditProfile from '../editProfile/editProfile';
// import EditProfile from '../editProfile/editProfile';

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
            
            <h1 className=" flex items-center justify-center text-white text-2xl bg-transparent  z-[1000]">
                Profile
            </h1>

            <div className="bg-[#181818] rounded-2xl w-auto">
                {/* Profile Section */}
                <div className="flex justify-between items-center h-[100px] w-full p-5">
                    <div className="text-white">
                        <h1 className="text-xl font-semibold">{name}</h1>
                        <span className="text-gray-400 mt-2">{username}</span>
                        <p className="text-gray-300 mt-3">
                            {userBio}  
                        </p>
                    </div>
                    <div className="w-[50px] h-[50px] mr-2.5">
                        <ProfileImage
                            altText="Profile"
                            profilePic={profilePic}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* Edit Profile Button */}
                <div className="bg-[#181818] px-4">
                    <div 
                        className="border border-gray-600 rounded-2xl p-2.5 cursor-pointer hover:bg-gray-800 transition-colors text-center text-white"
                        onClick={handleEditProfileOpen}
                    >
                        Edit Profile
                    </div>
                </div>

                {/* Profile Stats */}
                <div className="flex justify-between items-center p-5">
                    <Link 
                        href={'/main/profile'} 
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        Threads
                    </Link>
                    <Link 
                        href={'/main/profile/replies'}
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        Replies
                    </Link>
                    <Link 
                        href={'/main/profile/reposts'}
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        Reposts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;