'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface ReplyProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    postId: string;
    userId: string;
    userProfilePic: string;
    username: string;
}

const Reply: React.FC<ReplyProps> = ({ isOpen, onClose, children, postId, userId, userProfilePic, username }) => {
    const [post, setPost] = useState<any>(null);
    const [comment, setComment] = useState<string>('');  // State for the comment
    const [loading, setLoading] = useState<boolean>(false);  // State for loading

    // Fetch the post when the modal is opened
    useEffect(() => {
        if (isOpen) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(
                        `https://social-media-rest-apis.onrender.com/api/posts/post/${postId}`
                    );
                    setPost(response.data.post);
                } catch (error) {
                    console.error("Failed to fetch post:", error);
                }
            };
            fetchPost();
        }
    }, [isOpen, postId]);

    // Handle reply submission
    const handleReplySubmit = async () => {
        if (!comment.trim()) return;  // Avoid submitting an empty comment

        const reply = {
            text: comment,
            userId: userId,
            username: username,
            userProfilePic: userProfilePic
        };

        try {
            setLoading(true);  // Set loading state to true while submitting
            const response = await axios.post(
                `https://social-media-rest-apis.onrender.com/api/posts/${postId}/reply`, 
                reply
            );
            console.log("Replied to post:", response.data);
            setComment('');  // Clear comment input after successful submission
        } catch (error) {
            console.error("Failed to reply to post:", error);
        } finally {
            setLoading(false);  // Reset loading state after submission
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-[#181818] rounded-lg w-full max-w-2xl p-6 shadow-lg relative animate-fadeIn">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                    <button className="text-2xl text-gray-500 hover:text-gray-900 transition-colors" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Display the fetched post content */}
                {post && (
                    <div className="mb-4">
                        <div className="flex items-center mb-4">
                            {/* Display profile picture */}
                            {post.postById.profilePic ? (
                                <img 
                                    src={post.postById.profilePic} 
                                    alt={`${post.postById.username}'s profile`} 
                                    className="w-10 h-10 rounded-full mr-2 object-cover" 
                                />
                            ) : (
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="profile"
                                    className="w-10 h-10 rounded-full mr-2 object-cover"
                                />
                            )}
                            <h1 className="text-white">{post.postById.username}</h1>
                        </div>

                        <h2 className="text-white mb-2">{post.text}</h2>
                        {post.image && (
                            <img src={post.image} alt="Post" className="w-1/2 h-1/2 ml-12 object-cover rounded-lg" />
                        )}
                    </div>
                )}

                <div>{children}</div>

                <div className="mb-4">
                    <textarea
                        placeholder="Add your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}  // Update comment state
                        className="w-full h-24 p-2 border border-gray-400 rounded-lg resize-none text-black"
                    />
                </div>

                <div className="flex justify-end">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={handleReplySubmit}  // Trigger reply submission
                        disabled={loading}  // Disable button while loading
                    >
                        {loading ? 'Posting...' : 'Post'}  {/* Show loading state */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reply;
