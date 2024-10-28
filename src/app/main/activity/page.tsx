
import React from 'react';
import ProfileImage from '../../../../components/ProfileImage';
import { getUserId } from '../../../../serverside/getCookie';
import axiosInstance from '../../../../axios/axiosInstance';

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePic: string;
}

interface Notification {
    _id: string;
    description: string;
    senderUserId: User;
}

async function getNotifications() {
    const userId = getUserId();
    const res = await axiosInstance.get(`/users/notification/${userId}`);
    return res.data.notifications;
}

export default async function ActivityPage() {
    let notifications: Notification[] = [];
    try {
        notifications = await getNotifications();
        console.log(notifications)
    } catch (error) {
        console.error(error);

    }

    return (
        <div className="bg-[#181818] w-96 p-7 rounded-3xl">
            <div className="text-white text-xl mb-2">Activity</div>
            <div>
              {notifications.length === 0 ? (
                    <p>No notifications available...</p>
              ) : (
               
                notifications.map((notification) => (
                    <div key={notification._id} className="border-b border-[#383939] py-4">
                        <div className="flex items-center">
                            <div className="p-3">
                                <ProfileImage 
                                    profilePic={notification.senderUserId.profilePic}
                                    altText="profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-start ml-2">
                                <div className="text-white">{notification.senderUserId.name}</div>
                                <div className="text-gray-400">{notification.description}</div>
                            </div>
                        </div>
                    </div>
               ) ))}
            </div>
        </div>
    );
};


