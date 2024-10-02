'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import ProfileImage from '../ProfileImage';

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
    const [comment, setComment] = useState<string>('');  
    const [loading, setLoading] = useState<boolean>(false);  

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

    const handleReplySubmit = async () => {
        if (!comment.trim()) return;  

        const reply = {
            text: comment,
            userId: userId,
            username: username,
            userProfilePic: userProfilePic
        };

        try {
            setLoading(true);  
            const response = await axios.post(
                `https://social-media-rest-apis.onrender.com/api/posts/${postId}/reply`, 
                reply
            );
            console.log("Replied to post:", response.data);
            setComment('');  
        } catch (error) {
            console.error("Failed to reply to post:", error);
        } finally {
            setLoading(false);  
        }
    };

    if (!isOpen) return null;

    return (
        <div className="top-0 fixed   inset-0 z-50 flex justify-center items-start bg-transparent">
           
            <div className="bg-black   -mt-36 rounded-lg p-4 shadow-lg relative top-2 w-full max-w-xs md:max-w-sm lg:max-w-md animate-fadeIn">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                    <button className="text-2xl text-gray-500 hover:text-gray-900 transition-colors" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {post && (
                    <div className="mb-4">
                        <div className="flex items-center mb-4">
                            {post.postById.profilePic ? (
                                <img 
                                    src={post.postById.profilePic} 
                                    alt={`${post.postById.username}'s profile`} 
                                    className="w-8 h-8 rounded-full mr-2 object-cover" 
                                />
                            ) : (
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="profile"
                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                />
                            )}
                            <h1 className="text-white text-sm">{post.postById.username}</h1>
                        </div>

                        <h2 className="text-white mb-2 text-sm">{post.text}</h2>
                        {post.image && (
                            <img src={post.image} alt="Post" className="w-full h-auto object-cover rounded-lg" />
                        )}
                    </div>
                )}

                <div>{children}</div>

                <div className="mb-4">
                    <textarea
                        placeholder="Add your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}  
                        className="w-full h-16 p-2 border border-gray-400 rounded-lg resize-none text-black"
                    />
                </div>

                <div className="flex justify-end">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={handleReplySubmit}  
                        disabled={loading}  
                    >
                        {loading ? 'Posting...' : 'Post'}  
                    </button>
                </div>

                {/* Replies Section */}
                <div className="mt-4">
                    {post?.replies?.length > 0 ? (
                        [...post.replies].reverse().map((reply: any, index: number) => (
                            <div key={index} className="flex items-start mb-2">
                                <ProfileImage 
                                    profilePic={reply.userProfilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                    altText={reply.username} 
                                    className="w-8 h-8 rounded-full mr-2" 
                                />
                                <div className="bg-gray-800 p-2 rounded-lg text-white">
                                    <p className="font-bold">{reply.username}</p>
                                    <p>{reply.text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No replies yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reply;
