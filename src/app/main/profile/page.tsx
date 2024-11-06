"use client"
import { useAppDispatch } from '../../../../hooks/hooks/useAppDispatch';
import axiosInstance from '../../../../axios/axiosInstance';
import React, { useEffect, useState } from 'react';
import ProfileImage from '../../../../components/ProfileImage';
import TimeAgo from '../../../../components/TimeAgo';
import LikeButton from '../../../../components/likeButton';
import ReplyButton from '../../../../components/replyButton';
import Repost from '../../../../components/repost/repost';
import { MdDelete } from "react-icons/md";
import RepostButton from '../../../../components/repostButton';

const Page = () => {
    const dispatch = useAppDispatch();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    type Post = {
        _id: string;
        userProfilePic: string;
        username: string;
        text: string;
        image: string;
        createdOn: string;
        replies: Reply[];
        likes: string[];
        reposts: string[];
        postById: string;
    };

    type Reply = {
        _id: string;
        userId: string;
        userProfilePic: string;
        username: string;
        text: string;
    };

    const fetchPosts = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await axiosInstance.get(`api/posts/${userId}`);
                setPosts(response.data.post);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (postId: string) => {
        try {
            await axiosInstance.delete(`api/posts/${postId}`);
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const toggleDropdown = (postId: string) => {
        setSelectedPostId(selectedPostId === postId ? null : postId);
    };

    return (
        <div className="flex items-center justify-center h-screen mt-20">
            <div className="w-6/12 bg-[#181818] rounded-3xl mt-auto">
                <div className="flex flex-col gap-10 p-4">
                    {posts.map((post) => (
                        <div key={post._id} className="flex flex-col">
                            <div className="flex items-center mt-6">
                                <ProfileImage
                                    profilePic={post.userProfilePic}
                                    altText="Profile"
                                    className="w-12 h-12 object-cover rounded-full ml-8"
                                />
                                <div className="ml-4">
                                    <h3 className="text-white">{post.username}</h3>
                                    <TimeAgo dateString={post.createdOn} />
                                </div>
                                <div className="ml-auto">
                                    <MdDelete className="text-white text-2xl" onClick={() => toggleDropdown(post._id)} />
                                    {selectedPostId === post._id && (
                                        <button className="text-white text-sm ml-4" onClick={() => deletePost(post._id)}>Delete</button>
                                    )}
                                </div>
                            </div>
                            <p className="text-left text-gray-300 ml-8 mt-1">{post.text}</p>
                            {post.image && <img src={post.image} alt="post" className="w-1/2 h-auto mx-8 mt-3 rounded-lg" />}
                            <div className="flex items-center justify-between ml-8 mt-3">
                                <LikeButton
                                    initialLike={post.likes.length}
                                    postId={post._id}
                                  
                                    likedUsers={post.likes}
                                />
                                <ReplyButton replyCount={post.replies.length} />
                                <RepostButton repostCount={post.reposts.length} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
