import { Icons } from '../ui/Icons/users'
import React  from 'react'

 interface replyButtonProps {
  replyCount: number
}
 
const ReplyButton: React.FC<replyButtonProps> = ({replyCount}) => {
  return (
    <button >
      <span>{replyCount}</span>
      <Icons.reply />
    </button>   
  )
}

export default ReplyButton

// // replyButton.tsx
// import React from 'react';

// interface replyButtonProps {
//     postId: string; // Add the postId prop here
//     // Include any other props you need
// }

// const ReplyButton: React.FC<replyButtonProps> = ({ postId }) => {
//     const handleReply = () => {
//         // Handle the reply action here
//         console.log(`Replying to post with ID: ${postId}`);
//     };

//     return (
//         <button onClick={handleReply} className="text-blue-500">
//             Reply
//         </button>
//     );
// };

// export default ReplyButton;
