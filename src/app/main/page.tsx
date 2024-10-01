'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks/useAppDispatch';
import { fetchUser } from '../../../store/reducers/userSlice';
import { fetchPosts } from '../../../store/reducers/postsSlice';
import Threads from '../../../components/threads/threads';
import { addNewPost } from '../../../store/reducers/postsSlice';
import ProfileImage from '../../../components/ProfileImage';
import { Icons } from '../../../ui/Icons/users';
import LikeButton from '../../../components/likeButton';
import Replay from '../../../components/reply/reply';
import ReplyButton from '../../../components/replyButton';
import RepostButton from '../../../components/repostButton';
import TimeAgo from '../../../components/TimeAgo';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const { posts } = useAppSelector((state) => state.posts);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUserName] = useState<string>('');
    const [postContent, setPostContent] = useState<string>('');
    const [postImage, setPostImage] = useState<any>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [isRepostOpen, setIsRepostOpen] = useState(false);
    const [postId, setPostId] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userProfilePic, setProfilePic] = useState<string>('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openComment = () => setIsCommentOpen(true);
    const closeComment = () => setIsCommentOpen(false);

    const openRepost = () => setIsRepostOpen(true);
    const closeRepost = () => setIsRepostOpen(false);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setCurrentUser(user);
                setUserName(user.username || '');
            }
        }
    }, [users]);

    useEffect(() => {
        if (currentUser) {
            setUserId(currentUser._id);
            setProfilePic(currentUser.profilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png');
        }
    }, [currentUser]);

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

    const handlePostSubmit = async () => {
        if (postContent.trim() === '') {
            alert('Please write something before posting!');
            return;
        }
        if (!currentUser) {
            alert('User not found! Please log in.');
            return;
        }
        const newPost = {
            userId: currentUser._id,
            text: postContent,
            image: postImage,
        };

        dispatch(addNewPost(newPost));
        setPostContent('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
           <div  className="text-1xl font-bold mt-12  mb-4 ">For you</div>
            {/* Increased max-width here */}
            <div className="bg-[#181818] rounded-3xl p-4 w-full max-w-xl"> {/* Change max-w-lg to max-w-xl */}
                <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2">
                    <div className="flex items-center">
                        <ProfileImage
                            profilePic={currentUser?.profilePic}
                            altText="profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="ml-2">What's new?</span>
                    </div>
                    <button className="bg-[#181818] text-white rounded px-4 py-2" onClick={openModal}>
                        Post
                    </button>
                </div>

                {/* New thread modal */}
                <Threads isOpen={isModalOpen} onClose={closeModal}>
                    <div className="flex items-center mb-4">
                        <img
                            src={currentUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt="profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <p className="ml-2 text-lg">{username}</p>
                    </div>
                    <textarea
                        name="thread"
                        id="thread"
                        placeholder="Write a post"
                        value={postContent}
                        onChange={handlePostChange}
                        className="w-full h-24 p-2 bg-gray-800 text-white rounded mb-2"
                    />
                    {preview && (
                        <img src={preview} alt="Preview" className="w-full h-auto mb-2 rounded" />
                    )}
                    <div className="flex items-center mb-4">
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Icons.image />
                        </label>
                    </div>
                    <button
                        className="bg-blue-600 text-white rounded px-4 py-2"
                        onClick={handlePostSubmit}
                    >
                        Post
                    </button>
                </Threads>

                <div className="flex flex-col mt-4">
                    {posts.map((post) => (
                        <div key={post._id} className=" bg-blackrounded-lg p-4 mb-4 border-b border-gray-600">
                            <div className="flex items-center mb-2">
                                <img
                                    src={post.postById?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt="profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="ml-2">
                                    <p className="font-semibold">{post.postById.username}</p>
                                    <span className="text-gray-400 text-sm"><TimeAgo dateString={post.createdOn} /></span>
                                </div>
                            </div>
                            <p className="mb-2">{post.text}</p>
                            {post.image && <img src={post.image} alt="post" className="rounded mb-2" />}
                            <div className="flex justify-between">
                                <LikeButton
                                    initialLike={post.likes.length}
                                    postId={post._id}
                                    userId={currentUser?._id}
                                    likedUsers={post.likes}
                                />
                               <Replay
                                    isOpen={isCommentOpen}
                                    onClose={closeComment}
                                    postId={postId}
                                    userProfilePic={userProfilePic}
                                    userId={userId}
                                    username={username}
                                >
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={currentUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                            alt="profile"
                                            className="w-12 h-12 rounded-full mr-2"
                                        />
                                        <p className="text-white text-lg">{username}</p>
                                    </div>
                                </Replay>
                                {/* <ReplyButton replyCount={5} /> */}
                                <RepostButton repostCount={post.reposts.length} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
