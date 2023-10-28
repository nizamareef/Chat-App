export const getSender=(loggedUser,users)=>{
    console.log("users parameter:", users);
     return users[0]._id===loggedUser.user._id? users[1].name:users[0].name
}

export const isSameSender = (messages, m, i, userId) => {
    const condition = i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId;
    
    // console.log("isSameSender condition:", condition);
    return condition;
};

        
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  export const isSameSenderMargin = (messages, m, i, userId) => {
    let result;

    if (i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId) {
        result = 33;
    } else if ((i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)) {
        result = 0;
    } else {
        result = "auto";
    }

    console.log("isSameSenderMargin result:", result);
    return result;
};

  
  export const isSameUser = (messages, m, i) => {
    const condition = i > 0 && messages[i - 1].sender._id === m.sender._id;
    
    console.log("isSameUser condition:", condition);
    return condition;
};
