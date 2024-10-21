// 'use client';
// import React from 'react';
// import { useAppSelector } from '../../../../../hooks/hooks/useAppDispatch';

 

// const Reposts: React.FC = () => {
//     const { posts } = useAppSelector((state) => state.post);

//     console.log("my post",posts);

//     return (
//         <div>
           
//             {posts.length > 0 ? (
//                 posts.map((post) => (
//                     post.reposts && post.reposts.length > 0 ? (  
//                         <div key={post._id} >
//                             <h2>{post.username} reposted:</h2>
//                             <p>{post.text}</p>
//                             {post.image && <img src={post.image} alt="Repost"  />}
//                         </div>
//                     ) : null
//                 ))
//             ) : (
//                 <p>No reposts available</p>
//             )}
//         </div>
//     );
// }

// export default Reposts;
