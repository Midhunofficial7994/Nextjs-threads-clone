import React, { useState } from 'react';
import axios from 'axios';

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
      userId: userId,
      userProfilePic: userProfilePic,
      username: username,
    };

    try {
      const response = await axios.post(
        `https://social-media-rest-apis.onrender.com/api/posts/repost/${postId}`,
        repost
      );
      console.log("Reposted:", response.data);
      setLoading(false);
      onClose(); // Close modal after successful repost
    } catch (err) {
      console.error("Failed to repost:", err);
      setError("Failed to repost. Please try again.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-transparent flex justify-center items-center z-50">
      <div className="bg-[#181818] p-6 rounded-lg w-[300px] text-center relative">
        <button className="absolute top-2 right-2 text-2xl text-gray-300 hover:text-red-500 transition-colors" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-white text-lg mb-4">Repost Content {postId}</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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
