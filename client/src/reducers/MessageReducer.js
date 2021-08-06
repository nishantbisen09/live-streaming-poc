const MessageReducer = (state, action) => {
  const initialState = [...state];
  switch (action.type) {
    case "addMessage":
      return [...initialState, action.payload];

    default:
      return state;
  }
};

export default MessageReducer;
