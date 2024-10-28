'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/hooks/useAppDispatch';
import ProfileImage from '../../../../components/ProfileImage';
import TimeAgo from '../../../../components/TimeAgo';
import axios from 'axios';


const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();      
    const [posts, setPosts] = useState<any>([]);

    const fetchPosts = async () => {
        try {     
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await axios.get(
                    `https://social-media-rest-apis.onrender.com/api/posts/${userId}`
                );
                setPosts(response.data.post);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(posts);

    return (
        <div className="flex flex-col  gap-4 bg-[#181818]">
            {posts.length > 0 ? (
                posts.map((post: { _id: string; userProfilePic: string; username: string; text: string; image: string; createdOn: string; replies: any[] }) => (
                    <div key={post._id} className="flex flex-col gap-4 bg-transparent p-4 border-b border-gray-700">
                        <div className="flex items-center w-full">
                            <ProfileImage
                                profilePic={post.userProfilePic}
                                altText="Profile"
                                className="w-12 h-12 object-cover mr-4 rounded-full"
                            />
                            <div className="flex flex-col">
                                <h3 className="text-white text-lg">{post.username}</h3>
                                <TimeAgo dateString={post.createdOn} />
                            </div>
                            
                        </div>
                        <p className="text-left ml-2 text-white">{post.text}</p>
                        {post.image && (
                            <img src={post.image} alt="post" className="w-32 h-auto ml-12 object-cover rounded-md" />
                        )}
                        <div className="flex flex-col gap-4 mt-4">
                            {post.replies && post.replies.length > 0 && (
                                <div className="w-auto flex flex-col ml-14 bg-black p-4 rounded-lg">
                                    {post.replies.map((reply: { text: string, _id: string, userId: string, userProfilePic: string, username: string }) => (
                                        <div key={reply._id} className="flex items-center gap-4">
                                            <ProfileImage profilePic={reply.userProfilePic} altText="Profile" className="w-2 h-2 object-cover rounded-full" />
                                            <h5 className="text-white">{reply.username}</h5>
                                            <p className="text-gray-300">{reply.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-white">No posts available</p>
            )}
        </div>
    );
}

export default ProfilePage;
