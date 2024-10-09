import React from 'react';

import { Icons } from '../ui/Icons/users';
 interface repostButtonProps {
    repostCount: number
 }
const RepostButton: React.FC<repostButtonProps> = ({ repostCount }) => {
  return (
    <button>
      <Icons.repost />
      <span>{repostCount}</span>
    </button>
  );
};
        
export default RepostButton;
