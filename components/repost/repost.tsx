import React, { useState } from 'react';
import axiosInstance from '../../axios/axiosInstance';

interface RepostProps {
    isOpen: boolean;
    onClose: () => void;
    postId: string;
    userProfilePic: string;
    userId: string;
    username: string;
}

const Repost: React.FC<RepostProps> = ({ isOpen, onClose, postId, userProfilePic, userId, username }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRepost = async () => {
        setLoading(true);
        setError(null);

        const repost = {
            userId,
            userProfilePic,
            username,
        };

        try {
            const response = await axiosInstance.post(`/posts/repost/${postId}`, repost);
            console.log("Reposted:", response.data);
            onClose();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Failed to repost. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-[#181818] p-5 rounded-lg w-[300px] text-center relative">
                <button className="absolute top-2.5 right-2.5 text-2xl font-bold cursor-pointer" onClick={onClose}>
                    &times;
                </button>
                                   

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mt-9 flex justify-center gap-4">
                    <button
      
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                     
                        onClick={handleRepost}
                        disabled={loading}
                    >
                        {loading ? 'Reposting...' : 'Repost'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Repost;
