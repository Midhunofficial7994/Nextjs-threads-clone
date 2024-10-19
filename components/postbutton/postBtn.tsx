import React from 'react';

interface PostBtnProps {
    onClick: () => void;
}

const PostBtn: React.FC<PostBtnProps> = ({ onClick }) => {
    return (
        <div
            className="px-4 py-2 border border-[#383939] bg-[#181818] text-[#F3F5F7] rounded-[10px] flex justify-center items-center cursor-pointer font-semibold font-sans outline-none transition-all duration-200 ease-in-out active:bg-[#2b2b2b]"
            onClick={onClick}
        >
            Post
        </div>
    ); 
};

export default PostBtn;
