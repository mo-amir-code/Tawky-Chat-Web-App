import {
  Dialog,
  DialogContent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchFriendRequestsAsync,
  fetchFriendsAsync,
  fetchUsersAsync,
} from "../../Redux/slices/app/app";
import {
  FriendRequestsComponent,
  FriendsComponent,
  UserComponent,
} from "../../components/Friends";

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  const { users } = useSelector((state) => state.app);

  return (
    <>
      {users.map((el, idx) => {
        return <UserComponent key={el.id} {...el} />;
      })}
    </>
  );
};
const FriendsList = ({setOpenDialog}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriendsAsync());
  }, []);

  const { friends } = useSelector((state) => state.app);

  return (
    <>
      {friends.map((el, idx) => {
        return <FriendsComponent key={el.id} {...el} setOpenDialog={setOpenDialog} />;
      })}
    </>
  );
};
const FriendRequestsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriendRequestsAsync());
  }, []);

  const { friendRequests } = useSelector((state) => state.app);

  return (
    <>
      {friendRequests.map((el, idx) => {
        return (
          <FriendRequestsComponent
            key={el.id}
            {...el.sender}
            requestId={el.id}
          />
        );
      })}
    </>
  );
};

const Friends = ({ open, handleClose, setOpenDialog }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        keepMounted
        sx={{ p: 4 }}
      >
        <Stack p={2} sx={{ width: "100%" }}>
          <Tabs value={value} centered onChange={handleChange}>
            <Tab label="Explore" />
            <Tab label="Friends" />
            <Tab label="Requests" />
          </Tabs>
        </Stack>
        {/* Dialog Content */}
        <DialogContent>
          <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.5}>
              {(() => {
                switch (value) {
                  case 0: // display all users
                    return <UsersList />;
                  case 1: // display all friends
                    return <FriendsList setOpenDialog={setOpenDialog} />;
                  case 2: // display all new friends requests
                    return <FriendRequestsList />;
                }
              })()}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Friends;
