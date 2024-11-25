import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload;
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
    },
});

export const followUnfollowUser = (userId) => async (dispatch, getState) => {
    try {
        const res = await axios.put(`http://localhost:8000/api/v1/user/followorunfollow/${userId}`, {}, { withCredentials: true });

        if (res.data.success) {
            const { suggestedUsers } = getState().auth;

    
            const updatedUsers = suggestedUsers.map((user) =>
                user._id === userId
                    ? { ...user, isFollowing: !user.isFollowing }
                    : user
            );

            dispatch(setSuggestedUsers(updatedUsers));
        }
    } catch (error) {
        console.error("Failed to follow/unfollow:", error.message);
    }
};

export const { setAuthUser, setSuggestedUsers, setUserProfile, setSelectedUser } = authSlice.actions;

export default authSlice.reducer;
