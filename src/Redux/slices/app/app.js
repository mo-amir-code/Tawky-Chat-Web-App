import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../../store";
import { httpAxios } from "../../../services/axios";
import toast from "react-hot-toast";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED MSG, SHARED
  },
  users:[],
  friends:[],
  friendRequests:[],
  chatType:null,
  roomId:null,

};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    updateUsers(state, action) {
      state.users = action.payload.data;
    },
    updateFriends(state, action) {
      state.friends = action.payload.data;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.data;
    },
    selectConversation(state, action){
      state.chatType = "individual";
      state.roomId = action.payload.roomId
    }
  },
});


export const fetchUsersAsync = createAsyncThunk('app/fetchuser', async (dispatch, getState) => {
  try{ 
    const response = await httpAxios('/users/get-users', {
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`
      }
    })
    dispatch(slice.actions.updateUsers({data:response.data.data}))
   }catch(err){
    console.log(err)
    toast.error(err.response.data.message)
  }
} )

export const fetchFriendsAsync = createAsyncThunk('app/fetchfriends', async (dispatch, getState) => {
  try{ 
    const response = await httpAxios('/users/get-friends', {
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`
      }
    })
    dispatch(slice.actions.updateFriends({data:response.data.data}))
   }catch(err){
    console.log(err)
    toast.error(err.response.data.message)
  }
} )

export const fetchFriendRequestsAsync = createAsyncThunk('app/fetchfriendsrequests', async (dispatch, getState) => {
  try{ 
    const response = await httpAxios('/users/get-friend-requests', {
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`
      }
    })
    dispatch(slice.actions.updateFriendRequests({data:response.data.data}))
   }catch(err){
    console.log(err)
    toast.error(err.response.data.message)
  }
} )


export default slice.reducer


export function toggleSidebar(){
  return async () => {
    dispatch(slice.actions.toggleSidebar());
  }
}

export function updateSidebarType(type){
  return async () => {
    dispatch(slice.actions.updateSidebarType({type}))
  }
}

export function SelectConversation({roomId}){
  return (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({roomId}))
  }
}
