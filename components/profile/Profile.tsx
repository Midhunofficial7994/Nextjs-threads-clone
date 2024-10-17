'use client';
import React, { useEffect, useState } from 'react';
import ProfileImage from '../ProfileImage';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks/useAppDispatch';
import { fetchUser } from '../../store/reducers/userSlice';
import EditProfile from '../editProfile/editProfile';

const Profile = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);

    const [name, setName] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>('');
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

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

    const handleEditProfileOpen = () => setIsEditModalOpen(true);
    const handleEditProfileClose = () => setIsEditModalOpen(false);

    return (
        <div className="bg-black min-h-screen flex flex-col items-center p-8 text-white">
            <EditProfile isOpen={isEditModalOpen} onClose={handleEditProfileClose} />

            <h1 className="text-4xl font-bold mb-6">Profile</h1>

            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg space-y-6">
                <div className="flex items-center space-x-4">
                    <ProfileImage altText="Profile" profilePic={profilePic} />
                    <div>
                        <h2 className="text-2xl font-semibold">{name}</h2>
                        <span className="text-gray-400">@{username}</span>
                    </div>
                </div>

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                    onClick={handleEditProfileOpen}
                >
                    Edit Profile
                </button>

                <div className="flex justify-around pt-4 border-t border-gray-700">
                    <Link href="/main/profile" className="hover:underline">
                        Threads
                    </Link>
                    <Link href="/main/profile/replies" className="hover:underline">
                        Replies
                    </Link>
                    <Link href="/main/profile/reposts" className="hover:underline">
                        Reposts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
