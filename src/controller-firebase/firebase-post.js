export const datePost = () => {
  const opt1 = {
    month: 'short', day: 'numeric', year: 'numeric',
  };
  const opt2 = {
    hour12: 'true', hour: 'numeric', minute: 'numeric',
  };
  const date = new Date().toLocaleDateString('es-Es', opt1);
  const time = new Date().toLocaleTimeString('es-Es', opt2);
  const dataTime = `${date} - ${time}`;
  return dataTime;
};

export const addPostFirebase = (notePost, selectPrivacy, userUid, userDisplayName, imgUrl) => {
  firebase.firestore().collection('posts').add({
    publication: notePost,
    privacy: selectPrivacy,
    userID: userUid,
    username: userDisplayName,
    timePost: datePost(),
    img: imgUrl,
  });
};

export const deletePostFirebase = id => {
  firebase.firestore().collection('posts').doc(id).delete();
};

export const editPostFirebase = (id, note, selectedPrivacy) => {
firebase.firestore().collection('posts').doc(id).update({
  publication: note,
  privacy: selectedPrivacy,
  timePost: datePost(),
});
};

