'use client';
import React, { useEffect, useState } from 'react';
import ProfileImage from '@/components/ProfileImage';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchUser } from '@/store/reducers/userSlice';
import EditProfile from '../editProfile/editProfile';

const Profile = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);

    const [name, setName] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>('');
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false); // State for modal

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

    // Function to toggle Edit Profile modal
    const handleEditProfileOpen = () => {
        setIsEditModalOpen(true);
    };

    const handleEditProfileClose = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className="w-full bg-transparent">
            {/* Edit Profile Modal */}
            <EditProfile isOpen={isEditModalOpen} onClose={handleEditProfileClose} />

            <h1 className="flex items-center justify-center h-15 text-white text-2xl z-50 bg-transparent">
                Profile
            </h1>

            <div className="bg-[#181818] rounded-xl h-full">
                <div className="flex items-center justify-between h-24 w-full p-5">
                    <div className="text-white">
                        <h1>{name}</h1>
                        <span>{username}</span>
                    </div>

                    <div className="w-12 h-12">
                        <ProfileImage
                            altText="Profile"
                            profilePic={profilePic}
                            className="w-12 h-12 object-cover rounded-full mr-2"
                        />
                    </div>
                </div>

                <div className="bg-[#181818] px-4">
                    <div
                        className="border border-gray-500 rounded-xl px-4 py-2 cursor-pointer"
                        onClick={handleEditProfileOpen}
                    >
                        Edit Profile
                    </div>
                </div>

                <div className="flex items-center justify-between p-5">
                    <Link href={'/main/profile'} className="text-white">Threads</Link>
                    <Link href={'/main/profile/replies'} className="text-white">Replies</Link>
                    <Link href={'/main/profile/reposts'} className="text-white">Reposts</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
