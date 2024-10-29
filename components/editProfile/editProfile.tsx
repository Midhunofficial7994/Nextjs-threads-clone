import React, { useEffect, useState } from 'react';

import axiosInstance from '../../axios/axiosInstance';

interface EditProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            const fetchProfileData = async () => {
                try {
                    const response = await axiosInstance.get(`/users/${localStorage.getItem('userId')}`);
                    
                    if (response.status === 200) {
                        const userData = response.data.user;
                        setName(userData.name);
                        setUsername(userData.username);
                        setEmail(userData.email);
                        setBio(userData.bio);
                        setPreviewImage(userData.profilePic);
                    }
                } catch (error) {
                    console.log('Error fetching profile data:', error);
                }
            };
            fetchProfileData();
        }
    }, [isOpen]);

    const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {  
            setProfilePic(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('bio', bio);
            if (profilePic) formData.append('profilePic', profilePic);

            const response = await axiosInstance.patch(`/users/${localStorage.getItem('userId')}`, formData);
            if (response.status === 200) {
                localStorage.setItem('user',(response.data.user));

                onClose();
            }
        } catch (error) {
            console.log('Error updating profile:', error);

        }
    };

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-[#181818] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-neutral-900 p-8 rounded-lg max-w-md w-full relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 text-2xl border-none bg-transparent cursor-pointer"
                >
                    ✕
                </button>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm text-gray-500 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-3 rounded bg-black text-white w-full border-none"
                        />
                        <div className="mt-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            {previewImage && (
                                <div className="mt-2">
                                    <img 
                                        src={previewImage} 
                                        alt="Profile Preview" 
                                        className="w-12 h-12 rounded-full object-cover cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()} 
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-sm text-gray-500 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-3 rounded bg-black text-white w-full border-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="bio" className="text-sm text-gray-500 mb-2">Bio</label>
                        <input
                            type="text"
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="p-3 rounded bg-black text-white w-full border-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm text-gray-500 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 rounded bg-black text-white w-full border-none"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="bg-gray-600 text-black p-3 rounded text-base cursor-pointer hover:bg-gray-200  transition-colors mt-4"
                    >
                        Done
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;