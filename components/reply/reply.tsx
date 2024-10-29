'use client'
import React, { useEffect, useState, ReactNode } from 'react';
import axiosInstance from '../../axios/axiosInstance';

interface ReplyProps {
    isOpen: boolean;
    onClose: () => void;
   
    postId: string;
    userId: string;
    userProfilePic: string;
    username: string;
    children?: React.ReactNode;
}

const Reply: React.FC<ReplyProps> = ({ isOpen, onClose, postId, userId, userProfilePic, username }) => {
    const [post, setPost] = useState<any>(null);
    const [comment, setComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            const fetchPost = async () => {
                try {
                    const response = await axiosInstance.get(`/posts/post/${postId}`);
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
            userId:userId,
            username:username,
            userProfilePic:userProfilePic
        };

        try {
            setLoading( true);
            await axiosInstance.post(`/posts/${postId}/reply`, reply);
            setComment('');
            onClose();
            setError(null);
        } catch (error) {
            console.error("Failed to reply to post:", error);
            setError("Failed to post your reply.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className=" fixed inset-0 z-50 flex justify-center items-center bg-[#181818] bg-opacity-50  ">
            <div className="bg-[#181818] rounded-lg shadow-lg w-96  flex flex-col animate-fadeIn  ">
                <div className="p-3 border-b border-gray-600">
                    <button 
                        className="text-2xl text-gray-500 hover:text-gray-300 transition-colors" 
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="flex-1 w-8 h-56  no-scrollbar overflow-y-auto px-3">
                    {post && (
                        <div className="mb-4">
                            <div className="flex items-start mb-2">
                                <div className="w-full">
                                    <p className="text-white font-bold text-sm">{post.postById?.username}</p>
                                    <p className="text-white text-sm">{post.text}</p>
                                </div>
                            </div>
                            
                            {post.image && (
                                <div className="relative w-full mb-3">
                                    <img
                                        src={post.image}
                                        alt="Post"
                                        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                                            imageLoaded ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        
                                    />
                                </div>
                            )}
                            <div className="border-b border-gray-600 mb-2"></div>
                        </div>
                    )}

                    <div className="mb-3"></div>

                  
                    <div className="space-y-2">
                        {post?.replies?.length > 0 ? (
                            [...post.replies].reverse().map((reply: any, index: number) => (
                                <div key={index} className="flex items-start mb-2">
                                    <div className="bg-[#181818] p-2.5 rounded-lg text-white w-full">
                                        <p className="font-bold text-sm mb-0.5">{reply.username}</p>
                                        <p className="break-words text-sm">{reply.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center text-sm">No replies yet...</p>
                        )}
                    </div>
                </div>

                
                <div className="p-3 border-t border-gray-600">
                    {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
                    
                    <div className="mb-2">
                        <input
                            placeholder="Add your comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-2 border bg-[#181818] border-gray-400 rounded-lg text-white text-sm"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 text-sm"
                            onClick={handleReplySubmit}
                            disabled={loading}
                        >
                            {loading ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reply;