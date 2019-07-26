const initialState = {
    messageList: []
  }
  
  export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        // 新しく追加するTODO
        const message = action.payload.messages;
        // stateを複製して追加
        const newState = Object.assign({}, state);
        newState.messageList.push(message);
        return newState;
      default:
        return state;
    }
  };