import React, { ReactNode, useState } from 'react';
import PostBtn from '../postbutton/postBtn';
import { Icons } from '../../ui/Icons/users';
import axiosInstance from '../../axios/axiosInstance';

interface ThreadsProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Threads: React.FC<ThreadsProps> = ({ isOpen, onClose, children }) => {
    const [postContent, setPostContent] = useState<string>('');
    const [postImage, setPostImage] = useState<any>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handlePostSubmit = async () => {
        const userId = localStorage.getItem('userId');
        if (postContent.trim() === '') {
            alert('Please write something before posting!');
            return;
        }
        if (!userId) {
            alert('User not found! Please log in.');
            return;
        }
        const newPostFormData = new FormData();
        newPostFormData.append('userId', userId);
        newPostFormData.append('text', postContent);
        newPostFormData.append('image', postImage);

        try {
            const response = await axiosInstance.post('/posts', newPostFormData);
            console.log('Response:', response);
        } catch (error) {
            console.error('Error adding new post:', error);
        }
        setPostContent('');
        setPostImage(null);
        setPreview(null);
        onClose();
    };

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPostImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (
      
       <div className="bg-[#181818] p-8 w-[95%] max-w-[600px] rounded-[20px] shadow-lg animate-fadeIn">
          <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 transition-colors">
            &times;
          </button>
          <div className="mt-4 text-gray-200">
            {children}
            <div className="flex flex-col gap-4 mt-8">
              <textarea
                placeholder="Write a post"
                value={postContent}
                onChange={handlePostChange}
                className="bg-[#181818] p-4 rounded-lg shadow-sm text-base text-white resize-none outline-none"
                rows={4}
              />
              {preview && (
                <div className="w-full max-h-[300px] overflow-hidden rounded-md">
                  <img src={preview} alt="Preview" className="w-full h-auto object-cover rounded-md" />
                </div>
              )}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label className="flex items-center text-gray-300 cursor-pointer hover:text-white">
                    <div className='flex justify-end'>
                <button className="ml-2 border h-10 w-56 rounded-lg">Upload Image</button>
                </div>
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <PostBtn onClick={handlePostSubmit} />
            </div>
          </div>
     
      </div>
    );
  };

export default Threads;


// import React, { ReactNode } from 'react';

// interface ThreadsProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const Threads: React.FC<ThreadsProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     // <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center z-[1000]">
//       <div className="bg-[#181818] p-8 w-[90%] max-w-[500px] rounded-lg shadow-lg relative animate-fadeIn">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 transition-colors"
//         >
//           &times;
//         </button>
//         <div className="mt-4 text-gray-200">{children}</div>
//       </div>
//     // </div>
//   );
// };

// export default Threads;
// import React, { ReactNode } from 'react';

// interface ThreadsProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const Threads: React.FC<ThreadsProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     // <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center z-[1000]">
//       <div className="bg-[#181818] p-8 w-[90%] max-w-[500px] rounded-lg shadow-lg relative animate-fadeIn">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 transition-colors"
//         >
//           &times;
//         </button>
//         <div className="mt-4 text-gray-200">{children}</div>
//       </div>
//     // </div>
//   );
// };

// export default Threads
