'use client';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks/useAppDispatch';
import { fetchUser } from '../../../../store/reducers/userSlice';
import ProfileImage from '../../../../components/ProfileImage'; // Assuming you're reusing the ProfileImage component
import { Icons } from '../../../../ui/Icons/users';
// import FollowButton from '../../../../components/FollowButton'; // If you have a follow button component

const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setCurrentUser(user);
            }
        }
    }, [users]);

    useEffect(() => {
        setFilteredUsers(
            users.filter((user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
        
            <div className="sticky top-0 bg-black w-full text-center py-3 z-50">
                <div className="text-1xl font-bold">Search Users</div>
            </div>


          
            <div className="bg-[#181818] sticky rounded-3xl p-4 w-full max-w-xl">
                <div className="flex  justify-between items-center bg-gray-800 p-2 rounded-full mb-4 shadow-md max-w-xl">
                    <Icons.search />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-grow border-none bg-transparent outline-none text-lg text-gray-300 px-2"
                    />
                </div>

              
                <div className="flex flex-col gap-4 max-w-xl">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div key={user._id} className="bg-[#181818] rounded-lg p-4 shadow-md flex items-center justify-between">
                            
                                <div className="flex items-center">
                                    <ProfileImage
                                        profilePic={user.profilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                        altText="profile"
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="ml-2">
                                        <p className="font-bold text-white">{user.name}</p>
                                        <p className="text-sm text-gray-400">{user.username}</p>
                                        <p className="text-sm text-gray-500">{user.followers.length} followers</p>
                                    </div>
                                </div>

                                {/* Follow Button
                                {currentUser && currentUser._id !== user._id && (
                                    <FollowButton userId={user._id} isFollowing={user.followers.includes(currentUser._id)} />
                                )} */}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No user found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
