import { faker } from "@faker-js/faker";

export const shortDocName = (name) => {
  if (name.length > 20) {
    const newName = name.slice(0, 12) + "..." + name.slice(14, 20);
    return newName;
  }
  return name;
};

export const setThisUser = ({thisUser, roomId}) => {
  const user = {
    id: roomId,
    userId: thisUser.id,
    name: `${thisUser.firstName} ${thisUser.lastName}`,
    online: thisUser.status === "Online" ? true : false,
    img: faker.image.avatar(),
    msg: faker.music.songName(),
    time: "12:45",
    unread: 0,
    pinned: false,
  };
  return user
};
