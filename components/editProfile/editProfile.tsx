import React, { useState } from 'react';
import { BsPersonFillAdd } from 'react-icons/bs';

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, onClose }) => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open the file input dialog
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#181818] p-8 rounded-lg max-w-sm w-full relative shadow-md animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-400 hover:text-black">
          ✕
        </button>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-400 mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-400 mb-2">Profile Picture</label>
            <button onClick={handleImageUpload} className="flex items-center justify-center p-2 border border-gray-300 rounded">
              <BsPersonFillAdd size={24} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-400 mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bio" className="text-gray-400 mb-2">Bio</label>
            <input
              type="text"
              id="bio"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-400 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button type="submit" className="bg-white text-black p-3 rounded cursor-pointer hover:bg-gray-200">
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
