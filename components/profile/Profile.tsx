'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch,useAppSelector } from '../../hooks/hooks/useAppDispatch';
import { fetchUser } from '../../store/reducers/userSlice';
import ProfileImage from '../ProfileImage';
import EditProfile from '../editProfile/editProfile';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const [name, setName] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>('');
  const [followers, setFollowers] = useState<string>(''); // Corrected followers state initialization
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
        setUserBio(user.bio || '');      }
    }
  }, [users]);

  const handleEditProfileOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full flex items-center justify-center bg-[#101010] py-2">
        <h1 className="text-[#F3F5F7] text-center text-lg font-bold">For you</h1>
      </nav>
      <div className="flex items-center justify-center h-96 mt-12">
        <div className="w-6/12 h-full bg-[#181818] rounded-3xl">
          <EditProfile isOpen={isEditModalOpen} onClose={handleEditProfileClose} />
          <div className="bg-[#181818] rounded-lg h-full p-4">
            <div className="text-white mt-16">
              <h1 className="text-[#F3F5F7] text-2xl ml-8">{name}</h1>
              <span className="text-[#F3F5F7] text-base ml-8">{username}</span>

              <p className="ml-8 mt-2">{userBio}</p>
              <p className="text-gray-500 ml-8">{followers} followers</p>
            </div>

            <div className="flex justify-center mt-[-50px] mb-4">
              <ProfileImage
                altText="Profile"
                profilePic={profilePic}
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>

            <div className="flex justify-center">
              <div
                className="bg-transparent border-2 border-[#1E1E1E] rounded-lg py-1 px-4 cursor-pointer text-[#F3F5F7] font-semibold text-center"
                onClick={handleEditProfileOpen}
              >
                Edit profile
              </div>
            </div>

            <div className="flex justify-between text-[#F3F5F7] font-semibold text-lg mt-4">
              <Link href={'/main/Profile/Mprofile'} className="border-b-3 border-gray-800 px-8 py-2 hover:border-white">
                Threads
              </Link>
              <div className="border-b-3 border-gray-800 px-8 py-2 hover:border-white">Replies</div>
              <div className="border-b-3 border-gray-800 px-8 py-2 hover:border-white">Reposts</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
