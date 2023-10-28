import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

const initialState = {
  directChat: {
    conversations: [],
    currentConversation: null,
    currentMessages: [],
  },
  groupChat: {},
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
        return {
          id: el.id,
          userId: thisUser.id,
          name: `${thisUser.firstName} ${thisUser.lastName}`,
          online: thisUser.status === "Online" ? true : false,
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "12:45",
          unread: 0,
          pinned: false,
        };
      });
      state.directChat.conversations = list;
    },
    updateDirectConversation(state, action) {
      const thisConversation = action.payload.conversation;
      state.directChat.conversations = state.directChat.conversations.map(
        (el) => {
          if (el.id !== thisConversation.id) {
            return el;
          } else {
            const thisUser = thisConversation.participants.find(
              (elm) => elm.id.toString() !== action.payload.userId
            );
            return {
              id: thisConversation.id,
              userId: thisUser.id,
              name: `${thisUser.firstName} ${thisUser.lastName}`,
              online: thisUser.status === "Online" ? true : false,
              img: faker.image.avatar(),
              msg: faker.music.songName(),
              time: "12:45",
              unread: 0,
              pinned: false,
            };
          }
        }
      );
    },
    addDirectConversation(state, action) {
      const thisConversation = action.payload.conversation;
      const thisUser = thisConversation.participants.find(
        (elm) => elm.id.toString() !== action.payload.userId
      );
      state.directChat.conversations.push({
        id: thisConversation.id,
        userId: thisUser.id,
        name: `${thisUser.firstName} ${thisUser.lastName}`,
        online: thisUser.status === "Online" ? true : false,
        img: faker.image.avatar(),
        msg: faker.music.songName(),
        time: "12:45",
        unread: 0,
        pinned: false,
      });
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

export default slice.reducer;
