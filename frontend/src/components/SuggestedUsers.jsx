import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { followUnfollowUser } from '../redux/authSlice';  // Update this import

const SuggestedUsers = () => {
    const dispatch = useDispatch();
    const { suggestedUsers } = useSelector((store) => store.auth);

    const handleFollowClick = (userId) => {
        console.log('Follow/Unfollow clicked for user ID:', userId); 
        dispatch(followUnfollowUser(userId));  // Action will now come from authSlice
    };

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {suggestedUsers && suggestedUsers.length > 0 ? (
                suggestedUsers.map((user) => (
                    <div key={user._id} className='flex items-center justify-between my-5'>
                        <div className='flex items-center gap-2'>
                            <Link to={`/profile/${user?._id}`}>
                                <Avatar>
                                    <AvatarImage src={user?.profilePicture} alt="post_image" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <h1 className='font-semibold text-sm'>
                                    <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                                </h1>
                                <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
                            </div>
                        </div>
                        <span
                            className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'
                            onClick={() => handleFollowClick(user._id)}
                        >
                            {user.isFollowing ? 'Unfollow' : 'Follow'}
                        </span>
                    </div>
                ))
            ) : (
                <p className='text-gray-500 text-sm mt-5'>No suggested users available.</p>
            )}
        </div>
    );
};

export default SuggestedUsers;


