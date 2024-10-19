'use client';
import React, { useEffect } from 'react';
import { fetchNotifications } from '../../../../store/reducers/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks/useAppDispatch';
import ProfileImage from '../../../../components/ProfileImage';

const ActivityPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { notifications, status, error } = useAppSelector((state) => state.notifications);
    
    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    return (
        <div className="bg-[#181818] w-full p-4">
            <div className="text-white text-xl mb-4">Activity</div>
            <div>
                {error && <div className="text-red-500">{error}</div>}
                {notifications.length === 0 && status !== 'loading' && !error && (
                    <div className="text-gray-300">No notifications available.</div>
                )}
                {status === 'loading' && <div className="text-gray-300">Loading notifications...</div>}
                {notifications.map((notification) => (
                    <div key={notification.id} className="border-b border-[#383939] py-4">
                        <div className="flex items-center">
                            <div className="p-3">
                                <ProfileImage 
                                    profilePic={notification.senderUSerId.profilePic}
                                    altText="profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-start ml-2">
                                <div className="text-white">{notification.senderUSerId.name}</div>
                                <div className="text-gray-400">{notification.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityPage;
