import { createSlice, current } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import { setThisUser } from "../../../services/services";

const initialState = {
  directChat: {
    conversations: [],
    currentConversation: null,
    currentMessages: [],
  },
  groupChat: {},
  isReply:false,
  selectedReplyMessage:null,
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        const thisUser = el.participants.find(
          (elm) => elm.id.toString() !== action.payload.userId
        );
        return setThisUser({thisUser, roomId:el.id})
      });
      state.directChat.conversations = list;
    },
    updateDirectConversation(state, action) {
      const thisConversation = action.payload.conversations;
      state.directChat.conversations = state.directChat.conversations.map(
        (el) => {
          if (el.id !== thisConversation.id) {
            return el;
          } else {
            const thisUser = thisConversation.participants.find(
              (elm) => elm.id.toString() !== action.payload.userId
            );
            state.directChat.currentMessages = thisConversation.messages;
            state.directChat.currentConversation = setThisUser({thisUser, roomId:thisConversation.id});
            return setThisUser({thisUser, roomId:thisConversation.id})
          }
        }
      );
    },
    addDirectConversation(state, action) {
      const thisConversation = action.payload.conversations;
      const thisUser = thisConversation.participants.find(
        (elm) => elm.id.toString() !== action.payload.userId
      );
      state.directChat.currentMessages = [];
      state.directChat.currentConversation = setThisUser({thisUser, roomId:thisConversation.id})
      state.directChat.conversations.push(setThisUser({thisUser, roomId:thisConversation.id}));
    },
    selectExistingConversation(state, action) {
      const roomId = action.payload.roomId;
      const currConv = JSON.parse(
        JSON.stringify(state.directChat.conversations)
      );
      const user = currConv.find((el) => el.id.toString() === roomId);
      state.directChat.currentConversation = user;
      state.directChat.currentMessages = action.payload.messages;
    },
    newMessage(state, action) {
      state.directChat.currentMessages.push(action.payload.message);
    },
    newMessageForOtherConversation(state, action) {
      const data = action.payload.message;
      const convs = JSON.parse(JSON.stringify(state.directChat.conversations));
      const index = convs.findIndex(
        (el) => el.id.toString() == data.conversationId
      );
      const recievedMessageConversation = convs.find(
        (el) => el.id.toString() == data.conversationId
      );
      recievedMessageConversation.unread += 1;
      recievedMessageConversation.msg = data.message.message;
      state.directChat.conversations.splice(
        index,
        1,
        recievedMessageConversation
      );
    },
    clearUnread(state, action) {
      const convs = JSON.parse(JSON.stringify(state.directChat.conversations));
      const index = convs.findIndex(
        (el) => el.id.toString() == action.payload.id
      );
      const recievedMessageConversation = convs.find(
        (el) => el.id.toString() == action.payload.id
      );
      recievedMessageConversation.unread = 0;
      state.directChat.conversations.splice(
        index,
        1,
        recievedMessageConversation
      );
    },
    setIsReplyStatus(state, action){
      state.isReply = true;
      const currMsg = JSON.parse(
        JSON.stringify(state.directChat.currentMessages)
        );
        const message = currMsg.find((el)=>el.id === action.payload.id);
      state.selectedReplyMessage = message;
    },
    resetIsReplyStatus(state, action){
      state.isReply = false;
      state.selectedReplyMessage = null
    },
  },
});

export const fetchDirectConversations = ({ conversations, userId }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations, userId }));
  };
};

export const addDirectConversation = ({ conversations, userId }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConversation({ conversations, userId }));
  };
};

export const updateDirectConversation = ({ conversations, userId }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversation({ conversations, userId }));
  };
};

export const selectExistingConversation = ({ messages, roomId }) => {
  return async (dispatch) => {
    dispatch(slice.actions.selectExistingConversation({ messages, roomId }));
  };
};

export const newMessage = ({ message }) => {
  return async (dispatch) => {
    dispatch(slice.actions.newMessage({ message }));
  };
};

export const NewMessageForOtherConversation = ({ message }) => {
  return async (dispatch) => {
    dispatch(slice.actions.newMessageForOtherConversation({ message }));
  };
};
export const ClearUnread = ({ id }) => {
  return async (dispatch) => {
    dispatch(slice.actions.clearUnread({ id }));
  };
};

export const ToggleIsReplyStatus = ({ type, id }) => {
  return async (dispatch) => {
    if(type){
      dispatch(slice.actions.setIsReplyStatus({id}));
    }else{
      dispatch(slice.actions.resetIsReplyStatus());
    }
  };
};

export default slice.reducer;
